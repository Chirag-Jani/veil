import { ArrowDown, Download, ShieldCheck, Wallet } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Get a Private Address",
    description:
      "Veil automatically creates a unique address for each site. Your main wallet and identity stay hidden.",
    color: "text-primary",
  },
  {
    number: "02",
    icon: ArrowDown,
    title: "Receive Funds",
    description:
      "Use your private address for any incoming transaction. No link to your main holdings or identity.",
    color: "text-accent",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Migrate to Privacy Pool",
    description:
      "Move funds into a privacy pool to break the on-chain link. Private transfers when you need them.",
    color: "text-primary",
  },
  {
    number: "04",
    icon: Download,
    title: "Withdraw Privately",
    description:
      "Receive funds in your main wallet with no traceable connection. Your identity stays protected.",
    color: "text-accent",
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
            Privacy by default. A simple flow that keeps your identity
            protected—from receiving to withdrawing—with cryptographic
            guarantees.
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
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${index % 2 === 1 ? "md:text-right" : ""}`}
                >
                  <div className="feature-card">
                    <div
                      className={`text-5xl font-bold ${step.color} opacity-20 mb-4 font-display`}
                    >
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 font-display">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
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
