import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import LatestContent from "@/components/sections/LatestContent";
import Trajectory from "@/components/sections/Trajectory";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main id="contenido" className="min-h-screen">
      <span id="top" className="sr-only" />
      <Hero />
      <Philosophy />
      <Services />
      <LatestContent />
      <Trajectory />
      <ContactCTA />
    </main>
  );
}
