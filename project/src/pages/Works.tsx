import React, { useState } from 'react';
import { Play, ExternalLink, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  videoUrl?: string;
  details: string;
}

const Works: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: "NEON DREAMS",
      category: "Commercial",
      description: "A futuristic brand campaign featuring cutting-edge VFX and color grading",
      image: "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=800",
      details: "Full post-production including VFX, color grading, and motion graphics for a luxury tech brand."
    },
    {
      id: 2,
      title: "URBAN PULSE",
      category: "Music Video",
      description: "High-energy music video with dynamic editing and visual effects",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      details: "Creative editing with beat-synced visuals and custom VFX sequences."
    },
    {
      id: 3,
      title: "MIDNIGHT STORY",
      category: "Short Film",
      description: "Atmospheric short film with moody lighting and cinematic grade",
      image: "https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=800",
      details: "Complete post-production workflow from rough cut to final color grade."
    },
    {
      id: 4,
      title: "TECH REVEAL",
      category: "Commercial",
      description: "Product launch video with sleek motion graphics and transitions",
      image: "https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=800",
      details: "Motion graphics design and seamless product integration with VFX."
    },
    {
      id: 5,
      title: "ELECTRIC NIGHTS",
      category: "Music Video",
      description: "Vibrant music video with neon aesthetics and rhythm-based editing",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
      details: "Advanced color grading with custom LUTs and synchronized visual effects."
    },
    {
      id: 6,
      title: "FUTURE FORWARD",
      category: "Documentary",
      description: "Tech documentary with clean cuts and professional grade",
      image: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=800",
      details: "Documentary-style editing with interview sequences and B-roll integration."
    }
  ];

  const categories = ['all', 'Commercial', 'Music Video', 'Short Film', 'Documentary'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="futuristic-heading text-5xl md:text-7xl gradient-text mb-6">
            FEATURED WORKS
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A showcase of cinematic excellence and visual storytelling mastery
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 font-medium text-sm uppercase tracking-wider cursor-none transition-all duration-300 border-2 ${
                filter === category
                  ? 'border-red-500 text-red-500 bg-red-500/10'
                  : 'border-white/20 text-white/70 hover:border-red-500/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="futuristic-card group cursor-none overflow-hidden"
              onClick={() => setSelectedProject(project)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-red-500/20 backdrop-blur-sm rounded-full p-4 border border-red-500/50">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-xs font-medium text-red-500 uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="futuristic-heading text-xl mb-3 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay active">
          <div className="modal-content max-w-4xl w-full mx-4">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-red-500 cursor-none z-10 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 lg:h-80 object-cover rounded"
                  />
                </div>
                
                <div>
                  <div className="text-red-500 text-sm font-medium uppercase tracking-wider mb-2">
                    {selectedProject.category}
                  </div>
                  <h2 className="futuristic-heading text-3xl gradient-text mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {selectedProject.details}
                  </p>
                  
                  <div className="flex gap-4">
                    <button className="neon-button flex items-center gap-2">
                      <Play size={16} />
                      Watch Project
                    </button>
                    <button className="neon-button bg-transparent border-white/30 text-white/70 hover:border-red-500 hover:text-white flex items-center gap-2">
                      <ExternalLink size={16} />
                      Live Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Works;