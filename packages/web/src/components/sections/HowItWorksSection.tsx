import { Wallet, ArrowDown, ShieldCheck, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: Wallet,
    title: 'Create Temp Wallet',
    description: 'Generate a fresh Solana wallet address with one click. Share it to receive payments or claim airdrops.',
    color: 'text-primary',
  },
  {
    number: '02',
    icon: ArrowDown,
    title: 'Receive Funds',
    description: 'Use the temp wallet address for any incoming transaction. Your main wallet stays completely hidden.',
    color: 'text-accent',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Migrate to Privacy Pool',
    description: 'Move your funds into the Privacy Cash protocol pool. This breaks the on-chain link between addresses.',
    color: 'text-primary',
  },
  {
    number: '04',
    icon: Download,
    title: 'Withdraw Privately',
    description: 'Receive funds in your main wallet from the privacy pool. No traceable connection to the original transaction.',
    color: 'text-accent',
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-exactly" className="py-24 md:py-32 bg-card/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-20">
          {/* <span className="section-label reveal-up">How It Works</span> */}
          <h2 className="section-title mb-6 reveal-up">
            Privacy in <span className="text-primary">Four Steps</span>
          </h2>
          <p className="section-subtitle mx-auto reveal-up">
            A simple, secure flow that separates your receiving address from your main wallet 
            through cryptographic privacy guarantees.
          </p>
        </div>

        {/* Flow Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2 hidden sm:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 reveal-up ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <div className="feature-card">
                    <div className={`text-5xl font-bold ${step.color} opacity-20 mb-4 font-display`}>
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 font-display">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="hidden md:flex relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
