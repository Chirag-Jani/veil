import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useLenis } from '@/hooks/useLenis';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8 stagger-container">
            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Veil, a browser extension for creating temporary Solana wallets and interacting with privacy pools, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Veil is a non-custodial browser extension that provides:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Generation of temporary Solana wallet addresses</li>
                <li>Local storage and management of wallet keys</li>
                <li>Integration with privacy pool protocols on Solana</li>
                <li>Transaction signing and broadcasting capabilities</li>
                <li>Interface for managing temporary wallets and privacy operations</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Veil is open-source software provided "as is" without warranties of any kind.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">3. Non-Custodial Nature</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>IMPORTANT:</strong> Veil is a non-custodial wallet extension. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>You are solely responsible for the security of your private keys and seed phrases</li>
                <li>We do not have access to, and cannot recover, your private keys or funds</li>
                <li>All transactions are executed directly from your browser to the Solana blockchain</li>
                <li>We do not hold, store, or have access to your cryptocurrency assets</li>
                <li>If you lose your private keys or password, your funds may be permanently lost</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">4. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Use Veil only for lawful purposes and in compliance with all applicable laws and regulations</li>
                <li>Maintain the confidentiality and security of your private keys, passwords, and seed phrases</li>
                <li>Not use Veil for any illegal activities, including but not limited to money laundering, fraud, or financing terrorism</li>
                <li>Verify all transaction details before confirming</li>
                <li>Keep your browser and extension updated to the latest version</li>
                <li>Not share your private keys or seed phrases with anyone</li>
                <li>Be of legal age in your jurisdiction to use cryptocurrency services</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">5. Risks and Disclaimers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>CRYPTOCURRENCY AND BLOCKCHAIN RISKS:</strong> You acknowledge and understand that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Cryptocurrency transactions are irreversible. Once a transaction is confirmed on the blockchain, it cannot be reversed</li>
                <li>The value of cryptocurrencies is highly volatile and can result in significant financial loss</li>
                <li>Blockchain networks may experience congestion, delays, or failures</li>
                <li>Privacy pool protocols involve smart contract risks, including potential bugs or vulnerabilities</li>
                <li>Regulatory changes may affect the legality or usability of cryptocurrency services</li>
                <li>You may lose access to your funds if you lose your private keys or forget your password</li>
                <li>Third-party services, including RPC nodes, may experience downtime or failures</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">6. No Warranty</h2>
              <p className="text-muted-foreground leading-relaxed">
                VEIL IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT DEFECTS WILL BE CORRECTED.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL VEIL, ITS DEVELOPERS, CONTRIBUTORS, OR AFFILIATES BE LIABLE FOR:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or other intangible losses</li>
                <li>Loss or theft of cryptocurrency or private keys</li>
                <li>Errors, bugs, or vulnerabilities in the software</li>
                <li>Transactions sent to incorrect addresses</li>
                <li>Network failures or blockchain congestion</li>
                <li>Smart contract failures or exploits in privacy pool protocols</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Your use of Veil is at your sole risk. You are solely responsible for all transactions made using the extension.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">8. Privacy Pool Protocols</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When using Veil to interact with privacy pool protocols:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>You understand that privacy pools are third-party smart contracts deployed on the Solana blockchain</li>
                <li>We are not responsible for the operation, security, or functionality of these smart contracts</li>
                <li>Privacy pool protocols may have their own risks, including smart contract bugs or vulnerabilities</li>
                <li>You should review and understand the privacy pool protocol documentation before use</li>
                <li>Privacy guarantees depend on the cryptographic proofs and protocol design, which may have limitations</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">9. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                Veil is open-source software. The source code is available under its respective open-source license. You may use, modify, and distribute the software in accordance with the license terms. However, the Veil name, logo, and branding are proprietary and may not be used without permission.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">10. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree NOT to use Veil to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Engage in money laundering, terrorist financing, or other illegal financial activities</li>
                <li>Facilitate fraud, scams, or other deceptive practices</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Interfere with or disrupt the Solana network or other blockchain networks</li>
                <li>Attempt to reverse engineer, decompile, or extract private keys from the extension</li>
                <li>Use the service in any jurisdiction where cryptocurrency services are prohibited</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">11. Modifications to Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Veil extension or any part thereof at any time, with or without notice. We may also update the software to add features, fix bugs, or improve security. You are responsible for keeping your extension updated. We are not liable for any losses resulting from your use of outdated versions.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">12. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may stop using Veil at any time by uninstalling the extension. We reserve the right to terminate or suspend access to the service immediately, without prior notice, for any violation of these Terms of Service. Upon termination, you remain responsible for any transactions made using the extension before termination.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">13. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising from or relating to these terms or the use of Veil shall be resolved through appropriate legal channels in the relevant jurisdiction.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">14. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. We will notify users of material changes by updating the "Last updated" date on this page. Your continued use of Veil after such modifications constitutes acceptance of the updated terms. If you do not agree to the modified terms, you must stop using the service.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">15. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl stagger-item">
              <h2 className="text-2xl font-bold mb-4 font-display text-foreground">16. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through our official channels:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                <li>GitHub: For technical questions and code-related inquiries</li>
                <li>Discord: For community support and general questions</li>
                <li>Twitter/X: For updates and announcements</li>
              </ul>
            </section>

            <section className="glass-card p-8 rounded-2xl border-primary/20">
              <h2 className="text-2xl font-bold mb-4 font-display text-primary">17. Acknowledgment</h2>
              <p className="text-muted-foreground leading-relaxed">
                BY USING VEIL, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE. YOU UNDERSTAND THAT CRYPTOCURRENCY TRANSACTIONS ARE IRREVERSIBLE AND THAT YOU ARE SOLELY RESPONSIBLE FOR THE SECURITY OF YOUR PRIVATE KEYS AND FUNDS. YOU USE VEIL AT YOUR OWN RISK.
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

export default TermsOfService;

