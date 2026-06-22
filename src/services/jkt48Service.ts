export interface JKT48WrappedData {
  username: string;
  oshi: string;
  memberSince: string; // e.g. "4 Juli 2023"
  
  // Theater
  theater: {
    wins: number;
    loses: number;
    winrate: number; // percentage
    topSetlistWin: string;
    mostAppliedSetlist: string;
  };
  
  // Video Call / Meet & Greet
  videoCall: {
    topMembers: { name: string; tickets: number }[];
    totalTickets: number;
  };

  // Two Shot
  twoShot: {
    topMembers: { name: string; tickets: number }[];
    totalTickets: number;
  };

  // Events & Financial
  events: {
    lastEvents: string[];
    totalTopUp: string; // e.g. "120,000 Poin"
  };

  // Persona
  persona: {
    title: string;
    description: string;
    badge: string;
    colorClass: string;
  };
}

export function processManualInput(inputs: {
  username: string;
  oshi: string;
  memberSince: string;
  theaterWins: number;
  theaterLoses: number;
  topSetlist: string;
  videoCallMember1: string;
  videoCallTickets1: number;
  videoCallMember2: string;
  videoCallTickets2: number;
  lastEvent: string;
  totalTopUp: string;
}): JKT48WrappedData {
  const wins = Number(inputs.theaterWins) || 0;
  const loses = Number(inputs.theaterLoses) || 0;
  const totalTheater = wins + loses;
  const winrate = totalTheater > 0 ? Math.round((wins / totalTheater) * 100) : 0;

  const videoCallTickets = [];
  let totalVc = 0;
  if (inputs.videoCallMember1.trim()) {
    const t = Number(inputs.videoCallTickets1) || 0;
    videoCallTickets.push({ name: inputs.videoCallMember1.trim(), tickets: t });
    totalVc += t;
  }
  if (inputs.videoCallMember2.trim()) {
    const t = Number(inputs.videoCallTickets2) || 0;
    videoCallTickets.push({ name: inputs.videoCallMember2.trim(), tickets: t });
    totalVc += t;
  }

  // Sort video call members by tickets descending
  videoCallTickets.sort((a, b) => b.tickets - a.tickets);

  // Generate Wota Persona
  let persona = {
    title: "Layar Kaca Warrior 📱",
    description: "Kamu mendukung JKT48 penuh cinta dari balik layar gadget. Live Showroom dan IDN adalah asupan harianmu.",
    badge: "📱 Layar Kaca Warrior",
    colorClass: "from-slate-600 to-rose-900",
  };

  if (wins >= 10) {
    persona = {
      title: "Theater Legend 🎟️",
      description: "Sudut bangku teater JKT48 sudah seperti rumah kedua bagimu. Kamu hafal setiap koreografi setlist!",
      badge: "🎭 Theater Legend",
      colorClass: "from-red-600 to-amber-600",
    };
  } else if (totalVc >= 15) {
    persona = {
      title: "Meet & Greet Enthusiast 💬",
      description: "Obrolan beberapa detik di bilik Video Call adalah momen paling berhargamu. Kamu pandai membuat member tersenyum.",
      badge: "💬 Chat Companion",
      colorClass: "from-pink-500 to-purple-600",
    };
  } else if (videoCallTickets.length >= 2) {
    persona = {
      title: "DD (Daredemo Daisuki) 💖",
      description: "Hatimu terlalu luas untuk satu oshi saja. Kamu menyayangi banyak member dan mendukung semuanya dengan adil!",
      badge: "💖 Daredemo Daisuki",
      colorClass: "from-teal-500 to-rose-600",
    };
  } else if (wins > 0 && winrate === 100) {
    persona = {
      title: "The Lucky Oshi-Tachi 🍀",
      description: "Dewi Keberuntungan selalu ada di pihakmu. Setiap kali apply tiket teater, kamu selalu terpilih (100% winrate)!",
      badge: "🍀 Lucky Fan",
      colorClass: "from-emerald-500 to-yellow-500",
    };
  }

  return {
    username: inputs.username.trim() || "Wota Setia",
    oshi: inputs.oshi.trim() || "Azizi Asadel",
    memberSince: inputs.memberSince || "4 Juli 2023",
    theater: {
      wins,
      loses,
      winrate,
      topSetlistWin: inputs.topSetlist.trim() || "ITADAKI♥LOVE",
      mostAppliedSetlist: inputs.topSetlist.trim() || "ITADAKI♥LOVE",
    },
    videoCall: {
      topMembers: videoCallTickets,
      totalTickets: totalVc,
    },
    twoShot: {
      topMembers: [],
      totalTickets: 0,
    },
    events: {
      lastEvents: inputs.lastEvent.trim() ? [inputs.lastEvent.trim()] : ["Trial Video Call bersama JKT48 Generasi 14"],
      totalTopUp: inputs.totalTopUp.trim() || "0 Poin",
    },
    persona,
  };
}

export function parseJkt48Json(jsonText: string): JKT48WrappedData {
  try {
    const raw = JSON.parse(jsonText);
    
    // Parse and handle flexible formats from extension
    const username = raw.username || raw.name || "Jeppp";
    const oshi = raw.oshi || "Azizi Asadel";
    const memberSince = raw.memberSince || "4 Juli 2023";
    
    const wins = Number(raw.theaterWins ?? raw.wins ?? 1);
    const loses = Number(raw.theaterLoses ?? raw.loses ?? 0);
    const total = wins + loses;
    const winrate = total > 0 ? Math.round((wins / total) * 100) : 100;
    
    const topSetlistWin = raw.topSetlist || "ITADAKI♥LOVE";
    
    let vcList: { name: string; tickets: number }[] = [];
    let totalVc = 0;
    
    if (Array.isArray(raw.videoCallTickets)) {
      vcList = raw.videoCallTickets.map((item: any) => ({
        name: item.name || item.member || "Member",
        tickets: Number(item.tickets || item.count || 0),
      }));
      totalVc = vcList.reduce((acc, curr) => acc + curr.tickets, 0);
    } else if (raw.topVideoCall) {
      // e.g. "Aurhel Alana - 11 tiket, Catherina Vallencia - 2 tiket"
      const parts = String(raw.topVideoCall).split(",");
      parts.forEach((p) => {
        const m = p.trim().match(/(.+)\s*-\s*(\d+)\s*tiket/);
        if (m) {
          const name = m[1].trim();
          const t = Number(m[2]) || 0;
          vcList.push({ name, tickets: t });
          totalVc += t;
        }
      });
    }

    // Default Fallback VC if list empty
    if (vcList.length === 0) {
      vcList = [{ name: "Aurhel Alana", tickets: 11 }, { name: "Catherina Vallencia", tickets: 2 }];
      totalVc = 13;
    }

    const lastEvents = Array.isArray(raw.lastEvents) 
      ? raw.lastEvents 
      : [
          "Group 1 - Trial Video Call bersama Member JKT48 Generasi 14",
          "Group 2 - Trial Video Call bersama Member JKT48 Generasi 14",
          "Group 4 - Trial Video Call bersama Member JKT48 Generasi 14"
        ];

    const totalTopUp = raw.totalTopUp || "150,000 Poin";

    // Generate Persona
    let persona = {
      title: "Meet & Greet Enthusiast 💬",
      description: "Obrolan beberapa detik di bilik Video Call adalah momen paling berhargamu. Kamu pandai membuat member tersenyum.",
      badge: "💬 Chat Companion",
      colorClass: "from-pink-500 to-purple-600",
    };

    if (wins >= 5) {
      persona = {
        title: "Theater Legend 🎟️",
        description: "Sudut bangku teater JKT48 sudah seperti rumah kedua bagimu. Kamu hafal setiap koreografi setlist!",
        badge: "🎭 Theater Legend",
        colorClass: "from-red-600 to-amber-600",
      };
    }

    return {
      username,
      oshi,
      memberSince,
      theater: {
        wins,
        loses,
        winrate,
        topSetlistWin,
        mostAppliedSetlist: topSetlistWin,
      },
      videoCall: {
        topMembers: vcList,
        totalTickets: totalVc,
      },
      twoShot: {
        topMembers: [],
        totalTickets: 0,
      },
      events: {
        lastEvents,
        totalTopUp,
      },
      persona,
    };

  } catch (error) {
    throw new Error("Format JSON tidak valid atau data korup. Pastikan menyalin data dari ekstensi JKT48 Wrapped.");
  }
}

export function getJkt48DemoData(): JKT48WrappedData {
  return {
    username: "Wota_Garis_Keras",
    oshi: "Freya Jayawardana",
    memberSince: "12 September 2022 (3 tahun)",
    theater: {
      wins: 14,
      loses: 4,
      winrate: 78,
      topSetlistWin: "Cara Meminum Ramuan Ajaib 🧪",
      mostAppliedSetlist: "Cara Meminum Ramuan Ajaib 🧪",
    },
    videoCall: {
      topMembers: [
        { name: "Freya Jayawardana", tickets: 24 },
        { name: "Ella Kartika", tickets: 8 },
        { name: "Christy", tickets: 3 }
      ],
      totalTickets: 35,
    },
    twoShot: {
      topMembers: [],
      totalTickets: 0,
    },
    events: {
      lastEvents: [
        "JKT48 14th Anniversary Concert - Surabaya",
        "Personal Meet & Greet - Jakarta",
        "Group 1 - Trial Video Call JKT48 Generasi 14"
      ],
      totalTopUp: "450,000 Poin",
    },
    persona: {
      title: "Theater Legend 🎟️",
      description: "Sudut bangku teater JKT48 sudah seperti rumah kedua bagimu. Kamu hafal setiap koreografi setlist!",
      badge: "🎭 Theater Legend",
      colorClass: "from-red-600 to-amber-600",
    },
  };
}
