import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Calculator } from "../components/Calculator";
import { Benefits } from "../components/Benefits";
import { HowWeWork } from "../components/HowWeWork";
import { CaseStudy } from "../components/CaseStudy";
import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";
import { Partners } from "../components/Partners";
import { FinalCTA } from "../components/FinalCTA";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Calculator />
      <Benefits />
      <HowWeWork />
      <CaseStudy />
      <FAQ />
      <Testimonials />
      <Partners />
      <FinalCTA />
    </main>
  );
}
