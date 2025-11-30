import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { RareBook } from '../../types/rare-book';

interface RareBookLightboxProps {
  book: RareBook;
  onClose: () => void;
}

export function RareBookLightbox({ book, onClose }: RareBookLightboxProps) {
  console.log('🎭 RareBookLightbox RENDERING for:', book.title);
  
  const formatPrice = (price: number) => {
    if (price === 0) {
      return 'Price Upon Request';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatYear = (year: number) => {
    if (year < 0) {
      return `${Math.abs(year)} BCE`;
    }
    if (year < 1000) {
      return `c. ${year}`;
    }
    return year.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 99999 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-gradient-to-br from-[#1a1a1a]/95 via-[#2a2a2a]/95 to-[#1a1a1a]/95 backdrop-blur-xl border border-[#D4A574]/30 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#D4A574]/40 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#D4A574]/40 rounded-br-2xl" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-[#D4A574] hover:text-[#F4E4C1] transition-colors bg-black/40 backdrop-blur-sm rounded-full p-2 border border-[#D4A574]/20 hover:border-[#D4A574]/40"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="relative p-12 space-y-8">
          {/* Title */}
          <div className="text-center border-b border-[#D4A574]/20 pb-6">
            <h2 
              className="text-[#F5F5DC] mb-2"
              style={{ 
                fontFamily: 'serif',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 600,
                lineHeight: '1.2'
              }}
            >
              {book.title}
            </h2>
            <p className="text-[#D4A574] text-xl" style={{ fontFamily: 'serif' }}>
              {book.author}
            </p>
          </div>

          {/* Details Grid */}
          <div className="space-y-4">
            <DetailRow label="Year" value={formatYear(book.year)} />
            <DetailRow 
              label="Edition" 
              value={book.id === '1' ? 'Original Manuscript' : 'First Edition'} 
            />
            <DetailRow label="Condition" value={book.conditionGrade} />
            <DetailRow 
              label="Provenance" 
              value={book.provenance.split(',')[0]} 
            />
          </div>

          {/* Highlights */}
          <div>
            <h3 
              className="text-[#D4A574] mb-3"
              style={{ fontFamily: 'serif', fontSize: '1.1rem', fontWeight: 600 }}
            >
              Highlights:
            </h3>
            <div className="space-y-2 text-[#C0C0C0]" style={{ fontFamily: 'serif' }}>
              {book.description.split('.').filter(s => s.trim()).slice(0, 3).map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-[#D4A574] flex-shrink-0 mt-1">•</span>
                  <span>{highlight.trim()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="text-center pt-6 border-t border-[#D4A574]/20">
            <div className="text-[#A0A0A0] text-sm mb-2" style={{ fontFamily: 'serif' }}>
              Price
            </div>
            <div 
              className="text-[#D4A574]"
              style={{ 
                fontFamily: 'serif',
                fontSize: book.price === 0 ? '1.5rem' : '2.5rem',
                fontWeight: 700
              }}
            >
              {formatPrice(book.price)}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper component for detail rows
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#D4A574]/10">
      <span className="text-[#A0A0A0]" style={{ fontFamily: 'serif', fontWeight: 600 }}>
        {label}:
      </span>
      <span className="text-[#F5F5DC]" style={{ fontFamily: 'serif' }}>
        {value}
      </span>
    </div>
  );
}
