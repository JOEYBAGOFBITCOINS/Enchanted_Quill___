import { Book } from '../types/book';
import { Edit2, Trash2, DollarSign, Hash, Package } from 'lucide-react';
import { useCardGlow } from './hooks/useCardGlow';

interface BookCardProps {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const isLowStock = book.quantity < 5;
  const cardRef = useCardGlow();

  return (
    <div ref={cardRef} className="glow-card group">
      <span className="glow"></span>
      
      <div className="inner">
        <div className="h-1 -mx-6 -mt-6 mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
              {book.title}
            </h3>
            <p className="text-gray-600 mb-1">
              {book.author}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Hash size={16} className="text-purple-500" />
            <span className="text-gray-600">ISBN:</span>
            <span className="font-mono">{book.isbn}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <DollarSign size={16} className="text-green-500" />
            <span className="text-gray-600">Price:</span>
            <span>${book.price.toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Package size={16} className={isLowStock ? 'text-red-500' : 'text-blue-500'} />
            <span className="text-gray-600">Stock:</span>
            <span className={`${isLowStock ? 'text-red-600' : 'text-gray-700'}`}>
              {book.quantity} {isLowStock && '⚠️'}
            </span>
          </div>
        </div>

        {isLowStock && (
          <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">Low Stock Alert!</p>
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
        
      </div>
    </div>
  );
}
