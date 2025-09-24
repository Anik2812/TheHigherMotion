import React, { useEffect, useState } from 'react';
import { ChevronDown, Play, Film, Award, Zap, Users } from 'lucide-react';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStats, setCurrentStats] = useState({ projects: 0, clients: 0, awards: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);

    // Animate stats counter
    const animateStats = () => {
      const targets = { projects: 500, clients: 150, awards: 25 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCurrentStats({
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          awards: Math.floor(targets.awards * progress)
        });

        if (step >= steps) clearInterval(timer);
      }, stepTime);
    };

    setTimeout(animateStats, 1000);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create floating particles
  const createParticles = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${10 + Math.random() * 10}s`
        }}
      />
    ));
  };
  return (
    <div className="min-h-screen relative overflow-hidden cinematic-bars scan-lines">
      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Floating particles */}
      <div className="particles">
        {createParticles()}
      </div>

      {/* Moving spotlight */}
      <div className="spotlight" />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 py-24 sm:py-32">
        {/* Animated background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(242, 31, 12, 0.2) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(140, 3, 3, 0.2) 0%, transparent 40%)
            `,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        {/* Additional cinematic elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        <div className={`text-center z-10 max-w-6xl mx-auto transform transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Pre-title */}
          <div className={`text-red-500 text-sm md:text-base font-medium uppercase tracking-[0.3em] mb-4 transform transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            PREMIUM VIDEO PRODUCTION
          </div>

          <h1 className="futuristic-heading text-6xl md:text-8xl lg:text-9xl gradient-text mb-8 leading-none text-reveal">
            CINEMATIC
            <br />
            <span className="inline-block glitch-intense" data-text="VISION">VISION</span>
          </h1>

          <div className={`typewriter text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ width: isLoaded ? '100%' : '0' }}>
            Crafting stories that transcend reality through cinematic excellence
          </div>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-800 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button className="neon-button flex items-center gap-3 group">
              <Play size={20} className="group-hover:scale-110 transition-transform" />
              WATCH SHOWREEL
            </button>
            <button className="neon-button bg-gradient-to-r from-red-600 to-red-800 border-transparent">
              BEGIN PROJECT
            </button>
          </div>

          {/* Stats counter */}
          <div className={`grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto transform transition-all duration-1000 delay-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="text-center">
              <div className="futuristic-heading text-3xl md:text-4xl gradient-text mb-2">
                {currentStats.projects}+
              </div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Projects</div>
            </div>
            <div className="text-center">
              <div className="futuristic-heading text-3xl md:text-4xl gradient-text mb-2">
                {currentStats.clients}+
              </div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Clients</div>
            </div>
            <div className="text-center">
              <div className="futuristic-heading text-3xl md:text-4xl gradient-text mb-2">
                {currentStats.awards}+
              </div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Awards</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" />
      </section>

      {/* Services Preview */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="futuristic-heading text-4xl md:text-6xl gradient-text mb-6">
              CINEMATIC SERVICES
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Professional video editing and post-production services that bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Film, title: "EDITING", desc: "Cinematic storytelling through precise cuts" },
              { icon: Zap, title: "VFX", desc: "Visual effects that blur reality" },
              { icon: Award, title: "GRADING", desc: "Color correction and artistic enhancement" },
              { icon: Users, title: "MOTION", desc: "Dynamic graphics and animations" }
            ].map((service, index) => (
              <div
                key={service.title}
                className="futuristic-card p-8 text-center group cursor-none"
                style={{
                  transform: `translateY(${scrollY * 0.05 * (index + 1)}px)`,
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-red-500/30 rounded-lg mb-6 group-hover:border-red-500 group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300">
                  <service.icon size={28} className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="futuristic-heading text-lg mb-3 group-hover:gradient-text transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Feature Highlights */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="futuristic-heading text-4xl md:text-6xl gradient-text mb-6">
              WHY CHOOSE US
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
              <div
                key={feature.title}
                className="futuristic-card p-10 group cursor-none relative overflow-hidden"
                style={{
                  transform: `translateY(${scrollY * 0.1 * (index + 1)}px)`,
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Highlight badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-xs font-medium text-red-500 uppercase tracking-wider">
                  {feature.highlight}
                </div>

                <div className="text-red-500 futuristic-heading text-lg mb-6 tracking-wider">
                  {feature.metric}
                </div>
                <h3 className="futuristic-heading text-2xl mb-6 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="futuristic-heading text-4xl md:text-6xl gradient-text mb-6">
              CLIENT TESTIMONIALS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                quote: "The cinematic quality they delivered exceeded our wildest expectations. Every frame was perfection.",
                author: "SARAH MARTINEZ",
                role: "Creative Director, Nexus Studios",
                rating: 5
              },
              {
                quote: "Professional, creative, and incredibly talented. They transformed our raw footage into a masterpiece.",
                author: "MICHAEL CHEN",
                role: "Producer, Apex Films",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="futuristic-card p-10 group cursor-none"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-red-500 rounded-full mr-1" />
                  ))}
                </div>
                <blockquote className="text-white/90 text-lg leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="futuristic-heading text-red-500 mb-1">
                    {testimonial.author}
                  </div>
                  <div className="text-white/60 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="futuristic-card p-16 text-center relative overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-800/10 opacity-50" />

            <h2 className="futuristic-heading text-4xl md:text-6xl gradient-text mb-8 relative z-10">
              READY TO CREATE
              <br />
              CINEMATIC MAGIC?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed relative z-10">
              Transform your raw footage into a cinematic masterpiece. Let's collaborate to bring your vision to life with cutting-edge techniques and artistic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button className="neon-button text-lg px-12 py-6 group">
                <span className="group-hover:scale-110 transition-transform inline-block">
                  START YOUR PROJECT
                </span>
              </button>
              <button className="neon-button bg-transparent border-white/30 text-white/80 hover:border-red-500 hover:text-white text-lg px-12 py-6">
                VIEW OUR WORK
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;