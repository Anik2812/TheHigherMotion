import React, { useState } from 'react';
import { Play, Clock, Users, Star, ChevronRight } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  description: string;
  image: string;
  highlights: string[];
}

const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const courses: Course[] = [
    {
      id: 1,
      title: "CINEMATIC COLOR GRADING MASTERY",
      category: "Color Grading",
      level: "Intermediate",
      duration: "8 weeks",
      students: 1247,
      rating: 4.9,
      price: 299,
      description: "Master the art of cinematic color grading with industry-standard techniques and tools.",
      image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["DaVinci Resolve Advanced", "LUT Creation", "HDR Workflows", "Color Psychology"]
    },
    {
      id: 2,
      title: "ADVANCED VIDEO EDITING TECHNIQUES",
      category: "Editing",
      level: "Advanced",
      duration: "12 weeks",
      students: 892,
      rating: 4.8,
      price: 399,
      description: "Take your editing skills to the next level with advanced techniques and workflows.",
      image: "https://images.pexels.com/photos/3945322/pexels-photo-3945322.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Multi-cam Editing", "Advanced Transitions", "Rhythm & Pacing", "Story Structure"]
    },
    {
      id: 3,
      title: "VFX FUNDAMENTALS & COMPOSITING",
      category: "VFX",
      level: "Beginner",
      duration: "10 weeks",
      students: 634,
      rating: 4.7,
      price: 349,
      description: "Learn the fundamentals of visual effects and compositing from industry professionals.",
      image: "https://images.pexels.com/photos/3945324/pexels-photo-3945324.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["After Effects Mastery", "Green Screen", "Motion Tracking", "3D Integration"]
    },
    {
      id: 4,
      title: "MOTION GRAPHICS & ANIMATION",
      category: "Motion Graphics",
      level: "Intermediate",
      duration: "6 weeks",
      students: 756,
      rating: 4.8,
      price: 249,
      description: "Create stunning motion graphics and animations for commercial and artistic projects.",
      image: "https://images.pexels.com/photos/3945327/pexels-photo-3945327.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Logo Animation", "Typography", "Particle Systems", "Cinema 4D Basics"]
    },
    {
      id: 5,
      title: "AUDIO POST-PRODUCTION ESSENTIALS",
      category: "Audio",
      level: "Beginner",
      duration: "4 weeks",
      students: 423,
      rating: 4.6,
      price: 199,
      description: "Master audio mixing, sound design, and music synchronization for video projects.",
      image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Pro Tools", "Sound Design", "Audio Mixing", "Music Licensing"]
    },
    {
      id: 6,
      title: "COMPLETE FILMMAKER'S POST WORKFLOW",
      category: "Complete Course",
      level: "All Levels",
      duration: "16 weeks",
      students: 1892,
      rating: 4.9,
      price: 599,
      description: "Complete post-production course covering all aspects from edit to final delivery.",
      image: "https://images.pexels.com/photos/3945325/pexels-photo-3945325.jpeg?auto=compress&cs=tinysrgb&w=800",
      highlights: ["Complete Workflow", "Industry Standards", "Client Relations", "Business Skills"]
    }
  ];

  const categories = ['all', 'Editing', 'Color Grading', 'VFX', 'Motion Graphics', 'Audio', 'Complete Course'];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="futuristic-heading text-5xl md:text-7xl gradient-text mb-6">
            MASTERCLASSES
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Learn from industry professionals and master the art of cinematic post-production
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 font-medium text-sm uppercase tracking-wider cursor-none transition-all duration-300 border-2 rounded-lg ${
                selectedCategory === category
                  ? 'border-red-500 text-red-500 bg-red-500/10 shadow-lg shadow-red-500/20'
                  : 'border-white/20 text-white/70 hover:border-red-500/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="space-y-8">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              className="futuristic-card overflow-hidden group cursor-none transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`flex flex-col transition-all duration-500 ${
                expandedCourse === course.id ? 'lg:flex-row' : 'lg:flex-row'
              }`}>
                {/* Image */}
                <div className={`flex-shrink-0 transition-all duration-500 ${
                  expandedCourse === course.id ? 'lg:w-96' : 'lg:w-80'
                }`}>
                  <div className={`relative overflow-hidden transition-all duration-500 ${
                    expandedCourse === course.id ? 'h-64 lg:h-full' : 'h-48 lg:h-64'
                  }`}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-red-500/20 backdrop-blur-sm rounded-full p-4 border border-red-500/50">
                        <Play size={24} className="text-white ml-1" />
                      </div>
                    </div>

                    {/* Level badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-xs font-medium text-red-500 uppercase tracking-wider rounded">
                      {course.level}
                    </div>
                    
                    {/* Price badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/20 backdrop-blur-sm text-sm font-bold text-white rounded border border-red-500/50">
                      ${course.price}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 lg:p-10">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-red-500 text-sm font-medium uppercase tracking-wider mb-2">
                        {course.category}
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-red-500" />
                        <span className="text-white font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="futuristic-heading text-xl lg:text-2xl group-hover:gradient-text transition-all duration-300 mb-4 leading-tight">
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-white/80 mb-6 leading-relaxed text-base lg:text-lg">
                    {course.description}
                  </p>

                  {/* Course stats */}
                  <div className="grid grid-cols-2 lg:flex lg:items-center gap-4 lg:gap-8 mb-8 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock size={16} className="text-red-500" />
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Users size={16} className="text-red-500" />
                      <span className="font-medium">{course.students} students</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  {expandedCourse === course.id && (
                    <div className="mb-8 p-6 bg-black/30 rounded-lg border border-red-500/20">
                      <h4 className="futuristic-heading text-lg text-red-500 mb-4">COURSE HIGHLIGHTS</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center text-sm text-white/80">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0" />
                            <span className="font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="neon-button flex-1 py-4 font-semibold">
                      ENROLL NOW
                    </button>
                    <button 
                      onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                      className="neon-button bg-transparent border-white/30 text-white/70 hover:border-red-500 hover:text-white py-4 px-8"
                    >
                      {expandedCourse === course.id ? 'LESS INFO' : 'MORE INFO'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32">
          <div className="futuristic-card p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "5000+", label: "Students Taught" },
            { number: "50+", label: "Hours of Content" },
            { number: "15+", label: "Industry Mentors" },
            { number: "4.8", label: "Average Rating" }
          ].map((stat, index) => (
            <div key={stat.label} className="group">
              <div className="futuristic-heading text-4xl lg:text-5xl gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
                <div className="text-white/70 uppercase tracking-wider text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;