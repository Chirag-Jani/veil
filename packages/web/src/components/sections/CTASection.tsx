import { Shield, ArrowRight, ExternalLink } from 'lucide-react';
import veilLogo from '@/assets/veil_tp.png';

export const CTASection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl bg-card border border-border">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative px-8 py-16 md:py-24 text-center">
            <div className="flex justify-center mb-8 reveal-scale">
              <img src={veilLogo} alt="Veil" className="w-20 h-20 object-contain" />
            </div>

            <h2 className="section-title mb-6 reveal-up">
              Ready to Go <span className="text-primary">Private?</span>
            </h2>

            <p className="section-subtitle mx-auto mb-10 reveal-up">
              Join the growing community of users who've taken control of their 
              on-chain privacy. Install Veil and start protecting your financial data today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-up">
              <a href="#" className="btn-primary text-base px-8 py-4">
                <Shield className="w-5 h-5" />
                Install Veil Extension
              </a>
              <a href="#" className="btn-secondary text-base px-8 py-4">
                Read Documentation
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground reveal-fade">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Chrome Extension
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Solana Mainnet
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Open Source
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
