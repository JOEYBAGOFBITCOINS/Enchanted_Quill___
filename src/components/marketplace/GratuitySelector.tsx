import { motion } from 'motion/react';
import { useState } from 'react';
import { Heart } from 'lucide-react';

interface GratuitySelectorProps {
  onGratuityChange: (amount: number) => void;
}

export function GratuitySelector({ onGratuityChange }: GratuitySelectorProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const presetAmounts = [100, 250, 500];

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    onGratuityChange(amount);
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    const numValue = parseFloat(value);
    onGratuityChange(isNaN(numValue) ? 0 : numValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#1a1612] to-[#2a1f1a] border border-[#D4A574]/20 rounded-lg p-8"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <Heart className="w-8 h-8 text-[#D4A574]" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 blur-lg bg-[#D4A574]/40"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-[#F5F5DC] mb-2" style={{ fontFamily: 'serif', fontSize: '1.5rem', fontWeight: 600 }}>
            Optional Gratuity
          </h3>
          <p className="text-[#D4A574]/80" style={{ fontFamily: 'serif' }}>
            Support our preservation specialists, archivists, and authentication experts.
          </p>
        </div>
      </div>

      {/* Preset Amounts */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handlePresetClick(amount)}
            className={`py-4 rounded-lg border-2 transition-all duration-300 ${
              selectedAmount === amount
                ? 'bg-gradient-to-br from-[#8B6914] to-[#D4A574] border-[#D4A574] text-black'
                : 'bg-black/40 border-[#D4A574]/30 text-[#D4A574] hover:border-[#D4A574]/60'
            }`}
          >
            <span style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 700 }}>
              ${amount}
            </span>
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A574]" style={{ fontFamily: 'serif', fontSize: '1.2rem' }}>
          $
        </div>
        <input
          type="number"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => handleCustomChange(e.target.value)}
          className="w-full bg-black/40 border-2 border-[#D4A574]/30 rounded-lg py-4 pl-10 pr-4 text-[#F5F5DC] placeholder-[#D4A574]/40 focus:border-[#D4A574]/60 focus:outline-none transition-colors"
          style={{ fontFamily: 'serif', fontSize: '1.1rem' }}
        />
      </div>

      {/* Reassurance Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 pt-6 border-t border-[#D4A574]/10"
      >
        <p className="text-[#D4A574]/60 text-sm text-center leading-relaxed" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
          Gratuity is optional and never required. 100% supports expert handling and preservation.
        </p>
      </motion.div>
    </motion.div>
  );
}
