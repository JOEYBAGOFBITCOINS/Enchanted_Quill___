import { Book } from '../types/book';
import { Edit2, Trash2, DollarSign, Hash, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface BookCardProps {
  book: Book;
  onEdit: () => void;
  onDelete: () => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const isLowStock = book.quantity < 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-[#1a1612] via-[#2a1f1a] to-[#1a1612] rounded-lg overflow-hidden border border-[#D4A574]/20 shadow-2xl">
        {/* Gold accent border glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574]/0 via-[#D4A574]/5 to-[#D4A574]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-[#8B6914] via-[#D4A574] to-[#8B6914]"></div>
        
        {/* Book Image */}
        {book.imageUrl && (
          <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
            <ImageWithFallback
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612] via-transparent to-transparent opacity-60" />
            
            {/* Low Stock Badge */}
            {isLowStock && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="absolute top-4 right-4 bg-gradient-to-br from-red-600 to-red-800 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg"
              >
                <Package className="w-4 h-4 text-white" />
                <span className="text-xs text-white" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                  Low Stock
                </span>
              </motion.div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title & Author */}
          <div>
            <h3 
              className="text-[#F5F5DC] mb-1 line-clamp-2 group-hover:text-[#D4A574] transition-colors duration-300"
              style={{ 
                fontFamily: 'serif',
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: '1.3'
              }}
            >
              {book.title}
            </h3>
            <p className="text-[#D4A574]/70" style={{ fontFamily: 'serif', fontSize: '0.875rem' }}>
              {book.author}
            </p>
          </div>

          {/* Book Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hash size={14} className="text-[#D4A574]" />
              <span className="text-[#D4A574]/60 text-xs" style={{ fontFamily: 'serif' }}>ISBN:</span>
              <span className="text-[#F5F5DC] text-xs font-mono">{book.isbn}</span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign size={14} className="text-[#D4A574]" />
              <span className="text-[#D4A574]/60 text-xs" style={{ fontFamily: 'serif' }}>Price:</span>
              <span className="text-[#F5F5DC] text-xs" style={{ fontFamily: 'serif' }}>${book.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Package size={14} className={isLowStock ? 'text-red-500' : 'text-[#D4A574]'} />
              <span className="text-[#D4A574]/60 text-xs" style={{ fontFamily: 'serif' }}>Stock:</span>
              <span className={`text-xs ${isLowStock ? 'text-red-400' : 'text-[#F5F5DC]'}`} style={{ fontFamily: 'serif' }}>
                {book.quantity} {isLowStock && '⚠️'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-[#D4A574]/10">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B6914] to-[#D4A574] hover:from-[#D4A574] hover:to-[#F4E4C1] text-black rounded transition-all duration-300"
            >
              <Edit2 size={14} />
              <span style={{ fontFamily: 'serif', fontWeight: 600, fontSize: '0.875rem' }}>Edit</span>
            </button>
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black/60 hover:bg-red-900/60 border border-[#D4A574]/30 hover:border-red-500/60 text-[#D4A574] hover:text-red-300 rounded transition-all duration-300"
            >
              <Trash2 size={14} />
              <span style={{ fontFamily: 'serif', fontWeight: 600, fontSize: '0.875rem' }}>Delete</span>
            </button>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4A574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4A574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
