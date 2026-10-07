import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/ui/BookCard';
import { Button } from '../components/ui/Button';

export function Home() {
  const { books } = useLibrary();
  
  // Just show first 4 as featured
  const featuredBooks = books.slice(0, 4);

  return (
    <div className="flex-grow flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-20 lg:py-32 overflow-hidden flex flex-col items-center text-center bg-surface-container-lowest border-b border-surface-variant">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto z-10 flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-sm font-semibold tracking-wide mb-6">
            <Sparkles size={14} />
            Discover Your Next Read
          </span>
          <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-6">
            A sanctuary for stories, <br className="hidden md:block"/> 
            curated for your mind.
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl">
            Explore a world of carefully selected literature. From timeless classics to modern masterpieces, find the books that speak to your soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/explore">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Explore Collection
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/library">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View My Library
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-[30rem] h-[30rem] bg-tertiary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      </section>

      {/* Featured Section */}
      <section className="px-4 md:px-8 py-20 max-w-[1320px] mx-auto w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-headline-md text-primary mb-2">Curator's Picks</h2>
            <p className="text-on-surface-variant text-body-md">Hand-selected reads for the discerning mind.</p>
          </div>
          <Link to="/explore" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-tertiary hover:text-tertiary-container transition-colors">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
        
        <div className="mt-8 sm:hidden flex justify-center">
          <Link to="/explore">
            <Button variant="secondary" className="w-full">
              View all books
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
