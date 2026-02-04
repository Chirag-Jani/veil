import veilLogo from "@/assets/veil_tp.png";
import { motion } from "framer-motion";

// --- Custom Animated Components ---

const PulseLine = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <motion.path
      d="M0,50 Q25,40 50,50 T100,50"
      fill="none"
      stroke="url(#gradient-line)"
      strokeWidth="0.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
    <defs>
      <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
  </svg>
);

const GlowingWallet = () => (
  <div className="relative w-48 h-32 md:w-64 md:h-40 perspective-1000 mx-auto">
    <motion.div
      className="w-full h-full rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 shadow-2xl relative overflow-hidden"
      whileHover={{ rotateY: 15, rotateX: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Holographic Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-full relative z-10">
        <div className="flex justify-between items-start">
          <img src={veilLogo} className="w-8 h-8 opacity-90" alt="Veil" />
          <div className="w-8 h-5 rounded bg-white/10 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
            Private Address
          </div>
          <div className="font-mono text-sm md:text-base text-white/80 truncate tracking-tight">
            7xKp...4mNq
          </div>
        </div>
      </div>

      {/* Scanning Line */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-full bg-primary/50 blur-[10px]"
        animate={{ left: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  </div>
);

const ZKProofAnimation = () => {
  return (
    <div className="relative w-full h-[120px] flex items-center justify-center overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Nodes */}
      <div className="flex justify-between w-full max-w-md px-8 relative z-10">
        {/* Source */}
        <motion.div
          className="w-12 h-12 rounded-xl bg-card border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-3 h-3 rounded-full bg-zinc-500" />
        </motion.div>

        {/* The Mixer (Center) */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 0px rgba(139,92,246,0)",
                "0 0 20px rgba(139,92,246,0.2)",
                "0 0 0px rgba(139,92,246,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-10 h-10 border-2 border-dashed border-primary/50 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          {/* Particles */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full"
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Destination */}
        <motion.div
          className="w-12 h-12 rounded-xl bg-card border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]" />
        </motion.div>
      </div>

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d="M-10,60 Q50,60 100,60 T200,60 T300,60 T400,60"
          stroke="url(#gradient-flow)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
        />
        <defs>
          <linearGradient id="gradient-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// --- Main Section ---

export const SolutionSection = () => {
  return (
    <section
      id="solution"
      className="py-24 md:py-32 relative overflow-hidden bg-[#030303]"
    >
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          {/* <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/50 mb-6 backdrop-blur-xl">
            The Ecosystem
          </span> */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display tracking-tight text-white">
            Privacy in a{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-blue-400">
              Masterpiece
            </span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            1. Privacy by default—private transfers on Ethereum and Solana. 2.
            Burner wallets per site. Every interaction stays secure and
            unlinkable.
          </p>
        </div>

        {/* --- Trending Bento Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 lg:grid-rows-2 gap-4 h-auto lg:h-[600px]">
          {/* 1. Interface (Large Square: 2x2) */}
          <div className="group lg:col-span-2 lg:row-span-2 rounded-3xl bg-zinc-900/40 border border-white/5 p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm hover:bg-zinc-900/60 transition-colors">
            <PulseLine />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Privacy-First Identities
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Each site gets a unique address so your activity can&apos;t be
                linked. Your main wallet and identity stay hidden by default.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <GlowingWallet />
            </div>
          </div>

          {/* 2. Site Isolation (Wide Rectangle: 4x1) */}
          <div className="group lg:col-span-4 lg:row-span-1 rounded-3xl bg-zinc-900/40 border border-white/5 p-8 relative overflow-hidden backdrop-blur-sm hover:bg-zinc-900/60 transition-colors flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-zinc-500 uppercase">
                  Core Security
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Site-Bound Privacy
              </h3>
              <p className="text-zinc-400 text-sm max-w-sm">
                Each dApp gets a unique address—no address reuse, no cross-site
                linking. Your main wallet and identity stay hidden by default.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <ZKProofAnimation />
            </div>
          </div>

          {/* 3. Feature: Non-Custodial (Square: 1x1) */}
          <div className="lg:col-span-1 lg:row-span-1 rounded-3xl bg-zinc-900/40 border border-white/5 p-6 flex flex-col justify-between hover:border-primary/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">
                Non-Custodial
              </h4>
              <p className="text-xs text-zinc-500">Your keys, your crypto.</p>
            </div>
          </div>

          {/* 4. Feature: Open Source (Square: 1x1) */}
          <div className="lg:col-span-1 lg:row-span-1 rounded-3xl bg-zinc-900/40 border border-white/5 p-6 flex flex-col justify-between hover:border-primary/30 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">Open Source</h4>
              <p className="text-xs text-zinc-500">Verify, then trust.</p>
            </div>
          </div>

          {/* 5. Feature: Multi-Chain (Wide: 2x1) */}
          <div className="lg:col-span-2 lg:row-span-1 rounded-3xl bg-zinc-900/40 border border-white/5 p-6 flex items-center justify-between hover:bg-zinc-900/60 transition-colors group overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h4 className="font-bold text-white text-base">
                Protocol Agnostic
              </h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-[150px]">
                One wallet. Ethereum + Solana. Privacy by default.
              </p>
            </div>
            {/* Abstract Decor */}
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
              <svg
                className="h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,100 C20,50 50,0 100,0 L100,100 Z"
                  fill="url(#gradient-abstract)"
                />
                <defs>
                  <linearGradient
                    id="gradient-abstract"
                    x1="0"
                    y1="1"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
