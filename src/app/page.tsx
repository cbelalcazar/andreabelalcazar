import { ArrowRight, Mic, Shield, Target, Briefcase, Globe, Mail, Phone, ChevronRight, Quote, Plus } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Andrea Belalcázar",
    "jobTitle": "Estratega de Comunicación y Analista Política",
    "url": "https://www.andreabelalcazar.com",
    "image": "https://www.andreabelalcazar.com/portrait.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/andreabelalcazar",
      "https://twitter.com/andreabelalcazar"
    ],
    "description": "Profesional en Mercadeo y Estratega Política con experiencia en campañas presidenciales y gestión pública en Colombia.",
    "knowsAbout": ["Comunicación Política", "Gestión de Crisis", "Marketing Digital", "Análisis Político"]
  };

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-slate-300 font-sans selection:bg-amber-500/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* GLOBAL OVERLAYS */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[16px] md:border-[32px] border-[#0A0A0B]"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

      {/* LUXURY NAV */}
      <header className="fixed top-8 left-8 right-8 z-[60] px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/5 rounded-full max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <span className="font-serif text-lg tracking-[0.1em] text-white font-light">Andrea <span className="font-bold">Belalcázar</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
          <a href="#about" className="hover:text-amber-500 transition-colors">Perfil</a>
          <a href="#expertise" className="hover:text-amber-500 transition-colors">Experticia</a>
          <a href="#trajectory" className="hover:text-amber-500 transition-colors">Trayectoria</a>
          <a href="https://wa.me/573105354473" className="text-white hover:text-amber-500 transition-colors">Contacto</a>
        </nav>
      </header>

      {/* HERO SECTION - REFINED SPLIT */}
      <section className="relative min-[90vh] flex items-center justify-center pt-40 pb-20 px-8">
        <div className="max-w-[1400px] w-full grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: STRATEGIC CONTENT */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <Shield className="w-3 h-3 text-amber-500" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-amber-500/80">Estratega de Comunicación Política</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight font-light">
                Donde el análisis se convierte en <span className="italic text-amber-500/90 font-normal">poder.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-xl">
                Arquitecta de narrativas institucionales y experta en gestión de reputación. Transformo la complejidad política en estrategias de impacto real.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <a href="https://wa.me/573105354473" className="px-10 py-5 bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase tracking-[0.2em] text-[11px] rounded-sm transition-all duration-500 shadow-2xl shadow-amber-900/20">
                Agendar Consultoría
              </a>
              <a href="#trajectory" className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-[0.2em] text-[11px] rounded-sm transition-all duration-500">
                Ver Trayectoria
              </a>
            </div>
          </div>

          {/* RIGHT: REFINED PORTRAIT FRAME */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-transparent blur opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
            <div className="relative aspect-[4/5] bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/portrait.jpg" 
                alt="Andrea Belalcázar" 
                fill 
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                 <div className="flex justify-between items-end">
                    <div>
                       <div className="text-white text-xl font-serif mb-1">Andrea Belalcázar</div>
                       <div className="text-[9px] uppercase tracking-[0.2em] text-amber-500/70 font-bold italic">Cali, Colombia</div>
                    </div>
                    <div className="h-10 w-[1px] bg-white/20"></div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PHILOSOPHY - SUBTLE DEPTH */}
      <section id="about" className="py-40 bg-white/2 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-4 sticky top-40">
               <div className="text-[10px] uppercase tracking-[0.5em] font-bold text-amber-500 mb-8 flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-amber-500"></div>
                  Filosofía
               </div>
               <h2 className="font-serif text-4xl text-white leading-tight">Excelencia en <br/>cada mensaje.</h2>
            </div>
            <div className="lg:col-span-8 space-y-16">
              <div className="relative">
                <Quote className="absolute -top-10 -left-10 w-20 h-20 text-white/[0.03]" />
                <h3 className="font-serif text-3xl md:text-5xl text-slate-200 font-light leading-tight">
                  "La comunicación política moderna no acepta errores. O construyes tu narrativa, o dejas que otros la definan por ti."
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-12 text-slate-500 font-light leading-relaxed text-lg">
                <p>
                  Con una sólida formación en mercadeo estratégico y años en la primera línea de la comunicación pública, entiendo el poder de la percepción. Mi enfoque es técnico, asertivo y profundamente estratégico.
                </p>
                <p>
                  Actualmente lidero la estrategia de prensa de la Secretaría de Turismo del Valle, donde cada acción busca no solo informar, sino posicionar nuestra región como un referente de excelencia internacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE - CLEAN BENTO */}
      <section id="expertise" className="py-40">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-24 space-y-4">
            <h2 className="font-serif text-5xl text-white tracking-tight">Áreas de Autoridad</h2>
            <div className="w-20 h-[1px] bg-amber-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Mic />, title: "Análisis Político", desc: "Vocería firme y lectura aguda de la coyuntura nacional." },
              { icon: <Shield />, title: "Gestión de Crisis", desc: "Protección táctica de reputación bajo máxima presión." },
              { icon: <Target />, title: "Marketing & IA", desc: "Tecnologías de vanguardia para posicionamiento digital." },
              { icon: <Briefcase />, title: "Asuntos Públicos", desc: "Traducción técnica para el impacto ciudadano real." }
            ].map((item, idx) => (
              <div key={idx} className="group p-10 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-amber-500/30 transition-all duration-700">
                <div className="w-12 h-12 bg-white/5 text-amber-500 flex items-center justify-center rounded-xl mb-8 group-hover:scale-110 transition-transform duration-500">
                   {item.icon}
                </div>
                <h3 className="text-white text-xl font-serif mb-4 tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAJECTORY - ARCHITECTURAL TIMELINE */}
      <section id="trajectory" className="py-40 bg-white/2">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20">
             <div>
                <h2 className="font-serif text-6xl text-white italic mb-12">Trayectoria <br/>Impecable.</h2>
                <div className="p-10 bg-black/40 border border-white/5 rounded-3xl space-y-12">
                   <div className="space-y-4">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold italic">Actualidad</div>
                      <h3 className="text-2xl text-white font-serif tracking-tight leading-tight">Secretaría de Turismo del Valle</h3>
                      <p className="text-sm text-slate-500 font-light leading-relaxed">Directora de Estrategia de Prensa. Liderazgo del posicionamiento regional y gestión de medios ante coyunturas de alto impacto.</p>
                   </div>
                   <div className="w-full h-[1px] bg-white/5"></div>
                   <div className="space-y-4 text-left">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Hito Electoral</div>
                      <h3 className="text-2xl text-white font-serif tracking-tight leading-tight">Campaña Presidencial <br/>M.F. Cabal</h3>
                      <p className="text-sm text-slate-500 font-light leading-relaxed">Jefatura de Prensa regional. Gestión de narrativa política en entornos de extrema polarización nacional.</p>
                   </div>
                </div>
             </div>
             <div className="flex flex-col justify-end space-y-12">
                <div className="space-y-8 border-l border-amber-500/20 pl-10 py-2">
                   <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Formación</div>
                   <div className="space-y-6">
                      <div>
                        <div className="text-white text-xl font-serif">Gerencia de Marketing Estratégico</div>
                        <div className="text-[9px] uppercase tracking-widest text-slate-600 mt-2 italic">Especialización · Universidad del Valle</div>
                      </div>
                      <div>
                        <div className="text-white text-xl font-serif">Profesional en Mercadeo</div>
                        <div className="text-[9px] uppercase tracking-widest text-slate-600 mt-2 italic">Pregrado · Universidad Santiago de Cali</div>
                      </div>
                   </div>
                </div>
                <div className="aspect-video bg-slate-900/50 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden relative group">
                   <video 
                     src="/clip-video.mp4" 
                     className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                     autoPlay 
                     muted 
                     loop 
                     playsInline
                   />
                   <div className="absolute inset-0 bg-black/40 opacity-40 group-hover:opacity-0 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20">
                         <ChevronRight className="w-6 h-6 text-white ml-1" />
                      </div>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl group">
                      <Image src="/clip-1.jpg" alt="Estrategia 1" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                   <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl group">
                      <Image src="/clip-2.jpg" alt="Estrategia 2" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - MINIMALIST BLACK */}
      <footer className="py-40 bg-black relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-8 text-center space-y-12">
           <h2 className="font-serif text-5xl md:text-8xl text-white font-light tracking-tight leading-tight">
             Elevamos el <br/><span className="italic text-amber-500 font-normal">Discurso.</span>
           </h2>
           <p className="text-slate-500 font-light text-lg tracking-wide max-w-xl mx-auto">
             Disponible para consultoría estratégica, análisis de medios y gestión de crisis institucionales.
           </p>
           <a href="https://wa.me/573105354473" className="group inline-flex items-center gap-6 px-16 py-6 bg-white text-black font-extrabold uppercase tracking-[0.3em] text-[10px] rounded-full transition-all duration-700 hover:bg-amber-500 shadow-2xl">
              Iniciar Conversación Privada
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
           </a>
        </div>
        
        <div className="w-full max-w-[1400px] mt-40 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/5 pt-12 px-8 text-[9px] uppercase tracking-[0.4em] text-slate-700 font-bold">
           <div>A. Belalcázar © 2026 / Cali, Colombia</div>
           <div className="flex gap-12 text-slate-500">
              <a href="https://wa.me/573105354473" className="hover:text-amber-500 transition-colors uppercase tracking-widest">WhatsApp</a>
              <a href="#" className="hover:text-amber-500 transition-colors uppercase tracking-widest">LinkedIn</a>
           </div>
        </div>
      </footer>

      {/* REFINED WHATSAPP FLOAT */}
      <a 
        href="https://wa.me/573105354473" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-12 right-12 z-[100] group flex items-center gap-4"
      >
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-4 group-hover:translate-x-0 hidden md:block">
           <span className="text-[9px] uppercase tracking-[0.3em] text-amber-500 font-bold italic">Privado</span>
        </div>
        <div className="w-16 h-16 bg-amber-600 hover:bg-white text-black flex items-center justify-center rounded-full shadow-[0_20px_50px_rgba(245,158,11,0.2)] transition-all duration-500 group-hover:scale-110 border border-white/10">
           <Phone className="w-6 h-6" />
        </div>
      </a>

    </main>
  );
}
