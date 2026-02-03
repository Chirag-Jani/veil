import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Building, Code, Coins, Fingerprint, Gift, Users } from "lucide-react";

const useCases = [
  {
    icon: Gift,
    title: "Airdrop Farming",
    description:
      "Claim airdrops without exposing your identity. Keep your farming activity private and unlinkable.",
  },
  {
    icon: Coins,
    title: "Anonymous Payments",
    description:
      "Receive payments for freelance work, sales, or services without exposing your primary holdings.",
  },
  {
    icon: Users,
    title: "DAO Participation",
    description:
      "Vote and participate in governance without revealing your total voting power or identity.",
  },
  {
    icon: Code,
    title: "Testing & Development",
    description:
      "Test dApps with privacy-protected addresses. Keep dev activity separate from personal holdings.",
  },
  {
    icon: Fingerprint,
    title: "Identity Protection",
    description:
      "Prevent wallet address from being tied to your real identity through transaction analysis.",
  },
  {
    icon: Building,
    title: "Business Privacy",
    description:
      "Receive business payments without exposing treasury or competitor intelligence.",
  },
];

export const UseCasesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <span className="section-label reveal-up">Use Cases</span> */}
          <h2 className="section-title mb-6 reveal-up">
            Privacy for <span className="text-primary">Every Scenario</span>
          </h2>
          <p className="section-subtitle mx-auto reveal-up">
            Whether you're a developer, trader, or everyday user, Veil provides
            the privacy layer you need for your specific use case.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden reveal-up relative -mx-6">
          <div className="relative px-6">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {useCases.map((useCase) => (
                  <CarouselItem key={useCase.title}>
                    <div className="feature-card group p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                          <useCase.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground font-display leading-tight flex-1">
                          {useCase.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {useCase.description}
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
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="feature-card stagger-item group"
            >
              <div className="feature-icon group-hover:bg-primary/20 transition-colors">
                <useCase.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-display">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
