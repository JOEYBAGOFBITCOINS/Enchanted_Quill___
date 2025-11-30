import { Book } from '../types/book';
import { BookCard } from './BookCard';
import { Loader2, BookX } from 'lucide-react';

interface BookListProps {
  books: Book[];
  loading: boolean;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export function BookList({ books, loading, onEdit, onDelete }: BookListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <Loader2 className="animate-spin text-[#D4A574] mb-4" size={48} />
          <div className="absolute inset-0 blur-xl bg-[#D4A574]/50 animate-pulse"></div>
        </div>
        <p className="text-[#F5F5DC]" style={{ fontFamily: 'serif' }}>Loading your collection...</p>
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-[#D4A574] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#8B6914] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[#D4A574] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-[#1a1612] via-[#2a1f1a] to-[#1a1612] border border-[#D4A574]/20 rounded-lg shadow-xl">
        <BookX className="text-[#D4A574] mb-4" size={64} />
        <p className="text-[#F5F5DC] mb-2" style={{ fontFamily: 'serif', fontSize: '1.25rem' }}>No books found</p>
        <p className="text-[#D4A574]/70" style={{ fontFamily: 'serif' }}>Try adjusting your search or add a new book</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={() => onEdit(book)}
          onDelete={() => onDelete(book.id)}
        />
      ))}
    </div>
  );
}
