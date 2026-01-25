import { Eye, Link2, Target, AlertTriangle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const problems = [
  {
    icon: Eye,
    title: 'Permanent Exposure',
    description: 'Every transaction reveals your wallet address. Once linked to your identity, your entire financial history becomes public.',
  },
  {
    icon: Link2,
    title: 'On-Chain Tracking',
    description: 'Blockchain analytics can trace your funds across wallets, building a complete picture of your holdings and activity.',
  },
  {
    icon: Target,
    title: 'Targeted Attacks',
    description: 'Visible wealth attracts phishing attempts, social engineering, and even physical threats to high-value holders.',
  },
  {
    icon: AlertTriangle,
    title: 'No Transaction Privacy',
    description: 'Standard wallets offer zero separation between receiving airdrops, payments, and your main holdings.',
  },
];

export const ProblemSection = () => {
  return (
    <section id="problem" className="py-15 md:py-32 bg-card/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* {<span className="section-label reveal-up">The Problem</span>} */}
          <h2 className="section-title mb-6 reveal-up">
            Your Wallet is a <span className="text-destructive">Liability</span>
          </h2>
          <p className="section-subtitle mx-auto reveal-up">
            On-chain transparency was meant to build trust. Instead, it's become a surveillance tool 
            that exposes your financial life to the world.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden reveal-up relative -mx-6">
          <div className="relative px-6">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {problems.map((problem) => (
                  <CarouselItem key={problem.title}>
                    <div className="feature-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <problem.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground font-display leading-tight flex-1">
                        {problem.title}
                      </h3>
                    </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious 
                variant="ghost" 
                className="absolute -left-6 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent border-none text-foreground hover:text-foreground/80 shadow-none z-10" 
              />
              <CarouselNext 
                variant="ghost" 
                className="absolute -right-6 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent border-none text-foreground hover:text-foreground/80 shadow-none z-10" 
              />
            </Carousel>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-container">
          {problems.map((problem) => (
            <div key={problem.title} className="feature-card stagger-item">
              <div className="feature-icon">
                <problem.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-display">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
