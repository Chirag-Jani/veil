import { Briefcase, Code, Trophy, User } from "lucide-react";

const audiences = [
  {
    icon: User,
    title: "Privacy Advocates",
    description:
      "Anyone who believes financial privacy is a fundamental right and wants to protect their on-chain activity.",
  },
  {
    icon: Code,
    title: "Developers & Testers",
    description:
      "Builders who want privacy when testing dApps—isolated addresses without exposing personal holdings.",
  },
  {
    icon: Briefcase,
    title: "Businesses & Freelancers",
    description:
      "Professionals who want to receive payments without exposing their treasury or holdings.",
  },
  {
    icon: Trophy,
    title: "Airdrop Hunters",
    description:
      "Users who farm airdrops and want to keep activity private—consolidate without linking identities.",
  },
];

export const AudienceSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <span className="section-label reveal-up">Who It's For</span> */}
          <h2 className="section-title mb-6 reveal-up">
            Built for <span className="text-primary">You</span>
          </h2>
          <p className="section-subtitle mx-auto reveal-up">
            Whether you value financial privacy or want to stay invisible
            on-chain, Veil has you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-container">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="text-center feature-card stagger-item"
            >
              <div className="feature-icon mx-auto mb-4">
                <audience.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-display">
                {audience.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
