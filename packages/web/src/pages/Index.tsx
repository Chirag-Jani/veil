import { useLenis } from '@/hooks/useLenis';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { SecuritySection } from '@/components/sections/SecuritySection';
import { ExtensionPreviewSection } from '@/components/sections/ExtensionPreviewSection';
import { RoadmapSection } from '@/components/sections/RoadmapSection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';

const Index = () => {
  useLenis();
  useGsapReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <UseCasesSection />
        <ComparisonSection />
        <SecuritySection />
        {/* {<ExtensionPreviewSection />} */}
        <RoadmapSection />
        {/* <AudienceSection /> */}
        <FAQSection />
        {/* <CTASection /> */}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};


export default Index;
