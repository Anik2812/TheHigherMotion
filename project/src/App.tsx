import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Works from './pages/Works';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/globals.css';
// Lenis import removed

const pages = ['home', 'works', 'services', 'about', 'contact'] as const;
type PageType = typeof pages[number];

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -50, y: -50 });
  // isCursorHovering state removed

  // Lenis useEffect removed

  useEffect(() => {
    // Sunrise loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavExpanded(window.scrollY > 50);
    };

    // Reverted handleMouseMove to only update cursor position
    const handleMouseMove = (e: MouseEvent) => {
      setIsNavExpanded(true);
      setCursorPos({ x: e.clientX, y: e.clientY });
      // Hover check removed
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    // mouseout listener removed

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      // mouseout listener removal removed
    };
  }, []);

  const handlePageChange = (page: PageType) => {
    if (page === currentPage || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0); 
      // Lenis scroll update removed

      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'works': return <Works />;
      case 'services': return <Services />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  if (isLoading) {
    return (
      <div className="sunrise-loader">
        <div className="horizon"></div>
        <div className="sunrise-text">
          THE HIGHER<br />MOTION
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Reverted Cursor Follower - no hover class */}
      <div 
        className="cursor-follower" 
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
      />

      <div className="space-background"></div>
      
      <Navigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        isExpanded={isNavExpanded}
      />
      
      <main className={`page-container ${isTransitioning ? 'transitioning' : ''}`}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;