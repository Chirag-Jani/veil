import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { downloadExtension } from "@/utils/downloadExtension";
import { Download, Info, Shield } from "lucide-react";
import { useState } from "react";

interface DownloadExtensionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DownloadExtensionDialog = ({
  open,
  onOpenChange,
}: DownloadExtensionDialogProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  // TODO: Re-enable direct zip download when public build is ready.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadExtension();
      onOpenChange(false);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-lg overflow-hidden p-0 border-border/60 bg-gradient-to-b from-background to-background/95">
        <div className="relative flex flex-col gap-6 p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <AlertDialogHeader className="relative z-10 space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2">
                <AlertDialogTitle className="text-xl md:text-2xl">
                  Join the Veil Extension beta
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-muted-foreground">
                  We&apos;re onboarding privacy-conscious users in{" "}
                  <strong>small waves</strong> to help us battle‑test Veil
                  before the public launch.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="relative z-10 grid gap-5 rounded-2xl border border-border/70 bg-card/80 p-4 md:grid-cols-2 md:p-5">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                What you get
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Privacy-by-default multi-chain wallet (Ethereum + Solana)</li>
                <li>• Early access before public launch</li>
                <li>• Direct line to share product feedback</li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                How to get in
              </p>
              <p className="text-sm text-muted-foreground">
                Connect with us on X and DM{" "}
                <a
                  href="https://x.com/theveilwallet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  @theveilwallet
                </a>{" "}
                with a short note about how you plan to use Veil.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-3 rounded-2xl border border-dashed border-border/80 bg-background/80 p-4">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                The extension isn&apos;t on the Chrome Web Store yet. During
                beta, we&apos;ll share builds directly with early users who
                reach out on X.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 h-4 w-4 text-muted-foreground"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <p className="text-xs text-muted-foreground">
                For live updates, release notes, and feedback threads, follow us
                on X{" "}
                <a
                  href="https://x.com/theveilwallet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @theveilwallet
                </a>
                .
              </p>
            </div>
          </div>

          <AlertDialogFooter className="relative z-10 mt-2 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
            <button
              type="button"
              className="order-2 text-xs text-muted-foreground hover:text-foreground sm:order-1"
              onClick={() => onOpenChange(false)}
              disabled={isDownloading}
            >
              Maybe later
            </button>
            <div className="order-1 flex w-full flex-col gap-2 sm:order-2 sm:w-auto sm:flex-row">
              <AlertDialogCancel className="w-full sm:w-auto">
                Close
              </AlertDialogCancel>
              <AlertDialogAction
                className="w-full gap-2 sm:w-auto"
                onClick={() => {
                  window.open(
                    "https://x.com/theveilwallet",
                    "_blank",
                    "noopener,noreferrer"
                  );
                  onOpenChange(false);
                }}
              >
                <Download className="h-4 w-4" />
                Request beta on X
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
