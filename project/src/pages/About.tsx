import React, { useEffect, useState, useRef } from 'react';
// === NEW: Import Framer Motion hooks and elements ===
import { motion, useInView, animate } from 'framer-motion';
import { Award, Users, Calendar, Target } from 'lucide-react';

// === NEW: Reusable Animated Stat Counter Component ===
interface AnimatedStatProps {
  to: number;
  label: string;
  plus?: boolean; // Optional: to add a '+' sign
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ to, label, plus = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  // useInView detects when the element is visible in the viewport
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger once when 50% visible
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Only animate if the element is in view
    if (isInView) {
      // Use Framer Motion's animate function for smooth counting
      const controls = animate(0, to, {
        duration: 2, // Animation duration
        ease: "easeOut", // Makes the count slow down towards the end
        onUpdate(value) {
          // Update the displayed number on each animation frame
          setDisplayValue(Math.floor(value));
        },
      });
      // Cleanup function to stop animation if component unmounts
      return () => controls.stop();
    }
  }, [isInView, to]); // Dependency array ensures effect runs when isInView or 'to' changes

  return (
    // Attach the ref to the containing div
    <div ref={ref} className="text-center">
      {/* Adjusted font size for stats */}
      <div className="futuristic-heading text-2xl sm:text-3xl gradient-text mb-1">
        {/* Display the animated value */}
        {displayValue}{plus && '+'}
      </div>
      <div className="text-xs text-white/60 uppercase">{label}</div>
    </div>
  );
};
// === END Animated Stat Component ===

const About: React.FC = () => {
  // Removed scrollY state, Framer Motion handles scroll detection
  // const [scrollY, setScrollY] = useState(0);
  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // === Animation Variants ===
   const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    // Using 'any' for the cubic-bezier array type assertion
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as any } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ // Accept index 'i' for stagger
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1, // Stagger delay based on index
        ease: [0.23, 1, 0.32, 1] as any
      }
    })
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section - Applying simple motion for consistency */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-24 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger early
          variants={sectionVariants}
        >
          <div>
            <h1 className="futuristic-heading text-4xl sm:text-5xl md:text-7xl gradient-text mb-6 sm:mb-8 leading-tight shining-text">
              CRAFTING
              <br />
              <span className="text-white">VISUAL</span>
              <br />
              STORIES
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed">
              For over a decade, we've been pushing the boundaries of visual storytelling,
              creating cinematic experiences that captivate audiences and elevate brands
              through the power of exceptional post-production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="neon-button" data-cursor-hover="true">
                VIEW OUR JOURNEY
              </button>
              <button className="neon-button bg-transparent border-white/30 text-white/70 hover:border-red-500 hover:text-white" data-cursor-hover="true">
                MEET THE TEAM
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Image container - No scroll effect needed here unless desired */}
            <div
              className="relative overflow-hidden rounded-2xl"
              // Removed inline parallax style: style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <img
                src="https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Studio workspace"
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 border-2 border-red-500/20 hover:border-red-500/40 transition-colors duration-500 rounded-2xl" />
            </div>

            {/* Floating stats using the animated component */}
            <div className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 glass-card p-4 sm:p-6 w-24 sm:w-32">
              <AnimatedStat to={10} label="Years" plus />
            </div>

            <div className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 glass-card p-4 sm:p-6 w-24 sm:w-32">
              <AnimatedStat to={500} label="Projects" plus />
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-24 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
          variants={sectionVariants} // Use section animation
          transition={{ staggerChildren: 0.2 }} // Stagger children appearance
        >
          {/* Apply motion individually if staggerChildren isn't sufficient */}
          <motion.div className="glass-card p-6 sm:p-8 md:p-10" variants={sectionVariants} data-cursor-hover="true">
            <div className="flex items-center mb-6">
              <Target size={window.innerWidth < 640 ? 24 : 32} className="text-red-500 mr-4" />
              <h2 className="futuristic-heading text-lg sm:text-xl md:text-2xl">OUR MISSION</h2>
            </div>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base md:text-lg">
              To transform raw footage into powerful visual narratives that connect with audiences
              on an emotional level, using cutting-edge technology and artistic vision to bring
              stories to life in ways that were previously unimaginable.
            </p>
          </motion.div>

          <motion.div className="glass-card p-6 sm:p-8 md:p-10" variants={sectionVariants} data-cursor-hover="true">
            <div className="flex items-center mb-6">
              <Award size={window.innerWidth < 640 ? 24 : 32} className="text-red-500 mr-4" />
              <h2 className="futuristic-heading text-lg sm:text-xl md:text-2xl">OUR VISION</h2>
            </div>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base md:text-lg">
              To be the premier destination for cinematic post-production, setting new standards
              in visual storytelling and inspiring the next generation of filmmakers and content
              creators to push creative boundaries.
            </p>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <div className="mb-16 sm:mb-24 md:mb-32">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <h2 className="futuristic-heading text-3xl sm:text-4xl md:text-5xl gradient-text mb-6 shining-text">
              THE VISIONARIES
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto">
              Meet the creative minds behind every frame, dedicated to excellence in visual storytelling
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "ALEX RIVERA",
                role: "Creative Director",
                specialty: "Color Grading & VFX",
                image: "https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=400",
                experience: "12+ Years"
              },
              {
                name: "MAYA CHEN",
                role: "Senior Editor",
                specialty: "Narrative & Commercial",
                image: "https://images.pexels.com/photos/3394657/pexels-photo-3394657.jpeg?auto=compress&cs=tinysrgb&w=400",
                experience: "8+ Years"
              },
              {
                name: "JORDAN BLAKE",
                role: "VFX Supervisor",
                specialty: "Motion Graphics & Compositing",
                image: "https://images.pexels.com/photos/3394656/pexels-photo-3394656.jpeg?auto=compress&cs=tinysrgb&w=400",
                experience: "10+ Years"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="glass-card overflow-hidden group cursor-pointer" // Removed animate-fade-in-up
                variants={cardVariants} // Use card variant
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index} // Pass index for stagger
                data-cursor-hover="true"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-red-500 text-xs sm:text-sm font-medium mb-1">
                      {member.experience}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="futuristic-heading text-lg sm:text-xl mb-2 group-hover:gradient-text transition-all duration-300">
                    {member.name}
                  </h3>
                  <div className="text-red-500 font-medium text-xs sm:text-sm mb-2 uppercase tracking-wide">
                    {member.role}
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm">
                    {member.specialty}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 sm:mb-24 md:mb-32">
           <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
           >
            <h2 className="futuristic-heading text-3xl sm:text-4xl md:text-5xl gradient-text mb-6 shining-text">
              OUR VALUES
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Award,
                title: "EXCELLENCE",
                description: "Every frame is crafted with meticulous attention to detail"
              },
              {
                icon: Users,
                title: "COLLABORATION",
                description: "Working closely with clients to bring their vision to life"
              },
              {
                icon: Calendar,
                title: "INNOVATION",
                description: "Constantly exploring new techniques and technologies"
              },
              {
                icon: Target,
                title: "PASSION",
                description: "Driven by love for the art of visual storytelling"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center group cursor-pointer" // Removed animate-fade-in-up
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                data-cursor-hover="true"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 border-2 border-red-500/30 rounded-lg mb-4 sm:mb-6 group-hover:border-red-500 transition-all duration-300">
                  <value.icon size={window.innerWidth < 640 ? 24 : 32} className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="futuristic-heading text-base sm:text-lg mb-3 group-hover:gradient-text transition-all duration-300">
                  {value.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="glass-card p-8 sm:p-12 max-w-4xl mx-auto">
            <h3 className="futuristic-heading text-2xl sm:text-3xl md:text-4xl gradient-text mb-6 shining-text">
              LET'S CREATE TOGETHER
            </h3>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to elevate your project with cinematic excellence?
              Let's discuss how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="neon-button" data-cursor-hover="true">
                START A PROJECT
              </button>
              <button className="neon-button bg-transparent border-white/30 text-white/70 hover:border-red-500 hover:text-white" data-cursor-hover="true">
                SCHEDULE A CALL
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;