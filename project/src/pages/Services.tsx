import React from 'react';
import { Film, Palette, Zap, Camera, Music, Monitor } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Film,
      title: "VIDEO EDITING",
      description: "Professional video editing with cinematic storytelling techniques and seamless transitions.",
      features: ["Multi-camera editing", "Advanced transitions", "Audio synchronization", "Pacing optimization"]
    },
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

  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="futuristic-heading text-5xl md:text-7xl gradient-text mb-6">
            SERVICES
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Comprehensive post-production services that transform raw footage into cinematic masterpieces
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="futuristic-card p-8 group cursor-none relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-red-500/30 rounded-lg group-hover:border-red-500 group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300">
                  <service.icon size={32} className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              {/* Content */}
              <h3 className="futuristic-heading text-xl mb-4 group-hover:gradient-text transition-all duration-300">
                {service.title}
              </h3>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-white/60 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-3 group-hover:shadow-sm group-hover:shadow-red-500 transition-all duration-300" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/20 rounded-lg pointer-events-none transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="futuristic-heading text-4xl md:text-5xl gradient-text mb-6">
              OUR PROCESS
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              A streamlined workflow that ensures your project receives the attention and quality it deserves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "CONSULTATION", description: "Understanding your vision and project requirements" },
              { step: "02", title: "PLANNING", description: "Developing the creative and technical approach" },
              { step: "03", title: "PRODUCTION", description: "Executing the edit with precision and artistry" },
              { step: "04", title: "DELIVERY", description: "Final review and multi-format delivery" }
            ].map((phase, index) => (
              <div key={phase.step} className="text-center group">
                <div className="futuristic-heading text-6xl gradient-text mb-4 group-hover:scale-110 transition-transform duration-300">
                  {phase.step}
                </div>
                <h3 className="futuristic-heading text-lg mb-3 group-hover:text-red-500 transition-colors">
                  {phase.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <div className="futuristic-card p-12 max-w-4xl mx-auto">
            <h3 className="futuristic-heading text-3xl md:text-4xl gradient-text mb-6">
              READY TO START YOUR PROJECT?
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss your vision and create something extraordinary together. 
              Every great story deserves exceptional post-production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="neon-button">
                GET QUOTE
              </button>
              <button className="neon-button bg-transparent border-white/30 text-white/70 hover:border-red-500 hover:text-white">
                VIEW PORTFOLIO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;