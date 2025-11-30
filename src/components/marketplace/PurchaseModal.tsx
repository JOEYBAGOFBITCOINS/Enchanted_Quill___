import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { RareBook } from '../../types/rare-book';
import { GratuitySelector } from './GratuitySelector';

interface PurchaseModalProps {
  book: RareBook;
  onClose: () => void;
  onConfirm: () => void;
}

export function PurchaseModal({ book, onClose, onConfirm }: PurchaseModalProps) {
  const [gratuity, setGratuity] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getEscrowFee = (price: number) => {
    if (price < 100000) return 750;
    if (price < 1000000) return 1500;
    if (price < 10000000) return 3500;
    return 5000;
  };

  const escrowFee = getEscrowFee(book.price);
  const total = book.price + escrowFee + gratuity;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-[10000] flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-gradient-to-br from-[#1a1612] to-[#2a1f1a] border border-[#D4A574]/30 rounded-lg p-8 max-w-2xl w-full my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#D4A574] hover:text-[#F4E4C1] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[#F5F5DC] mb-2" style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 600 }}>
              Complete Your Purchase
            </h2>
            <p className="text-[#D4A574]/80" style={{ fontFamily: 'serif' }}>
              {book.title}
            </p>
          </div>

          {/* Price Breakdown */}
          <div className="bg-black/40 border border-[#D4A574]/20 rounded-lg p-6 mb-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#F5F5DC]" style={{ fontFamily: 'serif', fontSize: '1.1rem' }}>
                Book Price
              </span>
              <span className="text-[#D4A574]" style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 600 }}>
                {formatPrice(book.price)}
              </span>
            </div>

            <div className="h-px bg-[#D4A574]/10" />

            <div className="flex justify-between items-center">
              <div>
                <span className="text-[#F5F5DC]" style={{ fontFamily: 'serif', fontSize: '1.1rem' }}>
                  Escrow & Insurance Fee
                </span>
                <p className="text-[#D4A574]/60 text-xs mt-1" style={{ fontFamily: 'serif' }}>
                  Authentication, insurance, appraisal, handling
                </p>
              </div>
              <span className="text-[#D4A574]" style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 600 }}>
                {formatPrice(escrowFee)}
              </span>
            </div>

            {gratuity > 0 && (
              <>
                <div className="h-px bg-[#D4A574]/10" />
                <div className="flex justify-between items-center">
                  <span className="text-[#F5F5DC]" style={{ fontFamily: 'serif', fontSize: '1.1rem' }}>
                    Gratuity
                  </span>
                  <span className="text-[#D4A574]" style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 600 }}>
                    {formatPrice(gratuity)}
                  </span>
                </div>
              </>
            )}

            <div className="h-px bg-[#D4A574]/30" />

            <div className="flex justify-between items-center pt-2">
              <span className="text-[#F5F5DC]" style={{ fontFamily: 'serif', fontSize: '1.4rem', fontWeight: 600 }}>
                Total
              </span>
              <span className="text-[#D4A574]" style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 700 }}>
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* Gratuity Selector */}
          <div className="mb-6">
            <GratuitySelector onGratuityChange={setGratuity} />
          </div>

          {/* Payment Method (Mock) */}
          <div className="bg-black/40 border border-[#D4A574]/20 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-[#D4A574]" />
              <h3 className="text-[#F5F5DC]" style={{ fontFamily: 'serif', fontSize: '1.1rem', fontWeight: 600 }}>
                Payment Method
              </h3>
            </div>
            <div className="bg-black/60 border border-[#D4A574]/10 rounded p-4">
              <p className="text-[#D4A574]/70 text-sm" style={{ fontFamily: 'serif' }}>
                Secure payment processing • Funds held in escrow until authentication complete
              </p>
            </div>
          </div>

          {/* Confirmation Button */}
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-[#8B6914] to-[#D4A574] hover:from-[#D4A574] hover:to-[#F4E4C1] text-black px-8 py-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
                <span style={{ fontFamily: 'serif', fontSize: '1.1rem', fontWeight: 600 }}>
                  Processing...
                </span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span style={{ fontFamily: 'serif', fontSize: '1.1rem', fontWeight: 600 }}>
                  Confirm Purchase
                </span>
              </>
            )}
          </button>

          {/* Trust Badge */}
          <div className="mt-6 text-center">
            <p className="text-[#D4A574]/60 text-xs" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
              Your payment is secured by Enchanted Quill Insured Escrow
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
