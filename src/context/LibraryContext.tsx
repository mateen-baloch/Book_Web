import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, initialBooks } from '../data/mockBooks';

interface LibraryContextType {
  books: Book[];
  favorites: string[];
  readingList: string[];
  toggleFavorite: (bookId: string) => void;
  toggleReadingList: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  isInReadingList: (bookId: string) => boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [books] = useState<Book[]>(initialBooks);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [readingList, setReadingList] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('library_favorites');
    const savedReadingList = localStorage.getItem('library_readingList');

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites');
      }
    }
    
    if (savedReadingList) {
      try {
        setReadingList(JSON.parse(savedReadingList));
      } catch (e) {
        console.error('Failed to parse reading list');
      }
    }
    
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('library_favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('library_readingList', JSON.stringify(readingList));
    }
  }, [readingList, isLoaded]);

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const toggleReadingList = (bookId: string) => {
    setReadingList(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const isFavorite = (bookId: string) => favorites.includes(bookId);
  const isInReadingList = (bookId: string) => readingList.includes(bookId);

  return (
    <LibraryContext.Provider 
      value={{ 
        books, 
        favorites, 
        readingList, 
        toggleFavorite, 
        toggleReadingList, 
        isFavorite, 
        isInReadingList 
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
