import React from 'react';
import { motion } from 'motion/react';
import { BookmarkPlus, BookmarkCheck, Heart, Star } from 'lucide-react';
import { Book } from '../../data/mockBooks';
import { useLibrary } from '../../context/LibraryContext';
import { cn } from './Button';

interface BookCardProps {
  book: Book;
  index?: number;
}

export function BookCard({ book, index = 0 }: BookCardProps) {
  const { isFavorite, isInReadingList, toggleFavorite, toggleReadingList } = useLibrary();
  
  const favorite = isFavorite(book.id);
  const reading = isInReadingList(book.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden border border-surface-variant transition-all hover:shadow-[0_2px_4px_rgba(30,27,75,0.03),0_8px_16px_rgba(30,27,75,0.05)] hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] w-full bg-surface-container-low p-4 flex items-center justify-center overflow-hidden">
        {/* Cover image styling with subtle inner border to simulate physical paperback */}
        <div className="relative w-full h-full rounded shadow-sm border border-black/5 overflow-hidden group-hover:shadow-md transition-shadow">
          <img 
            src={book.coverImage} 
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Spine reflection gradient */}
          <div className="absolute inset-y-0 left-0 w-[4%] bg-gradient-to-r from-white/30 to-transparent pointer-events-none" />
        </div>
        
        {/* Hover Action Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          <button 
            onClick={() => toggleFavorite(book.id)}
            className={cn(
              "p-2 rounded-full backdrop-blur-md transition-colors shadow-sm",
              favorite ? "bg-tertiary text-on-tertiary" : "bg-white/80 text-on-surface hover:bg-white"
            )}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={18} className={cn(favorite && "fill-current")} />
          </button>
          <button 
            onClick={() => toggleReadingList(book.id)}
            className={cn(
              "p-2 rounded-full backdrop-blur-md transition-colors shadow-sm",
              reading ? "bg-emerald-accent text-white" : "bg-white/80 text-on-surface hover:bg-white"
            )}
            aria-label={reading ? "Remove from reading list" : "Add to reading list"}
          >
            {reading ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
          </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-1 gap-2">
          <span className="text-xs font-semibold tracking-wider text-tertiary uppercase inline-block bg-tertiary/10 px-2 py-0.5 rounded-full">
            {book.category}
          </span>
          <div className="flex items-center text-secondary gap-1">
            <Star size={14} className="fill-current" />
            <span className="text-xs font-bold text-on-surface">{book.rating}</span>
          </div>
        </div>
        
        <h3 className="font-serif text-lg leading-tight font-semibold text-on-background mt-2 mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-on-surface-variant font-medium mb-3">
          {book.author}
        </p>
        
        <div className="mt-auto pt-4 border-t border-surface-variant/50">
          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
