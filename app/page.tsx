import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { AutomationFeatures} from "@/components/AutomationFeatures";
import Demo from "@/components/Demo";
import EfficiencySection from "@/components/EfficiencySection";
import PricingSection from "@/components/PricingSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import Roadmap from "@/components/Roadmap";


export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Demo />
      <HowItWorks />
      <AutomationFeatures />
      <Roadmap />
      <PricingSection />
      <FinalCTASection />
      <Footer/>
    </>
  );
}
