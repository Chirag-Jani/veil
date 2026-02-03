import { Layers, Lock, Network, Shield } from "lucide-react";

export const PrivacyLayerSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div className="relative order-2 lg:order-1 reveal-scale">
            <div className="relative">
              {/* Protocol Visualization */}
              <div className="glass-card p-8 rounded-3xl">
                <div className="text-center mb-8">
                  <h3 className="text-lg font-semibold text-foreground font-display mb-2">
                    Privacy Cash Protocol
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Zero-knowledge proof based privacy pool
                  </p>
                </div>

                {/* Visual Flow */}
                <div className="space-y-6">
                  {/* Input */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <span className="text-destructive text-lg">↓</span>
                    </div>
                    <div className="flex-1 h-12 bg-muted rounded-lg flex items-center px-4">
                      <span className="text-sm text-muted-foreground font-mono">
                        Private Address → Deposit
                      </span>
                    </div>
                  </div>

                  {/* Pool */}
                  <div className="relative py-8">
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
                    <div className="relative flex items-center justify-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-primary/50" />
                      <div className="w-4 h-4 rounded-full bg-primary/60" />
                      <div className="w-5 h-5 rounded-full bg-primary" />
                      <div className="w-4 h-4 rounded-full bg-primary/60" />
                      <div className="w-3 h-3 rounded-full bg-primary/50" />
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      Funds mix in privacy pool
                    </p>
                  </div>

                  {/* Output */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <span className="text-accent text-lg">↑</span>
                    </div>
                    <div className="flex-1 h-12 bg-muted rounded-lg flex items-center px-4">
                      <span className="text-sm text-muted-foreground font-mono">
                        Withdraw → Main Wallet
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3 text-sm">
                    <Lock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Connection broken via cryptographic proof
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <span className="section-label reveal-up">Privacy Layer</span>
            <h2 className="section-title mb-6 reveal-up">
              Protocol-Level <span className="text-primary">Anonymity</span>
            </h2>
            <p className="section-subtitle mb-8 reveal-up">
              Veil integrates with Privacy Cash protocol to provide
              cryptographic privacy guarantees. Your anonymity isn't based on
              obscurity—it's mathematically proven.
            </p>

            <div className="space-y-6 stagger-container">
              <div className="flex gap-4 stagger-item">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 font-display">
                    Pooled Anonymity
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your funds mix with others in the privacy pool, making it
                    impossible to trace the origin.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 stagger-item">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 font-display">
                    Zero-Knowledge Proofs
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Prove you have the right to withdraw without revealing which
                    deposit was yours.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 stagger-item">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 font-display">
                    Growing Anonymity Set
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The more users participate, the stronger everyone's privacy
                    becomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
