import Hero from "@/components/sections/Hero";
import ValueProp from "@/components/sections/ValueProp";
import Services from "@/components/sections/Services";
import Methodology from "@/components/sections/Methodology";
import LatestContent from "@/components/sections/LatestContent";
import ContactCTA from "@/components/sections/ContactCTA";

/** Estructura del brief de Andrea (PLAN-CONSULTORIA-2026-11 §4.1). La trayectoria completa vive en /sobre-mi. */
export default function Home() {
  return (
    <main id="contenido" className="min-h-screen">
      <span id="top" className="sr-only" />
      <Hero />
      <ValueProp />
      <Services />
      <Methodology />
      <LatestContent />
      <ContactCTA />
    </main>
  );
}
