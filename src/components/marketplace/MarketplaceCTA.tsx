import { motion } from 'motion/react';
import { BookOpen, DollarSign, Phone, Shield } from 'lucide-react';

export function MarketplaceCTA() {
  const actions = [
    {
      icon: BookOpen,
      title: 'Browse Rare Collection',
      description: 'Explore authenticated treasures',
      action: 'Explore Now'
    },
    {
      icon: DollarSign,
      title: 'Sell Your Rare Book',
      description: 'Join our vetted sellers',
      action: 'List Your Book'
    },
    {
      icon: Phone,
      title: 'Speak to an Archivist',
      description: 'Expert guidance & consultation',
      action: 'Contact Us'
    },
    {
      icon: Shield,
      title: 'Request Authentication',
      description: 'Professional appraisal services',
      action: 'Get Verified'
    }
  ];

  return (
    <div className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1612] to-black" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4A574] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B6914] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-[#F5F5DC] mb-4"
            style={{
              fontFamily: 'serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '0.03em'
            }}
          >
            Ready to Begin Your Journey?
          </h2>
          <p className="text-[#D4A574]/80 text-lg" style={{ fontFamily: 'serif' }}>
            Let us guide you through the world of rare book collecting
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-gradient-to-br from-[#1a1612] via-[#2a1f1a] to-[#1a1612] border border-[#D4A574]/30 rounded-lg p-8 hover:border-[#D4A574]/60 transition-all duration-300 flex flex-col">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574]/0 via-[#D4A574]/5 to-[#D4A574]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  
                  <div className="relative flex-1 flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="relative inline-block">
                        <Icon className="w-12 h-12 text-[#D4A574]" strokeWidth={1.5} />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                          className="absolute inset-0 blur-xl bg-[#D4A574]/40"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-[#F5F5DC] mb-3" style={{ fontFamily: 'serif', fontSize: '1.3rem', fontWeight: 600, lineHeight: '1.3' }}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#D4A574]/70 mb-6 flex-1" style={{ fontFamily: 'serif', fontSize: '0.95rem' }}>
                      {item.description}
                    </p>

                    {/* Action Button */}
                    <button 
                      onClick={() => window.open('https://youtube.com/shorts/Ay8lynMZ4mE?si=RNDxOKE7_9agugUX', '_blank')}
                      className="w-full bg-gradient-to-r from-[#8B6914] to-[#D4A574] hover:from-[#D4A574] hover:to-[#F4E4C1] text-black px-6 py-3 rounded transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#D4A574]/20 cursor-pointer"
                    >
                      <span style={{ fontFamily: 'serif', fontWeight: 600 }}>
                        {item.action}
                      </span>
                    </button>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#D4A574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-[#D4A574] text-xl italic" style={{ fontFamily: 'serif', fontWeight: 300 }}>
            "Where heritage meets security, and every acquisition tells a story."
          </p>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent max-w-md mx-auto mt-8"
          />
        </motion.div>
      </div>
    </div>
  );
}
