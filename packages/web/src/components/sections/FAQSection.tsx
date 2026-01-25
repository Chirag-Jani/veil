import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does Veil protect my privacy?',
    answer: 'Veil creates temporary wallets for receiving payments and airdrops. Funds are then migrated through privacy pools using zero-knowledge proofs to break the on-chain link to your main wallet.',
  },
  {
    question: 'Is Veil non-custodial?',
    answer: 'Yes, Veil is completely non-custodial. All private keys are generated and stored locally in your browser. We never have access to your funds or keys.',
  },
  {
    question: 'What is a privacy pool?',
    answer: 'A privacy pool is a smart contract that allows users to deposit funds and withdraw them in a way that breaks the on-chain link between the deposit and withdrawal addresses using cryptographic proofs.',
  },
  {
    question: 'Is Veil open source?',
    answer: 'Yes, Veil is open source. You can verify the code, audit the security, and contribute to the project on GitHub.',
  },
  {
    question: 'Which browsers are supported?',
    answer: 'Currently, Veil is available as a Chrome extension. Support for Firefox and Brave is coming soon.',
  },
  {
    question: 'How much does Veil cost?',
    answer: 'Veil is free to use. You only pay standard Solana network fees for transactions.',
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-card/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title mb-6 reveal-up">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="section-subtitle mx-auto reveal-up">
            Everything you need to know about Veil and how it protects your privacy.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg bg-card/50 hover:bg-card/70 transition-colors overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline px-4 py-3 text-left">
                  <span className="text-base font-medium text-foreground font-display pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-0">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

