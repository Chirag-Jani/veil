const roadmapItems = [
  {
    phase: "Q1 2025",
    title: "Public Beta Launch",
    items: [
      "Chrome extension release",
      "Solana mainnet support",
      "Privacy pool integration",
    ],
    status: "current",
  },
  {
    phase: "Q2 2025",
    title: "Enhanced Privacy",
    items: [
      "Multi-token support (SPL)",
      "Batch migration",
      "Advanced anonymity metrics",
    ],
    status: "upcoming",
  },
  {
    phase: "Q3 2025",
    title: "Ecosystem Expansion",
    items: [
      "Firefox & Brave extensions",
      "Mobile companion app",
      "Additional privacy protocols",
    ],
    status: "upcoming",
  },
  {
    phase: "Q4 2025",
    title: "Advanced Features",
    items: [
      "Scheduled migrations",
      "Multi-chain support",
      "Privacy scoring dashboard",
    ],
    status: "upcoming",
  },
];

export const RoadmapSection = () => {
  return (
    <section id="roadmap" className="py-24 md:py-32">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <span className="section-label reveal-up">Roadmap</span> */}
          <h2 className="section-title mb-6 reveal-up">
            Building the <span className="text-primary">Future of Privacy</span>
          </h2>
          <p className="section-subtitle mx-auto reveal-up">
            Our roadmap for making privacy accessible to every Solana user.
          </p>
        </div>

        <div className="max-w-3xl mx-auto stagger-container">
          {roadmapItems.map((item, index) => (
            <div key={item.phase} className="roadmap-item stagger-item">
              <div
                className={`roadmap-dot ${
                  item.status === "upcoming" ? "roadmap-dot-upcoming" : ""
                }`}
              />

              <div className="pb-2">
                <span
                  className={`text-sm font-semibold ${
                    item.status === "current"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.phase}
                </span>
              </div>

              <div
                className={`feature-card ${
                  item.status === "current" ? "border-primary/30" : ""
                }`}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 font-display">
                  {item.title}
                  {item.status === "current" && (
                    <span className="ml-3 privacy-badge">In Progress</span>
                  )}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-muted-foreground text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
