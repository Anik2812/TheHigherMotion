import React, { useEffect, useState, useRef } from 'react';
// === Import motion and ALL necessary hooks ===
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { ChevronDown, Play, Film, Award, Zap, Users, Star } from 'lucide-react';

// === Reusable Animated Stat Counter Component (Included directly for simplicity) ===
interface AnimatedStatProps {
  to: number;
  label: string;
  plus?: boolean;
}
const AnimatedStat: React.FC<AnimatedStatProps> = ({ to, label, plus = false }) => {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger once when 50% visible
   const [displayValue, setDisplayValue] = useState(0);

   useEffect(() => {
     if (isInView) {
       const controls = animate(0, to, {
         duration: 2, // Animation duration
         ease: "easeOut",
         onUpdate(value) {
           setDisplayValue(Math.floor(value));
         },
       });
       // Cleanup function
       return () => controls.stop();
     }
   }, [isInView, to]); // Rerun if isInView or 'to' changes

   return (
     <div ref={ref} className="text-center">
       <div className="futuristic-heading text-2xl sm:text-3xl md:text-4xl gradient-text mb-2">
         {displayValue}{plus && '+'}
       </div>
       <div className="text-white/60 text-xs sm:text-sm uppercase tracking-wider">{label}</div>
     </div>
   );
 };
// === END Animated Stat Component ===

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false); // For initial load animations

  // === Ref for the hero section ===
  const heroRef = useRef<HTMLElement>(null);

  // === Framer Motion scroll tracking for the H1 reveal ===
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"] // Animate from top hitting top, until bottom hits top
  });

  // === Transform scroll progress (0 to 1) into clip-path inset bottom (100% to 0%) ===
  // We use a slightly adjusted range [0, 0.5] -> ["100%", "0%"] so the reveal happens faster as you scroll down.
  const clipPathBottom = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);
  // Fade out the rest of the hero content as you scroll further
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [1, 1, 0]); // Fade out between 60% and 80% scroll
  const heroContentScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]); // Slight scale down


  useEffect(() => {
    // Trigger initial load animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Run only once

  // === Animation Variants for Sections Below Hero ===
   const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as any } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] as any }
    })
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* === Hero Section with Ref === */}
      <section ref={heroRef} className="h-screen flex items-center justify-center relative section-container overflow-hidden">
        {/* Background (no scroll effect needed here) */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(242, 31, 12, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(140, 3, 3, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(242, 31, 12, 0.1) 0%, transparent 70%)
            `,
          }}
        />

        {/* === Hero Content Wrapper with Scroll-Based Opacity/Scale === */}
        <motion.div
            className={`text-center z-10 px-6 max-w-6xl mx-auto`}
            style={{
                opacity: heroContentOpacity, // Apply fade out
                scale: heroContentScale // Apply scale down
            }}
         >
          {/* Pre-title with initial load animation */}
          <motion.div
            className={`text-red-500 text-sm md:text-base font-medium uppercase tracking-[0.3em] mb-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            PREMIUM VIDEO PRODUCTION
          </motion.div>

          {/* === H1 with Scroll-Based Clip-Path Reveal === */}
          <motion.h1
            className="futuristic-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl gradient-text mb-8 leading-none shining-text"
            // Apply the dynamic clip-path style linked to scrollYProgress
            style={{ clipPath: `inset(0% 0% ${clipPathBottom} 0%)` }}
            initial={{ opacity: 0 }} // Start hidden before load
            animate={isLoaded ? { opacity: 1 } : {}} // Fade in on load
            transition={{ duration: 1 }} // Initial fade-in duration
          >
            THE HIGHER
            <br />
            <span className="inline-block">MOTION</span>
          </motion.h1>
          {/* === END H1 Reveal === */}

          {/* Subtitle with initial load animation */}
          <motion.div
            className={`text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Elevating stories through cinematic excellence and boundless creativity
          </motion.div>

          {/* Buttons with initial load animation */}
          <motion.div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center`}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <button className="neon-button flex items-center gap-3 group" data-cursor-hover="true">
              <Play size={20} className="group-hover:scale-110 transition-transform" />
              WATCH SHOWREEL
            </button>
            <button className="neon-button bg-gradient-to-r from-red-600 to-red-800 border-transparent" data-cursor-hover="true">
              BEGIN PROJECT
            </button>
          </motion.div>

          {/* Stats counter section with initial load animation */}
          <motion.div
            className={`grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto`}
             initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.0 }} // Delayed appearance
          >
            {/* Using the AnimatedStat component */}
            <AnimatedStat to={500} label="Projects" plus />
            <AnimatedStat to={150} label="Clients" plus />
            <AnimatedStat to={25} label="Awards" plus />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - fades out with scroll */}
         <motion.div
            className="scroll-indicator"
            style={{ opacity: heroContentOpacity }} // Link opacity to scroll
         />
      </section>
      {/* === END Hero Section Update === */}


      {/* Services Preview (Using Framer Motion) */}
      <motion.section
        className="py-16 sm:py-24 md:py-32 px-6 relative section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="futuristic-heading text-3xl sm:text-4xl md:text-6xl gradient-text mb-6 shining-text">
              CINEMATIC SERVICES
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Professional video editing and post-production services that bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Film, title: "EDITING", desc: "Cinematic storytelling through precise cuts" },
              { icon: Zap, title: "VFX", desc: "Visual effects that blur reality" },
              { icon: Award, title: "GRADING", desc: "Color correction and artistic enhancement" },
              { icon: Users, title: "MOTION", desc: "Dynamic graphics and animations" }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="futuristic-card p-6 sm:p-8 text-center group cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                data-cursor-hover="true"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border-2 border-red-500/30 rounded-lg mb-4 sm:mb-6 group-hover:border-red-500 transition-all duration-300">
                  <service.icon size={window.innerWidth < 640 ? 20 : 28} className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="futuristic-heading text-base sm:text-lg mb-3 group-hover:gradient-text transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Feature Highlights (Using Framer Motion) */}
       <motion.section
        className="py-16 sm:py-24 md:py-32 px-6 relative section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="futuristic-heading text-3xl sm:text-4xl md:text-6xl gradient-text mb-6 shining-text">
              WHY CHOOSE US
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                title: "CINEMATIC EXCELLENCE",
                description: "Award-winning post-production that elevates every frame to cinematic perfection",
                metric: "500+ PROJECTS",
                highlight: "INDUSTRY LEADING"
              },
              {
                title: "CREATIVE MASTERY",
                description: "Artistic vision combined with technical expertise for stunning visual narratives",
                metric: "1M+ FRAMES",
                highlight: "PIXEL PERFECT"
              },
              {
                title: "PREMIUM DELIVERY",
                description: "Fast turnaround times without compromising on quality or creative vision",
                metric: "10+ YEARS",
                highlight: "PROVEN EXPERTISE"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="futuristic-card p-8 sm:p-10 group cursor-pointer relative overflow-hidden"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                data-cursor-hover="true"
              >
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-xs font-medium text-red-500 uppercase tracking-wider">
                  {feature.highlight}
                </div>
                <div className="text-red-500 futuristic-heading text-sm sm:text-lg mb-6 tracking-wider">
                  {feature.metric}
                </div>
                <h3 className="futuristic-heading text-xl sm:text-2xl mb-6 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials (Using Framer Motion) */}
       <motion.section
        className="py-16 sm:py-24 md:py-32 px-6 relative section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="futuristic-heading text-3xl sm:text-4xl md:text-6xl gradient-text mb-6 shining-text">
              CLIENT TESTIMONIALS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {[
               {
                quote: "The Higher Motion transformed our raw footage into a cinematic masterpiece. Every frame was perfection.",
                author: "SARAH MARTINEZ",
                role: "Creative Director, Nexus Studios",
                rating: 5,
                logo: "https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=100",
                subscribers: "2.3M"
              },
              {
                quote: "Professional, creative, and incredibly talented. They elevated our brand story beyond our expectations.",
                author: "MICHAEL CHEN",
                role: "Producer, Apex Films",
                rating: 5,
                logo: "https://images.pexels.com/photos/3394657/pexels-photo-3394657.jpeg?auto=compress&cs=tinysrgb&w=100",
                subscribers: "1.8M"
              },
              {
                quote: "The attention to detail and cinematic quality is unmatched. Our audience engagement increased by 300%.",
                author: "ALEX RIVERA",
                role: "Content Creator",
                rating: 5,
                logo: "https://images.pexels.com/photos/3394656/pexels-photo-3394656.jpeg?auto=compress&cs=tinysrgb&w=100",
                subscribers: "950K"
              },
              {
                quote: "Working with The Higher Motion was a game-changer. They brought our vision to life flawlessly.",
                author: "JORDAN BLAKE",
                role: "Marketing Director, TechFlow",
                rating: 5,
                logo: "https://images.pexels.com/photos/3394655/pexels-photo-3394655.jpeg?auto=compress&cs=tinysrgb&w=100",
                subscribers: "1.2M"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="futuristic-card testimonial-card p-8 sm:p-10 group cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                data-cursor-hover="true"
              >
                <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                  <img
                    src={testimonial.logo}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-red-500/50"
                  />
                  <div className="text-xs text-red-500 font-semibold">{testimonial.subscribers}</div>
                </div>
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-red-500 fill-current" />
                  ))}
                </div>
                <blockquote className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 italic pr-16">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="futuristic-heading text-red-500 mb-1 text-sm sm:text-base">
                    {testimonial.author}
                  </div>
                  <div className="text-white/60 text-xs sm:text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action (Using Framer Motion) */}
       <motion.section
        className="py-16 sm:py-24 md:py-32 px-6 relative section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <div className="futuristic-card p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
            <h2 className="futuristic-heading text-3xl sm:text-4xl md:text-6xl gradient-text mb-8 relative z-10 shining-text">
              READY TO CREATE
              <br />
              CINEMATIC MAGIC?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed relative z-10">
              Transform your raw footage into a cinematic masterpiece. Let's collaborate to bring your vision to life with cutting-edge techniques and artistic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button className="neon-button text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 group" data-cursor-hover="true">
                <span className="group-hover:scale-110 transition-transform inline-block">
                  START YOUR PROJECT
                </span>
              </button>
              <button className="neon-button bg-transparent border-white/30 text-white/80 hover:border-red-500 hover:text-white text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6" data-cursor-hover="true">
                VIEW OUR WORK
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;