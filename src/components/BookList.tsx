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
          <Loader2 className="animate-spin text-purple-400 mb-4" size={48} />
          <div className="absolute inset-0 blur-xl bg-purple-400/50 animate-pulse"></div>
        </div>
        <p className="text-purple-200">Loading enchanted books...</p>
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
        <BookX className="text-purple-300 mb-4" size={64} />
        <p className="text-white mb-2">No books found</p>
        <p className="text-purple-200">Try adjusting your search or add a new book</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
