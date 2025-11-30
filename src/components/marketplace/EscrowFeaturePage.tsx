import { motion } from 'motion/react';
import { Shield, Lock, FileCheck, Award, Check } from 'lucide-react';

export function EscrowFeaturePage() {
  const features = [
    'Every rare book purchase is protected by flat-rate insured escrow.',
    'Authentication and condition verification occur before funds are released.',
    'We provide insurance coverage during appraisal, transit, and final delivery.',
    'All sellers are vetted and contractually verified.',
    'Tamper-evident security protocols during shipment.'
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Lock className="w-20 h-20 text-[#D4A574]" strokeWidth={1.5} />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 blur-2xl bg-[#D4A574]/40"
              />
            </div>
          </div>

          <h1 
            className="text-[#D4A574] mb-4"
            style={{
              fontFamily: 'serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}
          >
            ENCHANTED QUILL
          </h1>
          
          <h2
            className="text-[#F5F5DC] mb-6"
            style={{
              fontFamily: 'serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 400
            }}
          >
            Insured Escrow
          </h2>

          <p 
            className="text-[#D4A574] text-xl md:text-2xl italic"
            style={{ fontFamily: 'serif', fontWeight: 300 }}
          >
            No commissions. No surprises. Total protection.
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent max-w-md mx-auto mt-8"
          />
        </motion.div>

        {/* Feature Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-[#1a1612] to-[#2a1f1a] border border-[#D4A574]/30 rounded-lg p-8 md:p-12 mb-16"
        >
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B6914] flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-black" strokeWidth={3} />
                </div>
                <p 
                  className="text-[#F5F5DC] text-lg leading-relaxed"
                  style={{ fontFamily: 'serif' }}
                >
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-4 gap-6"
        >
          <div className="bg-black/40 border border-[#D4A574]/20 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Shield className="w-12 h-12 text-[#D4A574]" />
                <div className="absolute inset-0 blur-xl bg-[#D4A574]/30" />
              </div>
            </div>
            <h3 className="text-[#F5F5DC] mb-2" style={{ fontFamily: 'serif', fontWeight: 600 }}>
              Luxury Insurance
            </h3>
            <p className="text-[#D4A574]/70 text-sm" style={{ fontFamily: 'serif' }}>
              Full coverage protection
            </p>
          </div>

          <div className="bg-black/40 border border-[#D4A574]/20 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Lock className="w-12 h-12 text-[#D4A574]" />
                <div className="absolute inset-0 blur-xl bg-[#D4A574]/30" />
              </div>
            </div>
            <h3 className="text-[#F5F5DC] mb-2" style={{ fontFamily: 'serif', fontWeight: 600 }}>
              Escrow Vault
            </h3>
            <p className="text-[#D4A574]/70 text-sm" style={{ fontFamily: 'serif' }}>
              Secure fund holding
            </p>
          </div>

          <div className="bg-black/40 border border-[#D4A574]/20 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <FileCheck className="w-12 h-12 text-[#D4A574]" />
                <div className="absolute inset-0 blur-xl bg-[#D4A574]/30" />
              </div>
            </div>
            <h3 className="text-[#F5F5DC] mb-2" style={{ fontFamily: 'serif', fontWeight: 600 }}>
              Digital Certificate
            </h3>
            <p className="text-[#D4A574]/70 text-sm" style={{ fontFamily: 'serif' }}>
              Blockchain verified
            </p>
          </div>

          <div className="bg-black/40 border border-[#D4A574]/20 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Award className="w-12 h-12 text-[#D4A574]" />
                <div className="absolute inset-0 blur-xl bg-[#D4A574]/30" />
              </div>
            </div>
            <h3 className="text-[#F5F5DC] mb-2" style={{ fontFamily: 'serif', fontWeight: 600 }}>
              Expert Appraisal
            </h3>
            <p className="text-[#D4A574]/70 text-sm" style={{ fontFamily: 'serif' }}>
              Certified authentication
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
