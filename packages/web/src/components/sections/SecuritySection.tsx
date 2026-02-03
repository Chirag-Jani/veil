import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Eye, FileKey, KeyRound, Lock, Server, Shield } from "lucide-react";

const securityFeatures = [
  {
    icon: KeyRound,
    title: "Local Key Generation",
    description:
      "All private keys are generated in your browser using cryptographically secure randomness. Keys never leave your device.",
  },
  {
    icon: Eye,
    title: "Zero Data Collection",
    description:
      "Veil doesn't collect, store, or transmit any personal information. No analytics, no tracking, no logs.",
  },
  {
    icon: Server,
    title: "No Backend Custody",
    description:
      "There is no Veil server holding your funds. You are always in complete control of your assets.",
  },
  {
    icon: Lock,
    title: "Encrypted Storage",
    description:
      "Local storage is encrypted with your password. Even if someone accesses your browser, keys remain protected.",
  },
  {
    icon: FileKey,
    title: "Open Source",
    description:
      "Security through transparency. Veil's open-source code allows independent audits and community-driven verification.",
  },
  {
    icon: Shield,
    title: "Site-Bound Privacy",
    description:
      "Each dApp gets a unique address. No address reuse, no cross-site linking—your identity stays protected.",
  },
];

export const SecuritySection = () => {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <span className="section-label reveal-up">Security & Trust</span> */}
          <h2 className="section-title mb-6 reveal-up">
            Your Keys, <span className="text-primary">Your Control</span>
          </h2>
          <p className="section-subtitle mx-auto reveal-up">
            Veil is built on the principle of minimal trust. You don't have to
            trust us—you only need to verify the code.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden reveal-up relative -mx-6">
          <div className="relative px-6">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {securityFeatures.map((feature) => (
                  <CarouselItem key={feature.title}>
                    <div className="feature-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground font-display leading-tight flex-1">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
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
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
          {securityFeatures.map((feature) => (
            <div key={feature.title} className="feature-card stagger-item">
              <div className="feature-icon">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-display">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        {/* <div className="mt-16 reveal-up">
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-display mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Client-Side</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-display mb-1">0</div>
                <div className="text-sm text-muted-foreground">Data Collected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-display mb-1">Open</div>
                <div className="text-sm text-muted-foreground">Source Code</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-display mb-1">Audited</div>
                <div className="text-sm text-muted-foreground">Protocol</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};
