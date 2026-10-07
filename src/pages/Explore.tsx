import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/ui/BookCard';

export function Explore() {
  const { books } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'title' | 'rating' | 'newest'>('title');

  const categories = useMemo(() => {
    const cats = new Set(books.map(b => b.category));
    return Array.from(cats);
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = books;

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(b => b.category === selectedCategory);
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Newest logic would need a date field, fallback to original order
    });

    return result;
  }, [books, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="flex-grow w-full max-w-[1320px] mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar / Filters (Desktop) */}
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-8">
        <div>
          <h1 className="font-serif text-headline-md text-primary mb-6">Explore</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search title, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low border border-surface-variant rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/70"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-on-surface-variant">Categories</h3>
            <SlidersHorizontal size={16} className="text-on-surface-variant" />
          </div>
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex-shrink-0 text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === null 
                  ? 'bg-primary text-on-primary' 
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-primary text-on-primary' 
                    : 'text-on-surface hover:bg-surface-container'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-on-surface-variant mb-4">Sort By</h3>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full appearance-none bg-surface-container-low border border-surface-variant rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            >
              <option value="title">Title (A-Z)</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
          </div>
        </div>
      </aside>

      {/* Main Content Grid */}
      <div className="flex-grow">
        <div className="mb-6 flex justify-between items-end">
          <p className="text-sm font-medium text-on-surface-variant">
            Showing <span className="text-primary font-bold">{filteredBooks.length}</span> result{filteredBooks.length !== 1 ? 's' : ''}
          </p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, i) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <BookCard book={book} index={i} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant mb-4">
                  <Search size={24} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">No books found</h3>
                <p className="text-on-surface-variant">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
