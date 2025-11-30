import { motion } from 'motion/react';
import { RareBook } from '../../types/rare-book';
import { RareBookCard } from './RareBookCard';
import { BookOpen, Filter } from 'lucide-react';

interface RareBookCatalogProps {
  books: RareBook[];
  onViewDetails: (book: RareBook) => void;
}

export function RareBookCatalog({ books, onViewDetails }: RareBookCatalogProps) {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative py-20 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a1612] to-[#0a0a0a]" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#D4A574] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#8B6914] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <BookOpen className="w-16 h-16 text-[#D4A574]" strokeWidth={1} />
              <div className="absolute inset-0 blur-xl bg-[#D4A574]/30" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#F5F5DC] mb-4 tracking-wide"
            style={{
              fontFamily: 'serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
              letterSpacing: '0.05em'
            }}
          >
            The World's Most Trusted
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#D4A574] mb-6"
            style={{
              fontFamily: 'serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '0.08em'
            }}
          >
            RARE BOOK MARKETPLACE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#D4A574]/80 max-w-3xl mx-auto text-lg md:text-xl tracking-wide"
            style={{ fontFamily: 'serif', fontWeight: 300 }}
          >
            Authenticated • Insured • Protected by Flat-Rate Escrow
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent max-w-md mx-auto mt-8"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-[#D4A574]" />
            <span className="text-[#D4A574]" style={{ fontFamily: 'serif' }}>
              {books.length} Rare Acquisitions Available
            </span>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <RareBookCard book={book} onViewDetails={onViewDetails} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
