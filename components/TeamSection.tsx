import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Linkedin, 
  Mail, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from "lucide-react";

// --- 1. TEAM DATA ---
const teamMembers = [
  {
    name: "Miss Vedika Joshi",
    title: "Founder / Editor-in-Chief",
    image: "https://picsum.photos/seed/vedika/400/400",
    linkedin: "#",
    email: "#",
    tags: ["Economics", "Finance", "Leadership"],
    bio: "Vedika is a student of Economics and Finance at the University of Winchester and a Royal Navy Officer Cadet (URNU). She brings a rare combination of intellectual curiosity, leadership, and operational discipline to the publication. Her background spans university governance, policy engagement, and financial training, with experience across organisations such as the Royal Navy Leadership Institute and as a University Student Union Trustee. Vedika is also a Model UN chair with multilingual fluency and embodies the cross-sector insight Debt & Dominion was founded to represent.",
  },
  {
    name: "Mr Joshua Pinto",
    title: "Finance and Sponsorship Lead",
    image: "https://picsum.photos/seed/joshua/400/400",
    linkedin: "#",
    email: "#",
    tags: ["Economics", "Finance", "Sponsorship"],
    bio: "Joshua Pinto is a recent graduate from Lancaster University who studied Economics and Finance and is currently working in the finance department at Indie Campers in Portugal. He enjoys working with numbers and understanding the ins and outs of a business. At Debt & Dominion, he is part of the finance team and helps in sponsorship coordination as well, responsible for helping manage the future of the magazine’s growth.",
  },
  {
    name: "Mr Dhanush Kumar",
    title: "Web Developer Lead",
    image: "https://picsum.photos/seed/dhanush/400/400",
    linkedin: "https://www.linkedin.com/in/dhanush-kumar-k-sret/",
    email: "dhanushkumark62@gmail.com",
    tags: ["AI / ML", "Full Stack", "Digital Strategy"],
    bio: "Currently pursuing a B.Tech in Computer Science with a specialisation in Artificial Intelligence and Machine Learning at Sri Ramachandra Institute of Higher Education and Research, Dhanush brings a potent blend of technical acumen and strategic communication to the team. His experience in digital marketing at Karmactive, where he contributed to impactful campaigns through sophisticated content strategy and compelling storytelling, provides him with a unique perspective on user engagement. At Debt & Dominion, Dhanush architects our digital platform, ensuring a seamless and intuitive user experience.",
  },
  {
    name: "Mr Mohammadul Hassan",
    title: "Web Developer",
    image: "https://picsum.photos/seed/hassan/400/400",
    linkedin: "https://www.linkedin.com/in/hassan290904/",
    email: "hassan_a22@outlook.com",
    tags: ["Backend", "Automation", "Applied AI"],
    bio: "Currently pursuing a B.Tech in Computer Science with a specialisation in Artificial Intelligence and Machine Learning at Sri Ramachandra Institute of Higher Education and Research, Hassan brings practical experience in backend and full-stack development, supported by a strong grounding in applied AI. Having worked as a backend developer intern at a technology startup, he contributed to building scalable APIs and optimising performance within agile environments. At Debt & Dominion, he applies his expertise in AI-driven engineering to strengthen the publication's digital platform, integrating automation, enhancing infrastructure, and ensuring every system remains secure, efficient, and future-ready.",
  },
  {
    name: "Miss Suwetha",
    title: "Graphic Designer",
    image: "https://picsum.photos/seed/suwetha/400/400",
    linkedin: "#",
    email: "#",
    tags: ["User Research", "Branding", "UI Design"],
    bio: "Suwetha is an Engineering Graduate and a passionate designer with a Professional Design Certificate from Google. She merges technical skills like User Research, Wireframing, and Branding with creative execution using tools like Figma, Adobe Suite, and Canva. As a Graphic Designer at Debt & Dominion, she develops clean, engaging layouts and ensures high-quality publications that adhere to brand standards.",
  },
  {
    name: "Miss Saniya Patel",
    title: "Sponsorship Coordinator",
    image: "https://picsum.photos/seed/saniya/400/400",
    linkedin: "#",
    email: "#",
    tags: ["Accounting", "Management", "Partnerships"],
    bio: "Saniya Patel is a Master’s student studying Accounting and Management and is currently pursuing her CIMA qualification. With a strong interest in accounting and finance, she enjoys working with numbers and analysing business performance. At Debt & Dominion, she serves as the Sponsorship Coordinator, responsible for creating pitch decks, reaching out to potential sponsors, and managing outreach initiatives to build lasting partnerships and support the magazine’s growth.",
  },
  {
    name: "Mr Daniel",
    title: "IR & Politics Lead",
    image: "https://picsum.photos/seed/daniel/400/400",
    linkedin: "#",
    email: "#",
    tags: ["Philosophy", "Global Affairs", "Editorial"],
    bio: "Daniel is a BA Philosophy graduate from University College London (UCL) where he achieved a top 2:1 and strengthened his expertise in political philosophy, global affairs, and ethical critique. Proficient in editorial workflows, journalistic writing, and managing leadership roles, Daniel oversees teams with editorial direction and expertise. At Debt & Dominion, Daniel handles the International Relations & Politics chapter—ensuring each issue is globally minded and audience-focused.",
  },
  {
    name: "Miss Ankita",
    title: "Editor",
    image: "https://picsum.photos/seed/ankita/400/400",
    linkedin: "#",
    email: "#",
    tags: ["Literature", "Research", "Analysis"],
    bio: "Ankita is a BA (Honours) final-year student studying English Literature at the University of Warwick. She has honed her written and analytical skills through her course, developing a keen eye for detail and research. Ankita has worked as an editor, accredited in a published anthology. At Debt & Dominion, she works with her team to ensure high-quality, well-researched journal articles on various topics.",
  },
];

// --- 2. MAIN COMPONENT ---
export default function App() {
  const [selected, setSelected] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const carouselRef = useRef(null);
  const AUTO_PLAY_SPEED = 6000;

  const scroll = useCallback((direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
      const cardWidth = 320; 
      
      let scrollTo;
      if (direction === "right") {
        scrollTo = scrollLeft + clientWidth >= scrollWidth - 10 ? 0 : scrollLeft + cardWidth;
      } else {
        scrollTo = scrollLeft <= 0 ? scrollWidth : scrollLeft - cardWidth;
      }
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      setProgress(0); 
    }
  }, []);

  useEffect(() => {
    if (selected !== null) return;
    
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            scroll("right");
            return 0;
          }
          return prev + (100 / (AUTO_PLAY_SPEED / 100));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPaused, selected, scroll]);

  return (
    <div className=" bg-white dark:bg-brand-secondary text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 selection:bg-teal-100 dark:selection:bg-teal-900/30 overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-8 md:pb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-6xl font-medium tracking-tight mb-4 leading-tight"
        >
          Insights that <span className="text-[#3fb299] italic">matter</span> with <br />
          <span className="font-bold">expert-led analysis</span>
        </motion.h1>
      </div>

      <AnimatePresence mode="wait">
        {selected !== null ? (
          /* --- DETAIL VIEW --- */
          <motion.div 
            key="detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-6xl mx-auto px-6 mb-20"
          >
            <button 
              onClick={() => setSelected(null)}
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 font-medium"
            >
              <ArrowLeft size={18} /> Back to Panel
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-[#f4f9f6] dark:bg-slate-900/50 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 lg:p-16 items-start shadow-sm border border-transparent dark:border-slate-800">
              <div className="relative group lg:sticky lg:top-8 w-full max-w-md mx-auto lg:max-w-none">
                <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem] aspect-square shadow-2xl">
                  <img 
                    src={teamMembers[selected].image} 
                    className="w-full h-full object-cover"
                    alt={teamMembers[selected].name}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl hidden sm:block border border-slate-50 dark:border-slate-700">
                  <div className="text-teal-600 dark:text-[#3fb299] font-bold text-xs md:text-sm uppercase tracking-tighter">Verified Member</div>
                  <div className="text-slate-400 dark:text-slate-500 text-[10px] md:text-xs">Debt & Dominion Team</div>
                </div>
              </div>
              <div className="pt-4 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">{teamMembers[selected].name}</h2>
                <p className="text-lg md:text-xl text-teal-600 dark:text-[#3fb299] font-medium mb-6">{teamMembers[selected].title}</p>
                
                <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                  {teamMembers[selected].tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-[#3fb299] rounded-full text-xs font-semibold border border-teal-100 dark:border-teal-800/40">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="w-12 h-1 bg-teal-500 mx-auto lg:mx-0 mb-8" />
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10 text-left">
                  {teamMembers[selected].bio}
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {teamMembers[selected].linkedin !== "#" && (
                    <a 
                      href={teamMembers[selected].linkedin} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg"
                    >
                      <Linkedin size={18} /> LinkedIn
                    </a>
                  )}
                  {teamMembers[selected].email !== "#" && (
                    <a 
                      href={`mailto:${teamMembers[selected].email}`}
                      className="flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Mail size={18} /> Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- CAROUSEL VIEW --- */
          <motion.div 
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Nav Arrows */}
            <div className="absolute top-[35%] left-0 right-0 -translate-y-1/2 hidden md:flex justify-between px-4 lg:px-12 z-10 pointer-events-none">
              <button 
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center pointer-events-auto border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-teal-600 dark:hover:text-[#3fb299] transition-all hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center pointer-events-auto border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-teal-600 dark:hover:text-[#3fb299] transition-all hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Track */}
            <div 
              ref={carouselRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex gap-4 md:gap-8 overflow-x-auto px-6 md:px-[10%] pb-12 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {teamMembers.map((member, idx) => (
                <div 
                  key={idx}
                  className="min-w-[280px] md:min-w-[340px] snap-center"
                >
                  <motion.div 
                    onClick={() => setSelected(idx)}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-[#f4f9f6] dark:bg-slate-900/40 rounded-[2rem] p-5 md:p-6 h-full flex flex-col cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-teal-900/5 group border border-transparent hover:border-teal-100 dark:hover:border-teal-900/30"
                  >
                    {/* Image Area - Filled and Contained */}
                    <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square shadow-inner bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content Area */}
                    <div className="mt-auto">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-[#3fb299] transition-colors line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-1 mb-4 line-clamp-1">
                        {member.title}
                      </p>

                      {/* Expertise Tags - Single Line with staggered entry */}
                      <div className="flex flex-wrap gap-2 overflow-hidden">
                        {member.tags.map((tag, tIdx) => (
                          <motion.span 
                            key={tIdx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: tIdx * 0.1, duration: 0.3 }}
                            className="px-2 py-0.5 bg-white/50 dark:bg-slate-800/50 text-[10px] md:text-xs font-medium text-slate-600 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-700 whitespace-nowrap"
                          >
                            <span className="text-teal-500 mr-1">#</span>{tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="max-w-2xl mx-auto px-6 text-center mt-4 md:mt-8">
              <h4 className="text-slate-900 dark:text-slate-100 font-bold mb-3 uppercase text-[10px] md:text-xs tracking-[0.2em]">Expertise is built in.</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs md:text-sm px-4">
                The Debt & Dominion team is comprised of specialists across Economics, Technology, 
                and Politics. Our collaborative engine ensures every publication is 
                future-ready and grounded in intellectual rigor.
              </p>
            </div>

            {/* Progress Timer */}
            <div className="max-w-[8rem] md:max-w-[12rem] mx-auto mt-8 md:mt-10 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#3fb299]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="py-20 md:py-24 text-center opacity-5 dark:opacity-10 pointer-events-none select-none">
        <h2 className="text-4xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter">DEBT & DOMINION</h2>
      </footer>
    </div>
  );
}