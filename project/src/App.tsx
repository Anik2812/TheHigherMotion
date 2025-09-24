import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Works from './pages/Works';
import Services from './pages/Services';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import CursorGlow from './components/CursorGlow';
import './styles/globals.css';

const pages = ['home', 'works', 'services', 'courses', 'about', 'contact'] as const;
type PageType = typeof pages[number];

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  const handlePageChange = (page: PageType) => {
    if (page === currentPage) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
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
      case 'courses': return <Courses />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  if (isLoading) {
    return (
      <div className="cinematic-loader">
        <div className="loader-text">
          CINEMA<span className="text-white">EDIT</span>
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      <CursorGlow />
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      
      <main className={`page-container ${isTransitioning ? 'transitioning' : ''}`}>
        {renderPage()}
      </main>
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-black via-red-950/20 to-black -z-10" />
    </div>
  );
}

export default App;