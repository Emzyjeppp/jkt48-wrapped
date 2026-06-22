import { useState, useEffect, useRef } from "react";
import StartScreen from "./components/StartScreen";
import LoadingScreen from "./components/LoadingScreen";
import { SlidesContainer } from "./components/Slides";
import { JKT48WrappedData, getJkt48DemoData } from "./services/jkt48Service";

// Web Audio API Synthesizer playing a JKT48-style cheerful pop melody (F - G - Em - Am chord progression)
class Jkt48AmbientSynth {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying = false;
  private schedulerTimer: any = null;

  constructor() {}

  public start() {
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      if (this.isPlaying) return;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.06, this.ctx.currentTime); // Low pleasant volume
      this.gainNode.connect(this.ctx.destination);
      this.isPlaying = true;
      this.playLoop();
    } catch (e) {
      console.error("Web Audio API failed to load", e);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.schedulerTimer) {
      clearTimeout(this.schedulerTimer);
    }
    this.oscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    this.oscillators = [];
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  private playNote(freq: number, startTime: number, duration: number, type: OscillatorType = "triangle") {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    oscGain.gain.setValueAtTime(0, startTime);
    oscGain.gain.linearRampToValueAtTime(0.25, startTime + 0.1); // Quick attack
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05); // Smooth release

    osc.connect(oscGain);
    oscGain.connect(this.gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration);
    this.oscillators.push(osc);
  }

  private playLoop = () => {
    if (!this.isPlaying || !this.ctx) return;

    // Cheerful progression chords (F - G - Em - Am)
    // We will play warm chord pads on triangle, and a gentle arpeggio on sine waves
    const progression = [
      { pad: [349.23, 440.00, 523.25], arpeggio: [349.23, 440.00, 523.25, 659.25] }, // F (F4, A4, C5, E5)
      { pad: [392.00, 493.88, 587.33], arpeggio: [392.00, 493.88, 587.33, 783.99] }, // G (G4, B4, D5, G5)
      { pad: [329.63, 392.00, 493.88], arpeggio: [329.63, 392.00, 493.88, 659.25] }, // Em (E4, G4, B4, E5)
      { pad: [440.00, 523.25, 659.25], arpeggio: [440.00, 523.25, 659.25, 880.00] }  // Am (A4, C5, E5, A5)
    ];

    let currentChord = 0;
    const stepDuration = 4.0; // seconds per chord step

    const runSequence = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = progression[currentChord];

      // Play Chord Pad (Warm)
      chord.pad.forEach(f => {
        this.playNote(f / 2, now, stepDuration, "triangle"); // Lower octave warm pad
      });

      // Play Upbeat Arpeggio (Like JKT48 intro pop bells)
      const delay = 0.5; // duration of individual notes
      chord.arpeggio.forEach((noteFreq, index) => {
        this.playNote(noteFreq, now + index * delay, 0.4, "sine");
      });

      currentChord = (currentChord + 1) % progression.length;
      this.schedulerTimer = setTimeout(runSequence, stepDuration * 1000);
    };

    runSequence();
  };
}

export default function App() {
  const [screen, setScreen] = useState<"start" | "loading" | "slides">("start");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [wrappedData, setWrappedData] = useState<JKT48WrappedData | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const synthRef = useRef<Jkt48AmbientSynth | null>(null);

  // Initialize JKT48 synth
  useEffect(() => {
    synthRef.current = new Jkt48AmbientSynth();
    return () => {
      synthRef.current?.stop();
    };
  }, []);

  // Handle arrow key slide navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen !== "slides") return;
      if (e.key === "ArrowRight" || e.key === "Space") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screen, activeSlide]);

  const handleDataSubmit = (data: JKT48WrappedData) => {
    setErrorMsg(null);
    setScreen("loading");
    
    // Auto-enable audio on user gesture
    setAudioPlaying(true);
    synthRef.current?.start();

    setTimeout(() => {
      setWrappedData(data);
      setActiveSlide(0);
      setScreen("slides");
    }, 2500);
  };

  const handleDemo = () => {
    setErrorMsg(null);
    setScreen("loading");
    
    // Auto-enable audio on user gesture
    setAudioPlaying(true);
    synthRef.current?.start();

    setTimeout(() => {
      const data = getJkt48DemoData();
      setWrappedData(data);
      setActiveSlide(0);
      setScreen("slides");
    }, 2500);
  };

  const handleNext = () => {
    if (activeSlide < 5) {
      setActiveSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setScreen("start");
    setWrappedData(null);
    setActiveSlide(0);
  };

  const handleError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg(null);
    }, 4000);
  };

  return (
    <div className="h-full w-full bg-slate-950 font-sans select-none relative">
      {errorMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 rounded-2xl bg-red-900/80 border border-red-500/20 backdrop-blur-md text-white text-xs font-semibold shadow-lg text-center max-w-sm">
          {errorMsg}
        </div>
      )}

      {screen === "start" && (
        <StartScreen onDataSubmit={handleDataSubmit} onDemo={handleDemo} onError={handleError} />
      )}

      {screen === "loading" && <LoadingScreen />}

      {screen === "slides" && wrappedData && (
        <SlidesContainer
          data={wrappedData}
          activeSlide={activeSlide}
          onPrev={handlePrev}
          onNext={handleNext}
          onRestart={handleRestart}
          audioPlaying={audioPlaying}
          toggleAudio={() => {
            const nextPlaying = !audioPlaying;
            setAudioPlaying(nextPlaying);
            if (nextPlaying) {
              synthRef.current?.start();
            } else {
              synthRef.current?.stop();
            }
          }}
        />
      )}
    </div>
  );
}
