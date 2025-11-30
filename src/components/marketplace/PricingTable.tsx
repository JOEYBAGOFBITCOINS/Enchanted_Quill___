import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export function PricingTable() {
  const pricingTiers = [
    {
      range: 'Books under $100,000',
      fee: '$750',
      included: ['Authentication', 'Insurance', 'Expert appraisal', 'Secure handling', 'Protected disbursement']
    },
    {
      range: '$100,000 to $1,000,000',
      fee: '$1,500',
      included: ['Authentication', 'Insurance', 'Expert appraisal', 'Secure handling', 'Protected disbursement', 'Priority processing']
    },
    {
      range: '$1M to $10M',
      fee: '$3,500',
      included: ['Authentication', 'Insurance', 'Expert appraisal', 'Secure handling', 'Protected disbursement', 'Priority processing', 'Dedicated specialist']
    },
    {
      range: 'Above $10M',
      fee: '$5,000',
      included: ['Authentication', 'Insurance', 'Expert appraisal', 'Secure handling', 'Protected disbursement', 'Priority processing', 'Dedicated specialist', 'White-glove service']
    }
  ];

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-[#D4A574] mb-4"
            style={{
              fontFamily: 'serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}
          >
            ESCROW & INSURANCE FEES
          </h2>
          <p className="text-[#F5F5DC]/80 text-lg" style={{ fontFamily: 'serif' }}>
            Flat rate based on book value • Buyer pays fee
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent max-w-md mx-auto mt-6"
          />
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-[#1a1612] via-[#2a1f1a] to-[#1a1612] border border-[#D4A574]/30 rounded-lg p-8 hover:border-[#D4A574]/60 transition-all duration-300">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574]/0 via-[#D4A574]/5 to-[#D4A574]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                
                <div className="relative">
                  {/* Range */}
                  <h3 
                    className="text-[#F5F5DC] mb-4 min-h-[3rem]"
                    style={{ 
                      fontFamily: 'serif', 
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      lineHeight: '1.3'
                    }}
                  >
                    {tier.range}
                  </h3>

                  {/* Fee */}
                  <div className="mb-6">
                    <div className="text-[#D4A574]" style={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 700 }}>
                      {tier.fee}
                    </div>
                    <div className="text-[#D4A574]/60 text-sm" style={{ fontFamily: 'serif' }}>
                      one-time fee
                    </div>
                  </div>

                  {/* Included Services */}
                  <div className="space-y-3 pt-6 border-t border-[#D4A574]/20">
                    {tier.included.map((service, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#D4A574] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-[#F5F5DC]/80 text-sm" style={{ fontFamily: 'serif' }}>
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#D4A574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-[#D4A574]/60 text-sm max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
            Fee covers authentication, insurance, expert appraisal, secure handling, and protected disbursement. 
            All transactions are processed through our secure escrow system with full insurance coverage from initiation to final delivery.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
