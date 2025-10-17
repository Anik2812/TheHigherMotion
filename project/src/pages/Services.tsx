import React, { useRef } from 'react';
// === Import motion ===
import { motion, useScroll, useTransform } from 'framer-motion';
import { Film, Palette, Zap, Camera, Music, Monitor } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Film,
      title: "VIDEO EDITING",
      description: "Professional video editing with cinematic storytelling techniques and seamless transitions.",
      features: ["Multi-camera editing", "Advanced transitions", "Audio synchronization", "Pacing optimization"]
    },
    // ... other services ...
    {
      icon: Palette,
      title: "COLOR GRADING",
      description: "Transform your footage with professional color correction and artistic grading.",
      features: ["Color correction", "Cinematic looks", "Custom LUTs", "Mood enhancement"]
    },
    {
      icon: Zap,
      title: "VISUAL EFFECTS",
      description: "Cutting-edge VFX that bring impossible scenes to life with photorealistic quality.",
      features: ["Compositing", "Motion tracking", "3D integration", "Particle effects"]
    },
    {
      icon: Camera,
      title: "MOTION GRAPHICS",
      description: "Dynamic motion graphics and animations that elevate your visual narrative.",
      features: ["Logo animations", "Title sequences", "Lower thirds", "Explainer graphics"]
    },
    {
      icon: Music,
      title: "AUDIO POST",
      description: "Professional audio mixing, sound design, and music synchronization.",
      features: ["Audio mixing", "Sound design", "Music selection", "Voice enhancement"]
    },
    {
      icon: Monitor,
      title: "FINISHING",
      description: "Final delivery optimization for all platforms and quality standards.",
      features: ["Format conversion", "Compression", "Quality control", "Multi-platform delivery"]
    }
  ];

  const processContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: processContainerRef,
    offset: ["start center", "end center"] 
  });
  const pathLength = useTransform(scrollYProgress, val => val);

   // === Animation Variants ===
   const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ // Accept index 'i' for stagger
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: i * 0.1, // Stagger delay based on index
        ease: [0.4, 0, 0.2, 1] as const
      }
    })
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
         >
          <h1 className="futuristic-heading text-4xl sm:text-5xl md:text-7xl gradient-text mb-6 shining-text">
            SERVICES
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive post-production services that transform raw footage into cinematic masterpieces
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="glass-card p-6 sm:p-8 group cursor-pointer relative" // Removed animate-fade-in-up
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Trigger sooner for grid
              custom={index}
              data-cursor-hover="true"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border-2 border-red-500/30 rounded-lg group-hover:border-red-500 transition-all duration-300">
                  <service.icon size={window.innerWidth < 640 ? 24 : 32} className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="futuristic-heading text-lg sm:text-xl mb-4 group-hover:gradient-text transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-white/70 mb-6 leading-relaxed text-sm sm:text-base">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-white/60 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-16 sm:mt-24 md:mt-32">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <h2 className="futuristic-heading text-3xl sm:text-4xl md:text-5xl gradient-text mb-6 shining-text">
              OUR PROCESS
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              A streamlined workflow that ensures your project receives the attention and quality it deserves
            </p>
          </motion.div>

          {/* Process section with SVG line */}
          <div ref={processContainerRef} className="relative">
            <svg className="process-svg" width="100%" height="100%" viewBox="0 0 1200 100" preserveAspectRatio="none">
              <motion.path
                className="process-svg-line"
                d="M 150 50 L 450 50 L 750 50 L 1050 50"
                style={{ pathLength }} 
              />
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
              {[
                { step: "01", title: "CONSULTATION", description: "Understanding your vision and project requirements" },
                { step: "02", title: "PLANNING", description: "Developing the creative and technical approach" },
                { step: "03", title: "PRODUCTION", description: "Executing the edit with precision and artistry" },
                { step: "04", title: "DELIVERY", description: "Final review and multi-format delivery" }
              ].map((phase, index) => (
                <motion.div 
                    key={phase.step} 
                    className="text-center group" // Removed animate-fade-in-up
                    variants={cardVariants} // Use card variant for consistency
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={index} // Stagger based on index
                  >
                  <div className="futuristic-heading text-4xl sm:text-5xl md:text-6xl gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                    {phase.step}
                  </div>
                  <h3 className="futuristic-heading text-base sm:text-lg mb-3 group-hover:text-red-500 transition-colors">
                    {phase.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
            className="mt-16 sm:mt-24 md:mt-32 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
          <div className="glass-card p-8 sm:p-12 max-w-4xl mx-auto">
            <h3 className="futuristic-heading text-2xl sm:text-3xl md:text-4xl gradient-text mb-6 shining-text">
              READY TO START YOUR PROJECT?
            </h3>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss your vision and create something extraordinary together.
              Every great story deserves exceptional post-production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="neon-button" data-cursor-hover="true">
                GET QUOTE
              </button>
              <button className="neon-button bg-transparent border-white/30 text-white/70 hover:border-red-500 hover:text-white" data-cursor-hover="true">
                VIEW PORTFOLIO
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;