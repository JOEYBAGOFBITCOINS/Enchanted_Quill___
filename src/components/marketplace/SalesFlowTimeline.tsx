import { motion } from 'motion/react';
import { ShoppingCart, DollarSign, Shield, Package, FileCheck, CheckCircle, Truck } from 'lucide-react';

export function SalesFlowTimeline() {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Buyer Selects Book',
      description: 'Choose from our authenticated collection'
    },
    {
      icon: DollarSign,
      title: 'Buyer Pays Escrow Fee',
      description: 'Flat-rate fee based on book value'
    },
    {
      icon: Shield,
      title: 'Authentication Process',
      description: 'Expert verification & condition check'
    },
    {
      icon: FileCheck,
      title: 'Insurance Activates',
      description: 'Full coverage from start to finish'
    },
    {
      icon: Package,
      title: 'Secure Inspection Hub',
      description: 'Seller ships to our facility'
    },
    {
      icon: CheckCircle,
      title: 'Certification & COA',
      description: 'Digital certificate issued'
    },
    {
      icon: DollarSign,
      title: 'Funds Released',
      description: 'Payment sent to seller'
    },
    {
      icon: Truck,
      title: 'Final Delivery',
      description: 'Insured white-glove delivery to buyer'
    }
  ];

  return (
    <div className="py-20 px-6 bg-black">
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
            HOW IT WORKS
          </h2>
          <p className="text-[#F5F5DC]/80 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'serif' }}>
            A seamless, secure process from purchase to delivery
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent max-w-md mx-auto mt-6"
          />
        </motion.div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4A574]/20 via-[#D4A574]/60 to-[#D4A574]/20" />
            
            <div className="grid grid-cols-8 gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Icon Circle */}
                    <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#1a1612] to-[#2a1f1a] border-2 border-[#D4A574] flex items-center justify-center mb-6 group hover:scale-110 transition-transform duration-300">
                      <Icon className="w-12 h-12 text-[#D4A574]" strokeWidth={1.5} />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                        className="absolute inset-0 blur-xl bg-[#D4A574]/40 rounded-full"
                      />
                    </div>

                    {/* Step Number */}
                    <div className="absolute top-0 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#8B6914] to-[#D4A574] flex items-center justify-center text-black" style={{ fontFamily: 'serif', fontWeight: 700, fontSize: '0.9rem' }}>
                      {index + 1}
                    </div>

                    {/* Title */}
                    <h3 className="text-[#F5F5DC] mb-2 px-2" style={{ fontFamily: 'serif', fontSize: '0.9rem', fontWeight: 600, lineHeight: '1.3' }}>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#D4A574]/70 px-2" style={{ fontFamily: 'serif', fontSize: '0.75rem', lineHeight: '1.4' }}>
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden">
          <div className="relative pl-12">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4A574]/20 via-[#D4A574]/60 to-[#D4A574]/20" />

            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Icon Circle */}
                    <div className="absolute -left-12 w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1612] to-[#2a1f1a] border-2 border-[#D4A574] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#D4A574]" strokeWidth={1.5} />
                    </div>

                    {/* Step Number */}
                    <div className="absolute -left-[3.75rem] -top-1 w-6 h-6 rounded-full bg-gradient-to-br from-[#8B6914] to-[#D4A574] flex items-center justify-center text-black text-xs" style={{ fontFamily: 'serif', fontWeight: 700 }}>
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="bg-gradient-to-br from-[#1a1612] to-[#2a1f1a] border border-[#D4A574]/20 rounded-lg p-6">
                      <h3 className="text-[#F5F5DC] mb-2" style={{ fontFamily: 'serif', fontSize: '1.1rem', fontWeight: 600 }}>
                        {step.title}
                      </h3>
                      <p className="text-[#D4A574]/70" style={{ fontFamily: 'serif', fontSize: '0.9rem' }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
