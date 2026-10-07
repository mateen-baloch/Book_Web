import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Search, Menu, X, Library, Compass } from 'lucide-react';
import { cn } from '../ui/Button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: BookOpen },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'My Library', path: '/library', icon: Library },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-surface-bright/90 backdrop-blur-md border-surface-variant shadow-[0_4px_24px_rgba(30,27,75,0.04)]" 
          : "bg-surface-bright border-transparent"
      )}
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-primary group">
          <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center transition-transform group-hover:scale-105">
            <BookOpen size={18} />
          </div>
          <span className="font-serif font-semibold text-xl tracking-tight">Lumina</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-secondary",
                location.pathname === link.path 
                  ? "text-primary" 
                  : "text-on-surface-variant"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/explore"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-variant text-sm text-on-surface-variant hover:bg-surface-container transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
          >
            <Search size={14} />
            <span>Search books...</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden p-2 text-on-surface"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-surface-bright border-b border-surface-variant shadow-lg p-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors",
                  location.pathname === link.path 
                    ? "bg-primary/5 text-primary" 
                    : "text-on-surface hover:bg-surface-container-low"
                )}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
