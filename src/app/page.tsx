import NavBar from "./components/NavBar";
import ParallaxHero from "./components/ParallaxHero";
import ProblemSection from "./components/ProblemSection";
import SolutionSequence from "./components/SolutionSequence";
import FutureFocusSection from "./components/FutureFocusSection";
import OfferScarcitySection from "./components/OfferScarcitySection";
import ProgressiveCTA from "./components/ProgressiveCTA";

export default function Home() {
  return (
    <div className="font-sans" id="main">
      <NavBar />
      <main>
        <ParallaxHero />
        <ProblemSection />
        <SolutionSequence />
        <FutureFocusSection />
        <OfferScarcitySection />
        <ProgressiveCTA />
      </main>
    </div>
  );
}
