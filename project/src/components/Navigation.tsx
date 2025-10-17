import React from 'react';
import { Home, Briefcase, Settings, User, Mail } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: 'home' | 'works' | 'services' | 'about' | 'contact') => void;
  isExpanded: boolean;
}
const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange, isExpanded }) => {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'works' as const, label: 'Works', icon: Briefcase },
    { id: 'services' as const, label: 'Services', icon: Settings },
    { id: 'about' as const, label: 'About', icon: User },
    { id: 'contact' as const, label: 'Contact', icon: Mail }
  ];

  return (
    <nav className={`dynamic-island ${isExpanded ? 'expanded' : ''}`}>
      <div className="nav-items">
        {/* Logo */}
        <div 
          className="futuristic-heading text-lg gradient-text cursor-pointer font-bold"
          onClick={() => onPageChange('home')}
        >
          THM
        </div>

        {/* Navigation Items */}
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            >
              <span className="nav-text font-inter font-semibold uppercase tracking-wider">
                {item.label}
              </span>
              <IconComponent size={16} className="nav-icon" />
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;