import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        budget: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="futuristic-heading text-5xl md:text-7xl gradient-text mb-6">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="futuristic-card p-8">
            <h2 className="futuristic-heading text-2xl mb-8 gradient-text">
              START YOUR PROJECT
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-2 border-white/20 rounded-lg px-4 py-3 text-white placeholder-transparent focus:border-red-500 focus:outline-none transition-all duration-300 cursor-none"
                    placeholder="Your Name"
                  />
                  <label className={`absolute left-4 transition-all duration-300 cursor-none pointer-events-none ${
                    focusedField === 'name' || formData.name
                      ? '-top-2 text-xs text-red-500 bg-black px-2'
                      : 'top-3 text-white/60'
                  }`}>
                    Your Name *
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-2 border-white/20 rounded-lg px-4 py-3 text-white placeholder-transparent focus:border-red-500 focus:outline-none transition-all duration-300 cursor-none"
                    placeholder="Email Address"
                  />
                  <label className={`absolute left-4 transition-all duration-300 cursor-none pointer-events-none ${
                    focusedField === 'email' || formData.email
                      ? '-top-2 text-xs text-red-500 bg-black px-2'
                      : 'top-3 text-white/60'
                  }`}>
                    Email Address *
                  </label>
                </div>
              </div>

              {/* Company & Project Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-2 border-white/20 rounded-lg px-4 py-3 text-white placeholder-transparent focus:border-red-500 focus:outline-none transition-all duration-300 cursor-none"
                    placeholder="Company/Organization"
                  />
                  <label className={`absolute left-4 transition-all duration-300 cursor-none pointer-events-none ${
                    focusedField === 'company' || formData.company
                      ? '-top-2 text-xs text-red-500 bg-black px-2'
                      : 'top-3 text-white/60'
                  }`}>
                    Company/Organization
                  </label>
                </div>

                <div className="relative">
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('project')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-black border-2 border-white/20 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300 cursor-none"
                  >
                    <option value="">Project Type</option>
                    <option value="commercial">Commercial</option>
                    <option value="music-video">Music Video</option>
                    <option value="short-film">Short Film</option>
                    <option value="documentary">Documentary</option>
                    <option value="corporate">Corporate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="relative">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('budget')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-black border-2 border-white/20 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300 cursor-none"
                >
                  <option value="">Project Budget Range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-plus">$50,000+</option>
                </select>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  required
                  className="w-full bg-transparent border-2 border-white/20 rounded-lg px-4 py-3 text-white placeholder-transparent focus:border-red-500 focus:outline-none transition-all duration-300 resize-none cursor-none"
                  placeholder="Project Details"
                />
                <label className={`absolute left-4 transition-all duration-300 cursor-none pointer-events-none ${
                  focusedField === 'message' || formData.message
                    ? '-top-2 text-xs text-red-500 bg-black px-2'
                    : 'top-3 text-white/60'
                }`}>
                  Tell us about your project *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`neon-button w-full flex items-center justify-center gap-3 text-lg py-4 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="futuristic-card p-8">
              <h3 className="futuristic-heading text-xl mb-6 gradient-text">
                CONTACT INFO
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 border-2 border-red-500/30 rounded-lg flex items-center justify-center mr-4 group-hover:border-red-500 group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300">
                    <Mail size={20} className="text-red-500" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Email</div>
                    <div className="text-white">hello@cinemaedit.com</div>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 border-2 border-red-500/30 rounded-lg flex items-center justify-center mr-4 group-hover:border-red-500 group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300">
                    <Phone size={20} className="text-red-500" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Phone</div>
                    <div className="text-white">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 border-2 border-red-500/30 rounded-lg flex items-center justify-center mr-4 group-hover:border-red-500 group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300">
                    <MapPin size={20} className="text-red-500" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Location</div>
                    <div className="text-white">Los Angeles, CA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="futuristic-card p-8">
              <h3 className="futuristic-heading text-xl mb-6 gradient-text">
                RESPONSE TIME
              </h3>
              <div className="flex items-center mb-4">
                <MessageCircle size={24} className="text-red-500 mr-3" />
                <span className="text-white">We typically respond within</span>
              </div>
              <div className="futuristic-heading text-3xl text-red-500 mb-2">24 HOURS</div>
              <p className="text-white/70 text-sm">
                For urgent projects, call us directly for immediate assistance.
              </p>
            </div>

            {/* Office Hours */}
            <div className="futuristic-card p-8">
              <h3 className="futuristic-heading text-xl mb-6 gradient-text">
                OFFICE HOURS
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 7:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Sunday</span>
                  <span className="text-white">By Appointment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;