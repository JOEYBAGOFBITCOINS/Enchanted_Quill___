import { motion } from 'motion/react';
import { X, Shield, FileCheck, Lock, Truck, Award, Phone, ChevronLeft } from 'lucide-react';
import { RareBook } from '../../types/rare-book';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface RareBookDetailProps {
  book: RareBook;
  onClose: () => void;
  onPurchase: (book: RareBook) => void;
}

export function RareBookDetail({ book, onClose, onPurchase }: RareBookDetailProps) {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[9999] overflow-y-auto"
    >
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {/* Close Button */}
        <div className="max-w-7xl mx-auto mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#D4A574] hover:text-[#F4E4C1] transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span style={{ fontFamily: 'serif' }}>Back to Collection</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-8">
                {/* Main Image */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#D4A574]/30 shadow-2xl">
                  <ImageWithFallback
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Verification Badge */}
                  {book.verified && (
                    <div className="absolute top-6 right-6 bg-gradient-to-br from-[#D4A574] to-[#8B6914] px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                      <Shield className="w-5 h-5 text-black" />
                      <span className="text-sm text-black" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                        Enchanted Quill Verified Authentic
                      </span>
                    </div>
                  )}

                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#D4A574]/40" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#D4A574]/40" />
                </div>

                {/* Certificate Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 bg-gradient-to-br from-[#1a1612] to-[#2a1f1a] border border-[#D4A574]/20 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-[#D4A574]" />
                    <h3 className="text-[#F5F5DC]" style={{ fontFamily: 'serif', fontSize: '1.1rem', fontWeight: 600 }}>
                      Certificate of Authenticity
                    </h3>
                  </div>
                  <p className="text-[#D4A574]/70 text-sm mb-4" style={{ fontFamily: 'serif' }}>
                    Each purchase includes a digitally signed certificate of authenticity with blockchain verification.
                  </p>
                  <div className="bg-black/40 rounded p-4 border border-[#D4A574]/10">
                    <div className="flex items-center justify-between text-xs text-[#D4A574]/60" style={{ fontFamily: 'monospace' }}>
                      <span>Certificate #</span>
                      <span>{book.id.padStart(8, '0')}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Title & Author */}
              <div>
                <h1 
                  className="text-[#F5F5DC] mb-3"
                  style={{ 
                    fontFamily: 'serif',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 600,
                    lineHeight: '1.2'
                  }}
                >
                  {book.title}
                </h1>
                <p className="text-[#D4A574] text-xl" style={{ fontFamily: 'serif' }}>
                  {book.author} • {book.year}
                </p>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-br from-[#1a1612] to-[#2a1f1a] border border-[#D4A574]/30 rounded-lg p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span 
                    className="text-[#D4A574]"
                    style={{ 
                      fontFamily: 'serif',
                      fontSize: book.price === 0 ? '1.5rem' : '2.5rem',
                      fontWeight: 700
                    }}
                  >
                    {formatPrice(book.price)}
                  </span>
                </div>
                <p className="text-[#D4A574]/60 text-sm" style={{ fontFamily: 'serif' }}>
                  Price includes insurance and authentication
                </p>
              </div>

              {/* Trust Icons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border border-[#D4A574]/10 rounded-lg p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#F5F5DC] text-sm mb-1" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                      Authentication
                    </h4>
                    <p className="text-[#D4A574]/60 text-xs" style={{ fontFamily: 'serif' }}>
                      Expert verified
                    </p>
                  </div>
                </div>

                <div className="bg-black/40 border border-[#D4A574]/10 rounded-lg p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#F5F5DC] text-sm mb-1" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                      Insured Escrow
                    </h4>
                    <p className="text-[#D4A574]/60 text-xs" style={{ fontFamily: 'serif' }}>
                      Total protection
                    </p>
                  </div>
                </div>

                <div className="bg-black/40 border border-[#D4A574]/10 rounded-lg p-4 flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#F5F5DC] text-sm mb-1" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                      Secure Shipping
                    </h4>
                    <p className="text-[#D4A574]/60 text-xs" style={{ fontFamily: 'serif' }}>
                      White-glove handling
                    </p>
                  </div>
                </div>

                <div className="bg-black/40 border border-[#D4A574]/10 rounded-lg p-4 flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#F5F5DC] text-sm mb-1" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                      Full Insurance
                    </h4>
                    <p className="text-[#D4A574]/60 text-xs" style={{ fontFamily: 'serif' }}>
                      Transit coverage
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={() => onPurchase(book)}
                  className="w-full bg-gradient-to-r from-[#8B6914] to-[#D4A574] hover:from-[#D4A574] hover:to-[#F4E4C1] text-black px-8 py-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span style={{ fontFamily: 'serif', fontSize: '1.1rem', fontWeight: 600 }}>
                    {book.price === 0 ? 'Request Private Consultation' : 'Purchase via Insured Escrow'}
                  </span>
                </button>

                <button className="w-full bg-black/60 hover:bg-black/80 border border-[#D4A574]/30 hover:border-[#D4A574]/60 text-[#D4A574] px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span style={{ fontFamily: 'serif', fontWeight: 600 }}>
                    Speak with a Specialist
                  </span>
                </button>
              </div>

              {/* Description */}
              <div className="border-t border-[#D4A574]/20 pt-8">
                <h3 className="text-[#F5F5DC] mb-4" style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 600 }}>
                  Description
                </h3>
                <p className="text-[#D4A574]/80 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  {book.description}
                </p>
              </div>

              {/* Condition Report */}
              <div className="border-t border-[#D4A574]/20 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#F5F5DC]" style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 600 }}>
                    Condition Report
                  </h3>
                  <span className="bg-gradient-to-r from-[#8B6914] to-[#D4A574] text-black px-4 py-1 rounded-full text-sm" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                    {book.conditionGrade}
                  </span>
                </div>
                <p className="text-[#D4A574]/80 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  {book.condition}
                </p>
              </div>

              {/* Provenance */}
              <div className="border-t border-[#D4A574]/20 pt-8">
                <h3 className="text-[#F5F5DC] mb-4" style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 600 }}>
                  Provenance History
                </h3>
                <div className="bg-black/40 border border-[#D4A574]/10 rounded-lg p-6">
                  <p className="text-[#D4A574]/80 leading-relaxed" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
                    {book.provenance}
                  </p>
                </div>
              </div>

              {/* Appraisal Summary */}
              <div className="border-t border-[#D4A574]/20 pt-8">
                <h3 className="text-[#F5F5DC] mb-4" style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 600 }}>
                  Appraisal Summary
                </h3>
                <p className="text-[#D4A574]/80 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  {book.appraisalSummary}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
