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
import { Download, FileArchive, Info, Shield } from "lucide-react";
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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <AlertDialogTitle className="text-xl">
              Download Veil Extension
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left space-y-3 pt-2">
            <p>
              You're about to download the <strong>Veil Extension</strong> zip
              file.
            </p>
            <div className="space-y-2">
              <p className="font-medium text-foreground">What you'll get:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>A zip file containing the extension build</li>
                <li>Ready to install in Chrome/Brave browsers</li>
                <li>Complete extension package with all dependencies</li>
              </ul>
            </div>
            <div className="space-y-2 pt-2">
              <p className="font-medium text-foreground">Installation steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Extract the downloaded zip file</li>
                <li>
                  Open Chrome/Brave and go to{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    chrome://extensions
                  </code>
                </li>
                <li>Enable "Developer mode" (top right)</li>
                <li>Click "Load unpacked" and select the extracted folder</li>
              </ol>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-border mt-4">
              <FileArchive className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                The file will be saved as{" "}
                <code className="bg-muted px-1 py-0.5 rounded">
                  veil-extension.zip
                </code>{" "}
                in your downloads folder.
              </p>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-border mt-4">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Note that we're under development and the extension is not yet
                available on the Chrome Web Store. You can still install it by
                downloading the zip file and installing it manually.
              </p>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-border mt-4">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <p className="text-xs text-muted-foreground">
                If you encounter any issues, please connect with us on X{" "}
                <a
                  href="https://x.com/theveilwallet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  here.
                </a>{" "}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDownloading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDownload}
            disabled={isDownloading}
            className="gap-2"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Extension
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
