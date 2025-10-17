import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
// === Import motion ===
import { motion } from 'framer-motion';
import { Play, ExternalLink, X, Eye } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  duration: string;
  views: string;
  uploadDate: string;
  details: string;
}

const modalRoot = document.getElementById('modal-root')!;

const Works: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const modalContentRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "NEON DREAMS - Luxury Tech Brand Campaign",
      category: "Commercial",
      description: "A futuristic brand campaign featuring cutting-edge VFX and color grading",
      image: "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "2:45",
      views: "1.2M",
      uploadDate: "2 weeks ago",
      details: "Full post-production including VFX, color grading, and motion graphics for a luxury tech brand. This project showcased our ability to blend futuristic aesthetics with commercial appeal."
    },
    {
      id: 2,
      title: "URBAN PULSE - High Energy Music Video",
      category: "Music Video",
      description: "High-energy music video with dynamic editing and visual effects",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "3:22",
      views: "850K",
      uploadDate: "1 month ago",
      details: "Creative editing with beat-synced visuals and custom VFX sequences. The project required precise timing and innovative visual storytelling techniques."
    },
    // ... other projects ...
     {
      id: 3,
      title: "MIDNIGHT STORY - Atmospheric Short Film",
      category: "Short Film",
      description: "Atmospheric short film with moody lighting and cinematic grade",
      image: "https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "12:30",
      views: "2.1M",
      uploadDate: "3 weeks ago",
      details: "Complete post-production workflow from rough cut to final color grade. This narrative piece demonstrated our storytelling capabilities and technical expertise."
    },
    {
      id: 4,
      title: "TECH REVEAL - Product Launch Spectacular",
      category: "Commercial",
      description: "Product launch video with sleek motion graphics and transitions",
      image: "https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "1:58",
      views: "3.4M",
      uploadDate: "1 week ago",
      details: "Motion graphics design and seamless product integration with VFX. The project required precise timing and innovative visual effects to showcase the product features."
    },
    {
      id: 5,
      title: "ELECTRIC NIGHTS - Neon Aesthetic Music Video",
      category: "Music Video",
      description: "Vibrant music video with neon aesthetics and rhythm-based editing",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "4:15",
      views: "1.8M",
      uploadDate: "2 months ago",
      details: "Advanced color grading with custom LUTs and synchronized visual effects. The project pushed creative boundaries with innovative lighting and post-production techniques."
    },
    {
      id: 6,
      title: "FUTURE FORWARD - Tech Documentary",
      category: "Documentary",
      description: "Tech documentary with clean cuts and professional grade",
      image: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "28:45",
      views: "950K",
      uploadDate: "1 month ago",
      details: "Documentary-style editing with interview sequences and B-roll integration. This project showcased our ability to handle long-form content with professional standards."
    },
    {
      id: 7,
      title: "COSMIC JOURNEY - Space Exploration Series",
      category: "Documentary",
      description: "Epic space documentary with stunning visuals and narration",
      image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "45:20",
      views: "4.2M",
      uploadDate: "3 months ago",
      details: "Complex post-production involving space footage, CGI integration, and immersive sound design for an educational documentary series."
    },
    {
      id: 8,
      title: "BRAND EVOLUTION - Corporate Transformation",
      category: "Commercial",
      description: "Corporate rebrand video showcasing company transformation",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "3:45",
      views: "1.5M",
      uploadDate: "2 weeks ago",
      details: "Strategic storytelling combined with sleek visuals to communicate brand evolution and corporate values through cinematic techniques."
    }
  ];

  const categories = ['all', 'Commercial', 'Music Video', 'Short Film', 'Documentary'];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedProject(null);
    }
  };

  useEffect(() => {
    if (selectedProject && modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  // === Animation Variants for Video Cards ===
  const videoCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.05, // Faster stagger for grid
        ease: [0, 0, 0.2, 1] as [number, number, number, number]
      }
    })
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
        >
          <h1 className="futuristic-heading text-4xl sm:text-5xl md:text-7xl gradient-text mb-6 shining-text">
            FEATURED WORKS
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
            A showcase of cinematic excellence and visual storytelling mastery
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }} // Slight delay after header
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-medium text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 border-2 rounded-full ${
                filter === category
                  ? 'border-red-500 text-red-500 bg-red-500/10'
                  : 'border-white/20 text-white/70 hover:border-red-500/50 hover:text-white'
              }`}
              data-cursor-hover="true"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* YouTube-style Video Grid */}
        <div className="video-grid">
          {filteredProjects.map((project, index) => (
            // Apply animation to each card
            <motion.div
              key={project.id}
              className="video-card" // Removed animate-fade-in-up
              onClick={() => setSelectedProject(project)}
              variants={videoCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Trigger sooner for grid items
              custom={index} // Pass index for stagger
              data-cursor-hover="true"
            >
              <div className="video-thumbnail">
                <img
                  src={project.image}
                  alt={project.title}
                />
                <div className="video-duration">{project.duration}</div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 bg-black/50">
                  <div className="bg-red-500/20 backdrop-blur-sm rounded-full p-4 border border-red-500/50">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-xs font-medium text-red-500 uppercase tracking-wider rounded">
                  {project.category}
                </div>
              </div>

              <div className="video-info">
                <h3 className="video-title">
                  {project.title}
                </h3>
                <div className="video-meta">
                  <div className="video-views">
                    <Eye size={14} className="inline mr-1" />
                    {project.views} views
                  </div>
                  <span>{project.uploadDate}</span>
                </div>
                <p className="text-white/60 text-sm mt-2 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && createPortal(
        <div 
          className="modal-overlay active"
          onClick={handleOverlayClick}
        >
          <div 
            ref={modalContentRef}
            className="modal-content max-w-4xl w-full mx-4"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-red-500 cursor-pointer z-10 transition-colors"
              data-cursor-hover="true"
            >
              <X size={24} />
            </button>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg"
                  />
                </div>
                
                <div>
                  <div className="text-red-500 text-sm font-medium uppercase tracking-wider mb-2">
                    {selectedProject.category}
                  </div>
                  <h2 className="futuristic-heading text-2xl sm:text-3xl gradient-text mb-4">
                    {selectedProject.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/70">
                    <span>{selectedProject.duration}</span>
                    <span>•</span>
                    <span>{selectedProject.views} views</span>
                    <span>•</span>
                    <span>{selectedProject.uploadDate}</span>
                  </div>
                  
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {selectedProject.details}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="neon-button flex items-center justify-center gap-2" data-cursor-hover="true">
                      <Play size={16} />
                      Watch Project
                    </button>
                    <button className="neon-button bg-transparent border-white/30 text-white/70 hover:border-red-500 hover:text-white flex items-center justify-center gap-2" data-cursor-hover="true">
                      <ExternalLink size={16} />
                      Live Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        modalRoot
      )}
    </div>
  );
};

export default Works;