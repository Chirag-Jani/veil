import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Sparkles } from 'lucide-react';
import veilLogo from '@/assets/logo.png';
import { DownloadExtensionDialog } from '@/components/DownloadExtensionDialog';

export const HeroSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-badge mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Privacy-First Wallet for Solana</span>
          </motion.div> */}

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-2 animate-float"
          >
            <img 
              src={veilLogo} 
              alt="Veil" 
              className="w-40 h-40 md:w-48 md:h-48 object-contain"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-display"
          >
            Hide Your Trail.
            <br />
            <span className="text-primary glow-text">Own Your Privacy.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Veil creates temporary burner wallets for each site—connect anywhere without risking your main wallet. 
            Optional privacy pool for unlinkable transfers when you need extra privacy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="btn-primary text-base px-8 py-4"
            >
              <Shield className="w-5 h-5" />
              Install Veil Extension
            </button>
            <a href="#how-exactly" className="btn-secondary text-base px-8 py-4">
              See How It Works
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 md:gap-16 mt-16 pt-16 border-t border-border/50"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground font-display">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Non-Custodial</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground font-display">0</div>
              <div className="text-sm text-muted-foreground mt-1">Data Collected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground font-display">∞</div>
              <div className="text-sm text-muted-foreground mt-1">Temp Wallets</div>
            </div>
          </motion.div> */}
        </div>
      </div>
      <DownloadExtensionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
};
