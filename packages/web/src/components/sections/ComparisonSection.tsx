import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Privacy by Default",
    standardWallet: false,
    privacyTool: true,
    veil: true,
  },
  {
    feature: "Non-Custodial",
    standardWallet: true,
    privacyTool: false,
    veil: true,
  },
  {
    feature: "Private Transfers",
    standardWallet: false,
    privacyTool: true,
    veil: true,
  },
  {
    feature: "Multi-chain Transfers & Swaps",
    standardWallet: false,
    privacyTool: false,
    veil: true,
  },
  {
    feature: "Site-Bound Burner Wallets",
    standardWallet: false,
    privacyTool: false,
    veil: true,
  },
  {
    feature: "Browser Extension",
    standardWallet: true,
    privacyTool: false,
    veil: true,
  },
  {
    feature: "One-Click Migration",
    standardWallet: false,
    privacyTool: false,
    veil: true,
  },
  {
    feature: "Local Key Storage",
    standardWallet: true,
    privacyTool: false,
    veil: true,
  },
];

const CheckIcon = () => (
  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
    <Check className="w-4 h-4 text-primary" />
  </div>
);

const XIcon = () => (
  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
    <X className="w-4 h-4 text-muted-foreground" />
  </div>
);

export const ComparisonSection = () => {
  return (
    <section id="why-us" className="py-24 md:py-32">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <span className="section-label reveal-up">Why Veil</span> */}
          <h2 className="section-title mb-6 reveal-up">
            Best of <span className="text-primary">Both Worlds</span>
          </h2>
          <p className="section-subtitle mx-auto reveal-up">
            Veil combines the convenience of browser wallets with privacy-first
            design—own your on-chain identity.
          </p>
        </div>

        <div className="max-w-4xl mx-auto reveal-up">
          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="comparison-table w-full table-fixed">
                <colgroup>
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                  <col className="w-1/4" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="!text-left px-4 py-4 font-semibold text-foreground">
                      Feature
                    </th>
                    <th className="!text-center px-4 py-4 font-semibold text-foreground">
                      Standard Wallet
                    </th>
                    <th className="!text-center px-4 py-4 font-semibold text-foreground">
                      Privacy Tool
                    </th>
                    <th className="!text-center px-4 py-4 font-semibold text-foreground bg-primary/5">
                      <span className="text-primary font-display">Veil</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row) => (
                    <tr key={row.feature} className="border-t border-border">
                      <td className="font-medium text-foreground px-4 py-4">
                        {row.feature}
                      </td>
                      <td className="text-center px-4 py-4">
                        <div className="flex justify-center">
                          {row.standardWallet ? <CheckIcon /> : <XIcon />}
                        </div>
                      </td>
                      <td className="text-center px-4 py-4">
                        <div className="flex justify-center">
                          {row.privacyTool ? <CheckIcon /> : <XIcon />}
                        </div>
                      </td>
                      <td className="text-center px-4 py-4 bg-primary/5">
                        <div className="flex justify-center">
                          {row.veil ? <CheckIcon /> : <XIcon />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
