import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, BookmarkCheck, BookOpen } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/ui/BookCard';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function MyLibrary() {
  const { books, favorites, readingList } = useLibrary();
  const [activeTab, setActiveTab] = useState<'reading' | 'favorites'>('reading');

  const favoriteBooks = books.filter(b => favorites.includes(b.id));
  const readingListBooks = books.filter(b => readingList.includes(b.id));

  const currentBooks = activeTab === 'reading' ? readingListBooks : favoriteBooks;

  return (
    <div className="flex-grow w-full max-w-[1320px] mx-auto px-4 md:px-8 py-8 md:py-12">
      
      <div className="mb-10">
        <h1 className="font-serif text-headline-lg text-primary mb-4 flex items-center gap-3">
          <BookOpen className="text-secondary" />
          My Sanctuary
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">
          Your personal collection of curated reads and beloved favorites.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-variant mb-8">
        <button
          onClick={() => setActiveTab('reading')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors relative ${
            activeTab === 'reading' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <BookmarkCheck size={18} />
          Reading List ({readingList.length})
          {activeTab === 'reading' && (
            <motion.div 
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-colors relative ${
            activeTab === 'favorites' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <Heart size={18} />
          Favorites ({favorites.length})
          {activeTab === 'favorites' && (
            <motion.div 
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
          )}
        </button>
      </div>

      {/* Content Grid */}
      {currentBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {currentBooks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 flex flex-col items-center justify-center text-center bg-surface-container-low rounded-xl border border-surface-variant border-dashed"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-tertiary mb-4 shadow-sm">
            {activeTab === 'reading' ? <BookmarkCheck size={28} /> : <Heart size={28} />}
          </div>
          <h3 className="font-serif text-xl font-semibold mb-2">
            Your {activeTab === 'reading' ? 'reading list' : 'favorites'} is empty
          </h3>
          <p className="text-on-surface-variant mb-6 max-w-md">
            {activeTab === 'reading' 
              ? "Keep track of the books you want to read. Start exploring to build your list."
              : "Save the books that speak to you. They'll be waiting here when you return."}
          </p>
          <Link to="/explore">
            <Button>
              Explore Books
            </Button>
          </Link>
        </motion.div>
      )}
      
    </div>
  );
}
