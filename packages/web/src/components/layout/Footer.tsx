import veilLogo from "@/assets/veil_tp.png";
import { DownloadExtensionDialog } from "@/components/DownloadExtensionDialog";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// X (formerly Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const footerLinks = {
  product: [
    { label: "Install Extension", href: "#" },
    // { label: 'GitBook', href: '#' },
    { label: "FAQ", href: "#faq" },
    { label: "Roadmap", href: "#roadmap" },
  ],
  // resources: [
  //   { label: 'How It Works', href: '#how-it-works' },
  //   { label: 'Security', href: '#security' },
  //   { label: 'Use Cases', href: '#use-cases' },
  //   { label: 'FAQ', href: '#' },
  // ],
  community: [
    { label: "X", href: "#", icon: ExternalLink },
    { label: "Discord", href: "#", icon: ExternalLink },
    { label: "GitHub", href: "#", icon: ExternalLink },
    // { label: 'Blog', href: '#' },
  ],
  security: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

export const Footer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col items-start md:items-center text-left md:text-center">
            <a
              href="#"
              className="flex items-left md:items-center justify-start md:justify-center gap-3 mb-4"
            >
              <img
                src={veilLogo}
                alt="Veil"
                className="w-40 h-40 object-contain"
              />
              {/* <span className="text-xl font-bold font-display">Veil</span> */}
            </a>
            {/* <p className="text-sm text-muted-foreground mb-4">
              Privacy-first temporary wallets for Solana.
            </p> */}
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 font-display">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.label === "Install Extension" ? (
                    <button
                      type="button"
                      onClick={() => setIsDialogOpen(true)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* <div>
            <h4 className="font-semibold text-foreground mb-4 font-display">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          <div>
            <h4 className="font-semibold text-foreground mb-4 font-display">
              Community
            </h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {IconComponent && <IconComponent className="w-3 h-3" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 font-display">
              Security
            </h4>
            <ul className="space-y-3">
              {footerLinks.security.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Veil. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://x.com/theveilwallet"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/chirag-jani/veil"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
          {/* <p className="text-sm text-muted-foreground">
            Built for privacy. Powered by Solana.
          </p> */}
        </div>
      </div>
      <DownloadExtensionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </footer>
  );
};
