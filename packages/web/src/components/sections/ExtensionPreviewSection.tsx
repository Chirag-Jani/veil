import veilLogo from "@/assets/veil_tp.png";

export const ExtensionPreviewSection = () => {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label reveal-up">Extension Experience</span>
          <h2 className="section-title mb-6 reveal-up">
            Privacy at Your <span className="text-primary">Fingertips</span>
          </h2>
          <p className="section-subtitle mx-auto reveal-up">
            A clean, intuitive interface that makes private transactions as
            simple as using any other wallet extension.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto reveal-scale">
          {/* Browser Window Mock */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
            {/* Browser Chrome */}
            <div className="bg-muted px-4 py-3 flex items-center gap-3 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-background/50 rounded-lg px-4 py-1.5 text-sm text-muted-foreground">
                  chrome-extension://veil
                </div>
              </div>
            </div>

            {/* Extension Content */}
            <div className="p-6 flex gap-8 items-start">
              {/* Sidebar */}
              <div className="hidden md:block w-64 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <img src={veilLogo} alt="" className="w-8 h-8" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Veil Wallet
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Connected
                    </div>
                  </div>
                </div>

                <nav className="space-y-1">
                  <a className="block px-3 py-2 rounded-lg bg-muted text-foreground text-sm font-medium">
                    Private Addresses
                  </a>
                  <a className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm">
                    Migrate Funds
                  </a>
                  <a className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm">
                    History
                  </a>
                  <a className="block px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm">
                    Settings
                  </a>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground font-display">
                    Private Addresses
                  </h3>
                  <button className="btn-primary text-sm py-2 px-4">
                    + New Address
                  </button>
                </div>

                {/* Wallet Cards */}
                <div className="space-y-3">
                  <div className="p-4 bg-muted rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-bold">#1</span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            Airdrop Wallet
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">
                            7xKp...4mNq
                          </div>
                        </div>
                      </div>
                      <span className="privacy-badge">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Balance</span>
                      <span className="text-foreground font-medium">
                        12.5 SOL
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground font-bold">
                            #2
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">
                            Payment Receiver
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">
                            3aRt...9bXw
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Migrated
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Balance</span>
                      <span className="text-muted-foreground">0 SOL</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-border">
                  <div className="flex gap-3">
                    <button className="btn-secondary flex-1 text-sm py-2">
                      Copy Address
                    </button>
                    <button className="btn-primary flex-1 text-sm py-2">
                      Migrate to Pool
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
