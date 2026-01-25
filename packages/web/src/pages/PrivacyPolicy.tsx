import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useLenis } from '@/hooks/useLenis';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useLenis();
  useGsapReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="section-container max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 reveal-up">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8 stagger-container">
            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Veil ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our browser extension and related services (collectively, the "Service"). By using Veil, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">2. Information We Do NOT Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Veil is designed with privacy as a core principle. We do NOT collect, store, or transmit:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Personal identification information (name, email, address, etc.)</li>
                <li>Wallet addresses or transaction history</li>
                <li>Private keys or seed phrases</li>
                <li>Browser history or browsing data</li>
                <li>IP addresses or location data</li>
                <li>Device information or identifiers</li>
                <li>Usage analytics or telemetry data</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">3. Local Data Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All data generated and used by Veil is stored locally on your device:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Private Keys:</strong> Generated and encrypted locally using your password. Keys never leave your device.</li>
                <li><strong>Wallet Data:</strong> Temporary wallet addresses and balances are stored locally in your browser's storage.</li>
                <li><strong>Settings:</strong> Extension preferences and configurations are saved locally.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This local storage is encrypted and can only be accessed by you through the extension interface. We have no access to this data.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">4. Blockchain Interactions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you use Veil to interact with the Solana blockchain:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Transactions are broadcast directly to the Solana network from your browser</li>
                <li>We do not act as an intermediary or relay for your transactions</li>
                <li>All blockchain interactions are peer-to-peer and do not pass through our servers</li>
                <li>Transaction data is publicly visible on the Solana blockchain, as is standard for all blockchain transactions</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">5. Open Source Code</h2>
              <p className="text-muted-foreground leading-relaxed">
                Veil is open source software. The complete source code is publicly available for review, audit, and verification. This transparency allows you to verify that we do not collect or transmit any data. You can review the code at any time to confirm our privacy practices.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">6. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Veil may interact with third-party services in the following ways:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Solana RPC Nodes:</strong> The extension may connect to public or private Solana RPC nodes to query blockchain data. These connections are made directly from your browser, and we do not log or monitor these requests.</li>
                <li><strong>Privacy Pool Protocols:</strong> When using privacy pool features, you interact directly with smart contracts on the Solana blockchain. These interactions are on-chain and publicly visible.</li>
                <li><strong>Browser Extension Stores:</strong> If you install Veil through Chrome Web Store or similar platforms, those platforms may collect standard installation metrics, which are governed by their respective privacy policies.</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">7. Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement security measures to protect your local data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>All private keys are encrypted using industry-standard encryption before storage</li>
                <li>Encryption keys are derived from a password that only you know</li>
                <li>No sensitive data is transmitted over the network</li>
                <li>Regular security audits of our open-source code</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your local data, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Veil is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">9. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">10. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Since we do not collect personal data, you have full control over:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>All data stored locally on your device</li>
                <li>Your private keys and wallet information</li>
                <li>Extension settings and preferences</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can delete all local data at any time by uninstalling the extension or clearing your browser's extension storage. Since we don't store your data on our servers, deletion is immediate and complete.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our official channels:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                <li>GitHub: For technical questions and code-related inquiries</li>
                <li>Discord: For community support and general questions</li>
                <li>Twitter/X: For updates and announcements</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">12. Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy is designed to comply with applicable privacy laws, including but not limited to GDPR, CCPA, and other data protection regulations. Our zero-data-collection approach ensures maximum privacy protection for all users, regardless of jurisdiction.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PrivacyPolicy;

