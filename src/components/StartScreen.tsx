import React, { useState } from "react";
import { Sparkles, FileJson, Play, HelpCircle, User, Heart, Calendar } from "lucide-react";
import { JKT48WrappedData, processManualInput, parseJkt48Json } from "../services/jkt48Service";

interface StartScreenProps {
  onDataSubmit: (data: JKT48WrappedData) => void;
  onDemo: () => void;
  onError: (msg: string) => void;
}

export default function StartScreen({ onDataSubmit, onDemo, onError }: StartScreenProps) {
  const [activeTab, setActiveTab] = useState<"manual" | "json">("manual");
  const [jsonText, setJsonText] = useState("");
  
  // Manual Form States
  const [username, setUsername] = useState("");
  const [oshi, setOshi] = useState("");
  const [memberSince, setMemberSince] = useState("4 Juli 2023");
  const [theaterWins, setTheaterWins] = useState("1");
  const [theaterLoses, setTheaterLoses] = useState("0");
  const [topSetlist, setTopSetlist] = useState("ITADAKI♥LOVE");
  const [videoCallMember1, setVideoCallMember1] = useState("Aurhel Alana");
  const [videoCallTickets1, setVideoCallTickets1] = useState("11");
  const [videoCallMember2, setVideoCallMember2] = useState("Catherina Vallencia");
  const [videoCallTickets2, setVideoCallTickets2] = useState("2");
  const [lastEvent, setLastEvent] = useState("Group 1 - Trial Video Call Generasi 14");
  const [totalTopUp, setTotalTopUp] = useState("150,000 Poin");

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !oshi.trim()) {
      onError("Nama dan Oshi Utama wajib diisi!");
      return;
    }
    const data = processManualInput({
      username,
      oshi,
      memberSince,
      theaterWins: Number(theaterWins),
      theaterLoses: Number(theaterLoses),
      topSetlist,
      videoCallMember1,
      videoCallTickets1: Number(videoCallTickets1),
      videoCallMember2,
      videoCallTickets2: Number(videoCallTickets2),
      lastEvent,
      totalTopUp,
    });
    onDataSubmit(data);
  };

  const handleJsonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonText.trim()) {
      onError("Teks JSON tidak boleh kosong!");
      return;
    }
    try {
      const data = parseJkt48Json(jsonText.trim());
      onDataSubmit(data);
    } catch (err: any) {
      onError(err.message || "Gagal mengurai data JSON!");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-y-auto bg-slate-950">
      {/* Red Theater Lightstick Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-rose-600 glow-stick"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-red-700 glow-stick"></div>

      <div className="relative z-10 w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-panel-heavy shadow-2xl flex flex-col items-center border border-rose-500/20 slide-enter my-8">
        
        {/* JKT48 Logo Fanmade Emblem */}
        <div className="relative mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/20 shadow-inner group">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center font-extrabold text-white text-xl tracking-wider shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform duration-300">
            JKT48
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 text-center text-white">
          JKT48 <span className="text-gradient-jkt48">Wrapped 2026</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-xs text-center">
          Rangkum perjalanan teater, video call, dan kebiasaan ng-oshi JKT48 kamu sepanjang tahun.
        </p>

        {/* Tab Buttons */}
        <div className="flex w-full bg-slate-900/80 p-1.5 rounded-2xl border border-white/5 mb-6 text-sm">
          <button
            onClick={() => setActiveTab("manual")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "manual"
                ? "bg-red-600 text-white shadow-md shadow-red-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Isi Data Manual
          </button>
          <button
            onClick={() => setActiveTab("json")}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "json"
                ? "bg-red-600 text-white shadow-md shadow-red-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileJson className="w-4 h-4" />
            Import JSON Data
          </button>
        </div>

        {/* Tab Content 1: Manual Form */}
        {activeTab === "manual" && (
          <form onSubmit={handleManualSubmit} className="w-full space-y-4 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-semibold block">Nama Fans</label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Jeppp"
                    className="w-full p-3 pl-9 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                    required
                  />
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-semibold block">Oshi Utama</label>
                <div className="relative">
                  <input
                    type="text"
                    value={oshi}
                    onChange={(e) => setOshi(e.target.value)}
                    placeholder="Azizi Asadel"
                    className="w-full p-3 pl-9 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                    required
                  />
                  <Heart className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-rose-500 fill-rose-500/10" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold block">Member Sejak</label>
              <div className="relative">
                <input
                  type="text"
                  value={memberSince}
                  onChange={(e) => setMemberSince(e.target.value)}
                  placeholder="4 Juli 2023"
                  className="w-full p-3 pl-9 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            {/* Theater Block */}
            <div className="border-t border-white/5 pt-3 my-2">
              <h3 className="text-xs font-bold text-rose-400 mb-2 uppercase tracking-wide">Statistik Teater</h3>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-semibold block">Menang (Wins)</label>
                  <input
                    type="number"
                    value={theaterWins}
                    onChange={(e) => setTheaterWins(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs focus:outline-none text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-semibold block">Kalah (Loses)</label>
                  <input
                    type="number"
                    value={theaterLoses}
                    onChange={(e) => setTheaterLoses(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs focus:outline-none text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-semibold block">Setlist Utama</label>
                  <input
                    type="text"
                    value={topSetlist}
                    onChange={(e) => setTopSetlist(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Video Call Block */}
            <div className="border-t border-white/5 pt-3 my-2">
              <h3 className="text-xs font-bold text-rose-400 mb-2 uppercase tracking-wide">Video Call / MnG</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid grid-cols-3 gap-1">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] text-slate-500 font-semibold block">Member 1</label>
                    <input
                      type="text"
                      value={videoCallMember1}
                      onChange={(e) => setVideoCallMember1(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-semibold block">Tiket</label>
                    <input
                      type="number"
                      value={videoCallTickets1}
                      onChange={(e) => setVideoCallTickets1(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs text-center focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] text-slate-500 font-semibold block">Member 2</label>
                    <input
                      type="text"
                      value={videoCallMember2}
                      onChange={(e) => setVideoCallMember2(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-semibold block">Tiket</label>
                    <input
                      type="number"
                      value={videoCallTickets2}
                      onChange={(e) => setVideoCallTickets2(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs text-center focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Financial and Events */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3 my-2">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-semibold block">Event Terakhir</label>
                <input
                  type="text"
                  value={lastEvent}
                  onChange={(e) => setLastEvent(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-semibold block">Total Top-up</label>
                <input
                  type="text"
                  value={totalTopUp}
                  onChange={(e) => setTotalTopUp(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900/60 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-bold rounded-2xl transition-all duration-300 transform active:scale-95 shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              Mulai JKT48 Wrapped Saya
            </button>
          </form>
        )}

        {/* Tab Content 2: JSON Import */}
        {activeTab === "json" && (
          <form onSubmit={handleJsonSubmit} className="w-full space-y-4 text-left">
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold block">Tempel Data JSON Ekstensi</label>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='Contoh data JSON:&#10;{&#10;  "username": "Jeppp",&#10;  "oshi": "Azizi Asadel",&#10;  "theaterWins": 1,&#10;  "theaterLoses": 0,&#10;  "topVideoCall": "Aurhel Alana - 11 tiket, Catherina Vallencia - 2 tiket"&#10;}'
                rows={8}
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-600 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono leading-relaxed"
                required
              ></textarea>
              <p className="text-[10px] text-slate-500">
                *Salin data lengkap dari ekstensi JKT48 Wrapped pada browser Anda dan tempel di sini untuk hasil otomatis.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white font-bold rounded-2xl transition-all duration-300 transform active:scale-95 shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileJson className="w-4 h-4" />
              Proses Data JSON
            </button>
          </form>
        )}

        {/* Separator */}
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <span className="relative px-3 bg-slate-950/20 text-xs text-slate-500 uppercase tracking-widest font-semibold backdrop-blur-sm">
            Atau
          </span>
        </div>

        {/* Demo Button */}
        <button
          onClick={onDemo}
          className="w-full py-3.5 bg-white/5 hover:bg-rose-950/20 border border-rose-500/10 text-slate-200 hover:text-white font-medium rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
        >
          <HelpCircle className="w-4 h-4 text-rose-400" />
          Lihat Akun Demo (Preset Wota)
        </button>

      </div>
    </div>
  );
}
