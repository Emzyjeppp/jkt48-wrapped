import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const JKT48_LOADING_STEPS = [
  "Menghubungkan ke portal JKT48...",
  "Mengumpulkan data apply tiket teater...",
  "Menghitung winrate apply kamu (semoga wangi!)...",
  "Memindai riwayat video call dengan oshi...",
  "Menganalisis total pengeluaran poin top-up...",
  "Menyusun gelar kepribadian wota unikmu...",
  "Mempersiapkan panggung JKT48 Wrapped..."
];

export default function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < JKT48_LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 p-6 overflow-hidden">
      {/* Red Theater Lightstick Glows */}
      <div className="absolute w-96 h-96 rounded-full bg-rose-950/40 glow-stick"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
        {/* Glowing loader icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-md scale-110"></div>
          <Loader2 className="w-16 h-16 text-rose-500 animate-spin relative" />
        </div>

        {/* Dynamic status messages */}
        <div className="h-12 flex items-center justify-center">
          <p className="text-base sm:text-lg font-medium text-slate-200 transition-all duration-300 slide-enter">
            {JKT48_LOADING_STEPS[stepIndex]}
          </p>
        </div>

        {/* Progress bar indication */}
        <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden mt-6 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-red-500 transition-all duration-500 ease-out"
            style={{ width: `${((stepIndex + 1) / JKT48_LOADING_STEPS.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
