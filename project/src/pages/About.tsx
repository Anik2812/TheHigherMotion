import React, { useEffect, useState } from 'react';
import { Award, Users, Calendar, Target } from 'lucide-react';

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h1 className="futuristic-heading text-5xl md:text-7xl gradient-text mb-8 leading-tight">
              CRAFTING
              <br />
              <span className="text-white">VISUAL</span>
              <br />
              STORIES
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              For over a decade, we've been pushing the boundaries of visual storytelling, 
              creating cinematic experiences that captivate audiences and elevate brands 
              through the power of exceptional post-production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="neon-button">
                VIEW OUR JOURNEY
              </button>
              <button className="neon-button bg-transparent border-white/30 text-white/70 hover:border-red-500 hover:text-white">
                MEET THE TEAM
              </button>
            </div>
          </div>

          <div className="relative">
            <div 
              className="relative overflow-hidden rounded-lg"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <img
                src="https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Studio workspace"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 border-2 border-red-500/20 hover:border-red-500/40 transition-colors duration-500" />
            </div>

            {/* Floating stats */}
            <div className="absolute -top-8 -left-8 futuristic-card p-6 w-32 text-center">
              <div className="futuristic-heading text-2xl gradient-text">10+</div>
              <div className="text-xs text-white/60 uppercase">Years</div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 futuristic-card p-6 w-32 text-center">
              <div className="futuristic-heading text-2xl gradient-text">500+</div>
              <div className="text-xs text-white/60 uppercase">Projects</div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          <div className="futuristic-card p-10">
            <div className="flex items-center mb-6">
              <Target size={32} className="text-red-500 mr-4" />
              <h2 className="futuristic-heading text-2xl">OUR MISSION</h2>
            </div>
            <p className="text-white/80 leading-relaxed text-lg">
              To transform raw footage into powerful visual narratives that connect with audiences 
              on an emotional level, using cutting-edge technology and artistic vision to bring 
              stories to life in ways that were previously unimaginable.
            </p>
          </div>

          <div className="futuristic-card p-10">
            <div className="flex items-center mb-6">
              <Award size={32} className="text-red-500 mr-4" />
              <h2 className="futuristic-heading text-2xl">OUR VISION</h2>
            </div>
            <p className="text-white/80 leading-relaxed text-lg">
              To be the premier destination for cinematic post-production, setting new standards 
              in visual storytelling and inspiring the next generation of filmmakers and content 
              creators to push creative boundaries.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="futuristic-heading text-4xl md:text-5xl gradient-text mb-6">
              THE VISIONARIES
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Meet the creative minds behind every frame, dedicated to excellence in visual storytelling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div 
                key={member.name} 
                className="futuristic-card overflow-hidden group cursor-none"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-red-500 text-sm font-medium mb-1">
                      {member.experience}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="futuristic-heading text-xl mb-2 group-hover:gradient-text transition-all duration-300">
                    {member.name}
                  </h3>
                  <div className="text-red-500 font-medium text-sm mb-2 uppercase tracking-wide">
                    {member.role}
                  </div>
                  <p className="text-white/70 text-sm">
                    {member.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="futuristic-heading text-4xl md:text-5xl gradient-text mb-6">
              OUR VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div 
                key={value.title} 
                className="text-center group cursor-none"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-red-500/30 rounded-lg mb-6 group-hover:border-red-500 group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300">
                  <value.icon size={32} className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="futuristic-heading text-lg mb-3 group-hover:gradient-text transition-all duration-300">
                  {value.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="futuristic-card p-12 max-w-4xl mx-auto">
            <h3 className="futuristic-heading text-3xl md:text-4xl gradient-text mb-6">
              LET'S CREATE TOGETHER
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to elevate your project with cinematic excellence? 
              Let's discuss how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="neon-button">
                START A PROJECT
              </button>
              <button className="neon-button bg-transparent border-white/30 text-white/70 hover:border-red-500 hover:text-white">
                SCHEDULE A CALL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;