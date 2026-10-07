import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-surface-variant mt-20">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <BookOpen size={20} />
            <span className="font-serif font-semibold text-lg">Lumina Library</span>
          </Link>
          <p className="text-sm text-on-surface-variant text-center md:text-left">
            Your personal digital reading sanctuary.
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/explore" className="hover:text-primary transition-colors">Explore</Link>
          <Link to="/library" className="hover:text-primary transition-colors">My Library</Link>
        </div>
      </div>
    </footer>
  );
}
