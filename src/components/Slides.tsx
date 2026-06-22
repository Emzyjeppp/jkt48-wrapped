import { useRef, useState } from "react";
import { JKT48WrappedData } from "../services/jkt48Service";
import { Heart, RefreshCw, ChevronLeft, ChevronRight, Volume2, VolumeX, Sparkles, MessageSquare, Download } from "lucide-react";
import { toPng } from "html-to-image";

interface SlideProps {
  data: JKT48WrappedData;
}

export function WelcomeSlide({ data }: SlideProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 slide-enter">
      {/* Oshi avatar frame placeholder with red glowing border */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-red-500 blur-md scale-105 animate-pulse"></div>
        <div className="relative w-36 h-36 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center shadow-2xl">
          <Heart className="w-16 h-16 text-rose-500 animate-beat fill-rose-500/20" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-rose-600 to-red-500 text-white p-2.5 rounded-full shadow-lg border border-slate-900">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      <p className="text-xs font-semibold tracking-widest text-rose-500 uppercase mb-2">
        Mempersembahkan
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
        JKT48 Wrapped
      </h2>
      
      <div className="glass-panel px-6 py-2.5 rounded-full mb-6 inline-flex items-center gap-2">
        <span className="text-slate-300 text-sm">untuk</span>
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400 text-sm">
          [ {data.username} ]
        </span>
      </div>

      <p className="text-slate-400 max-w-sm text-xs sm:text-sm leading-relaxed px-4">
        Kamu mendedikasikan hatimu untuk oshi teratasmu: <span className="text-rose-400 font-bold">{data.oshi}</span>.
      </p>

      <p className="text-xs text-slate-500 mt-8">
        Ng-oshi sejak {data.memberSince}
      </p>
    </div>
  );
}

export function TheaterSlide({ data }: SlideProps) {
  return (
    <div className="flex flex-col justify-center h-full p-6 sm:p-10 slide-enter">
      <p className="text-xs font-semibold tracking-widest text-rose-500 uppercase mb-2 text-center sm:text-left">
        Statistik Teater
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 text-center sm:text-left text-white">
        Pejuang Teater 🎟️
      </h2>

      <div className="space-y-6 max-w-md mx-auto sm:mx-0 w-full">
        {/* Winrate Large Card */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-rose-500/10 blur-xl"></div>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Apply Winrate</span>
          <p className="text-4xl font-black text-rose-500">{data.theater.winrate}%</p>
          <p className="text-[10px] text-slate-500 mt-2">
            ({data.theater.wins} Menang / {data.theater.loses} Kalah)
          </p>
        </div>

        {/* Setlist stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel p-4 rounded-xl border border-white/5 text-left">
            <span className="text-[9px] text-slate-400 block mb-1 uppercase">Top Setlist (Win)</span>
            <span className="text-xs font-bold text-slate-200 line-clamp-2">{data.theater.topSetlistWin}</span>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/5 text-left">
            <span className="text-[9px] text-slate-400 block mb-1 uppercase">Most Applied</span>
            <span className="text-xs font-bold text-slate-200 line-clamp-2">{data.theater.mostAppliedSetlist}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InteractionSlide({ data }: SlideProps) {
  const topMember = data.videoCall.topMembers[0];

  return (
    <div className="flex flex-col justify-center h-full p-6 sm:p-10 slide-enter">
      <p className="text-xs font-semibold tracking-widest text-rose-500 uppercase mb-2 text-center sm:text-left">
        Interaksi Member
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-center sm:text-left text-white">
        Teman Bicara 💬
      </h2>

      {topMember && (
        <p className="text-slate-400 text-xs sm:text-sm mb-6 text-center sm:text-left">
          Kamu menghabiskan waktu obrolan paling banyak dengan <span className="text-rose-400 font-bold">{topMember.name}</span> sebanyak <span className="text-white font-bold">{topMember.tickets} tiket</span>.
        </p>
      )}

      <div className="space-y-3.5 max-w-md mx-auto sm:mx-0 w-full">
        {data.videoCall.topMembers.map((item, index) => (
          <div key={item.name} className="glass-panel p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-rose-500/30 flex items-center justify-center text-xs font-bold text-rose-400">
                {index + 1}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-200">{item.name}</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20">
              {item.tickets} Tiket
            </span>
          </div>
        ))}

        {data.videoCall.topMembers.length === 0 && (
          <p className="text-xs text-slate-500 italic text-center">Tidak ada riwayat tiket video call.</p>
        )}
      </div>
    </div>
  );
}

export function EventsSlide({ data }: SlideProps) {
  return (
    <div className="flex flex-col justify-center h-full p-6 sm:p-10 slide-enter">
      <p className="text-xs font-semibold tracking-widest text-rose-500 uppercase mb-2 text-center sm:text-left">
        Aktivitas Event & Finansial
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 text-center sm:text-left text-white">
        Event & Top-Up Poin 💳
      </h2>

      <div className="space-y-4 max-w-md mx-auto sm:mx-0 w-full">
        {/* Topup Info */}
        <div className="glass-panel p-4.5 rounded-xl border border-rose-500/20 flex justify-between items-center">
          <span className="text-xs text-slate-400 font-semibold">Total Poin Top-Up</span>
          <span className="text-base font-bold text-rose-400">{data.events.totalTopUp}</span>
        </div>

        {/* Last Events */}
        <div className="space-y-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mb-1">Partisipasi Event Terakhir:</span>
          {data.events.lastEvents.map((evt, idx) => (
            <div key={idx} className="glass-panel p-3 rounded-lg border border-white/5 text-xs text-slate-300 leading-snug">
              {evt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PersonaSlide({ data }: SlideProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 slide-enter">
      <p className="text-xs font-semibold tracking-widest text-rose-500 uppercase mb-2">
        Hasil Analisis Karakter
      </p>
      
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-white">
        Wota Persona Kamu 🔮
      </h2>

      {/* Persona Badge and Card */}
      <div className={`relative w-full max-w-sm p-8 rounded-3xl bg-gradient-to-br ${data.persona.colorClass} border border-white/20 shadow-2xl overflow-hidden`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="px-5 py-2.5 rounded-full bg-slate-950/70 border border-white/10 text-white font-bold text-sm tracking-wide shadow-md mb-6 uppercase">
            {data.persona.badge}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 text-center">
            {data.persona.title}
          </h3>

          <p className="text-white/95 text-xs sm:text-sm leading-relaxed px-2 font-medium">
            {data.persona.description}
          </p>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 mt-10 max-w-xs">
        *Persona ini didasarkan pada perbandingan aktivitas kemenangan teater, jumlah oshi, dan aktivitas tiket event.
      </p>
    </div>
  );
}

interface SummarySlideProps extends SlideProps {
  onRestart: () => void;
}

export function SummarySlide({ data, onRestart }: SummarySlideProps) {
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    try {
      // Delay slightly for rendering components
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        backgroundColor: "#030204", // theater dark background
        pixelRatio: 3, // HD quality
        style: {
          borderRadius: "24px",
        },
      });

      const link = document.createElement("a");
      link.download = `${data.username}-jkt48-wrapped.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Gagal mendownload poster JKT48 Wrapped:", error);
    } finally {
      setDownloading(false);
    }
  };

  const displayUrl = typeof window !== "undefined"
    ? `${window.location.host}${window.location.pathname}`.replace(/\/$/, "")
    : "jkt48-wrapped.web.app";

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 slide-enter overflow-y-auto w-full">
      
      {/* Outer Download Wrapper with solid JKT48 theme background */}
      <div
        ref={cardRef}
        className="p-5 bg-[#030204] rounded-3xl flex items-center justify-center w-full max-w-xs mb-6 shadow-xl border border-rose-500/10"
      >
        {/* Wrapped Poster Container */}
        <div
          id="jkt48-summary-card"
          className="w-full p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-rose-950/80 to-slate-950 border border-rose-500/20 shadow-inner relative overflow-hidden flex flex-col gap-5 text-left"
        >
          {/* Background glows */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-rose-500/10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-red-600/5 blur-2xl"></div>

          {/* Poster Header */}
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-rose-500/30 flex items-center justify-center font-black text-rose-500 text-[10px]">
                JKT
              </div>
              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1">[ {data.username} ]</h4>
                <p className="text-[9px] text-slate-400">My 2026 Oshi Life</p>
              </div>
            </div>
            <span className="text-[9px] px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 font-bold uppercase tracking-wider text-rose-400">
              JKT48 WRAPPED
            </span>
          </div>

          {/* Oshi Highlight */}
          <div className="space-y-0.5">
            <span className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold">Oshi Utama</span>
            <h3 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">
              {data.oshi}
            </h3>
          </div>

          {/* Wota Persona */}
          <div className="space-y-0.5">
            <span className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold">Gelar Fans</span>
            <p className="text-xs font-bold text-slate-200">{data.persona.title}</p>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-2 gap-3.5 border-t border-white/5 pt-4">
            <div>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold block mb-0.5">Winrate Teater</span>
              <span className="text-sm font-black text-white flex items-center gap-1">
                {data.theater.winrate}%
              </span>
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold block mb-0.5">Total Tiket VC</span>
              <span className="text-sm font-black text-white flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                {data.videoCall.totalTickets} Tiket
              </span>
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold block mb-0.5">Lama Ng-oshi</span>
              <span className="text-xs font-bold text-slate-300 line-clamp-1">
                {data.memberSince.split("(")[0].trim()}
              </span>
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold block mb-0.5">Total Top-up</span>
              <span className="text-xs font-bold text-slate-300 line-clamp-1">
                {data.events.totalTopUp}
              </span>
            </div>
          </div>

          {/* Footer Brand */}
          <p className="text-[8px] text-slate-500 text-center border-t border-white/5 pt-3">
            Buat milikmu di {displayUrl}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col w-full max-w-xs gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-3 bg-white/5 hover:bg-rose-950/20 border border-rose-500/20 text-slate-200 hover:text-white font-semibold rounded-2xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4 text-rose-400" />
          {downloading ? "Membuat Gambar..." : "Download Poster HD"}
        </button>

        <button
          onClick={onRestart}
          className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-bold rounded-2xl transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Mulai Ulang / Cari Lagi
        </button>
      </div>
    </div>
  );
}

interface SlidesContainerProps {
  data: JKT48WrappedData;
  activeSlide: number;
  onPrev: () => void;
  onNext: () => void;
  onRestart: () => void;
  audioPlaying: boolean;
  toggleAudio: () => void;
}

export function SlidesContainer({
  data,
  activeSlide,
  onPrev,
  onNext,
  onRestart,
  audioPlaying,
  toggleAudio,
}: SlidesContainerProps) {
  const slidesCount = 6;

  const renderSlide = () => {
    switch (activeSlide) {
      case 0:
        return <WelcomeSlide data={data} />;
      case 1:
        return <TheaterSlide data={data} />;
      case 2:
        return <InteractionSlide data={data} />;
      case 3:
        return <EventsSlide data={data} />;
      case 4:
        return <PersonaSlide data={data} />;
      case 5:
        return <SummarySlide data={data} onRestart={onRestart} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 bg-[#030204] text-white overflow-hidden select-none">
      {/* Stage light glow in the middle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 pointer-events-none transition-all duration-1000 bg-rose-800"></div>

      {/* Header controls */}
      <div className="relative z-20 w-full max-w-lg flex justify-between items-center pt-2 px-2">
        <button
          onClick={onRestart}
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          &larr; Keluar
        </button>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          className="p-2.5 rounded-full bg-white/5 hover:bg-rose-950/20 border border-rose-500/20 text-slate-300 hover:text-white transition-all duration-300 cursor-pointer"
          title={audioPlaying ? "Mute Music" : "Play JKT48 Synth Tune"}
        >
          {audioPlaying ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>
      </div>

      {/* Progress Bars (Instagram Stories style) */}
      <div className="relative z-20 w-full max-w-md flex gap-1.5 px-4 mt-4">
        {Array.from({ length: slidesCount }).map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                idx < activeSlide
                  ? "bg-rose-500"
                  : idx === activeSlide
                  ? "bg-red-400"
                  : "bg-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Slide Display Area */}
      <div className="relative z-10 w-full max-w-md flex-1 flex flex-col justify-center my-6">
        <div className="glass-panel-heavy rounded-3xl border border-rose-500/20 shadow-2xl overflow-hidden min-h-[480px] flex flex-col justify-between relative">
          <div className="flex-1 flex flex-col justify-center">
            {renderSlide()}
          </div>
        </div>
      </div>

      {/* Bottom navigation buttons */}
      <div className="relative z-20 w-full max-w-md flex justify-between items-center pb-6 px-4">
        <button
          onClick={onPrev}
          disabled={activeSlide === 0}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            activeSlide === 0
              ? "opacity-30 cursor-not-allowed text-slate-600"
              : "bg-white/5 hover:bg-rose-950/25 border border-white/5 text-slate-200 cursor-pointer"
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </button>

        <span className="text-xs text-slate-500 font-medium">
          Slide {activeSlide + 1} dari {slidesCount}
        </span>

        {activeSlide < slidesCount - 1 ? (
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white shadow-lg cursor-pointer"
          >
            Lanjut <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-[84px]"></div>
        )}
      </div>
    </div>
  );
}
