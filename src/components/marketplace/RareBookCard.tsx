import { motion } from 'motion/react';
import { Shield, ChevronRight } from 'lucide-react';
import { RareBook } from '../../types/rare-book';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface RareBookCardProps {
  book: RareBook;
  onViewDetails: (book: RareBook) => void;
}

export function RareBookCard({ book, onViewDetails }: RareBookCardProps) {
  const formatPrice = (price: number) => {
    if (price === 0) {
      return 'Private Consultation Required';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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
        
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
          <ImageWithFallback
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1612] via-transparent to-transparent opacity-60" />
          
          {/* Verification Badge */}
          {book.verified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute top-4 right-4 bg-gradient-to-br from-[#D4A574] to-[#8B6914] px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg"
            >
              <Shield className="w-4 h-4 text-black" />
              <span className="text-xs text-black" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                Verified
              </span>
            </motion.div>
          )}

          {/* Condition Grade */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded border border-[#D4A574]/30">
            <span className="text-xs text-[#D4A574]" style={{ fontFamily: 'serif' }}>
              {book.conditionGrade}
            </span>
          </div>
        </div>

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
            <p className="text-[#D4A574]/70 text-sm" style={{ fontFamily: 'serif' }}>
              {book.author} • {book.year}
            </p>
          </div>

          {/* Provenance Indicator */}
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-[#D4A574] mt-2 flex-shrink-0" />
            <p className="text-xs text-[#D4A574]/60 line-clamp-2" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
              {book.provenance}
            </p>
          </div>

          {/* Price */}
          <div className="pt-4 border-t border-[#D4A574]/10">
            <div className="flex items-baseline gap-2 mb-4">
              <span 
                className="text-[#D4A574]"
                style={{ 
                  fontFamily: 'serif',
                  fontSize: book.price === 0 ? '1.1rem' : '1.75rem',
                  fontWeight: 700
                }}
              >
                {formatPrice(book.price)}
              </span>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => onViewDetails(book)}
              className="w-full bg-gradient-to-r from-[#8B6914] to-[#D4A574] hover:from-[#D4A574] hover:to-[#F4E4C1] text-black px-6 py-3 rounded transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg"
            >
              <span style={{ fontFamily: 'serif', fontWeight: 600 }}>
                View Details
              </span>
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
