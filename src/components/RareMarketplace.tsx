import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RareBook } from '../types/rare-book';
import { rareBooks } from '../data/rare-books';
import { RareBookCatalog } from './marketplace/RareBookCatalog';
import { RareBookDetail } from './marketplace/RareBookDetail';
import { RareBookLightbox } from './marketplace/RareBookLightbox';
import { EscrowFeaturePage } from './marketplace/EscrowFeaturePage';
import { PricingTable } from './marketplace/PricingTable';
import { SalesFlowTimeline } from './marketplace/SalesFlowTimeline';
import { MarketplaceCTA } from './marketplace/MarketplaceCTA';
import { PurchaseModal } from './marketplace/PurchaseModal';
import { toast } from 'sonner@2.0.3';
import { ChevronLeft, Gem } from 'lucide-react';

interface RareMarketplaceProps {
  onBack?: () => void;
}

export default function RareMarketplace({ onBack }: RareMarketplaceProps) {
  const [selectedBook, setSelectedBook] = useState<RareBook | null>(null);
  const [purchasingBook, setPurchasingBook] = useState<RareBook | null>(null);

  const handleViewDetails = (book: RareBook) => {
    console.log('🔍 View Details clicked for:', book.title);
    setSelectedBook(book);
    console.log('📖 selectedBook state updated to:', book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  const handlePurchase = (book: RareBook) => {
    setPurchasingBook(book);
  };

  const handleClosePurchase = () => {
    setPurchasingBook(null);
  };

  const handleConfirmPurchase = () => {
    setPurchasingBook(null);
    setSelectedBook(null);
    toast.success('Purchase Initiated!', {
      description: 'Your rare book is now entering our secure escrow process. You will receive authentication updates via email.',
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      {onBack && (
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-[#D4A574]/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#D4A574] hover:text-[#F4E4C1] transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span style={{ fontFamily: 'serif', fontWeight: 600 }}>Back to Inventory</span>
              </button>
              
              <div className="flex items-center gap-3">
                <Gem className="w-6 h-6 text-[#D4A574]" />
                <h1 className="text-[#F5F5DC] text-xl" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                  Rare Books & Antiquarian Marketplace
                </h1>
              </div>
              
              <div className="w-32"></div> {/* Spacer for centering */}
            </div>
          </div>
        </div>
      )}

      {/* Main Catalog */}
      <RareBookCatalog books={rareBooks} onViewDetails={handleViewDetails} />

      {/* Escrow Feature Section */}
      <EscrowFeaturePage />

      {/* Pricing Table */}
      <PricingTable />

      {/* Sales Flow Timeline */}
      <SalesFlowTimeline />

      {/* CTA Section */}
      <MarketplaceCTA />

      {/* Book Detail Lightbox */}
      {console.log('💡 Rendering lightbox check. selectedBook:', selectedBook?.title || 'null')}
      {selectedBook && (
        <RareBookLightbox
          book={selectedBook}
          onClose={handleCloseDetails}
        />
      )}

      {/* Purchase Modal */}
      <AnimatePresence>
        {purchasingBook && (
          <PurchaseModal
            book={purchasingBook}
            onClose={handleClosePurchase}
            onConfirm={handleConfirmPurchase}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
