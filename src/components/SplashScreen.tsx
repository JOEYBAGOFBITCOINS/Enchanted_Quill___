import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';
import logoImage from 'figma:asset/43050535ebfd85f0e098624816f94568924f0dd9.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),      // Fade in stars
      setTimeout(() => setStage(2), 1500),     // Feather summoned/floats down
      setTimeout(() => setStage(3), 4000),     // Feather waves
      setTimeout(() => setStage(4), 5500),     // Books/library worlds appear
      setTimeout(() => onComplete(), 9000),    // Complete after 9 seconds
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Generate stars
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3
  }));

  // Generate books for the library of worlds
  const books = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 1400,
    y: (Math.random() - 0.5) * 800,
    rotation: Math.random() * 360,
    delay: i * 0.05,
    scale: 0.6 + Math.random() * 0.8,
    color: ['#D4A574', '#8B7355', '#6B5B95', '#5D4E6D', '#B8860B'][Math.floor(Math.random() * 5)]
  }));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-br from-[#1a1612] via-black to-[#0a0a0a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* LOGO BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          {/* Background image with overlay */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${logoImage})`,
            }}
          />
          
          {/* Subtle dark overlay to make stars and feather visible */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Gentle cosmic glow overlay for magical effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 40%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 60%, rgba(75, 0, 130, 0.12) 0%, transparent 50%)
              `
            }}
            animate={{
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* STAR FIELD */}
        {stage >= 1 && (
          <>
            {stars.map((star) => (
              <motion.div
                key={`star-${star.id}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.7, 1],
                  scale: [0, 1, 0.8, 1],
                }}
                transition={{
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}

            {/* Larger twinkling stars */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`bigstar-${i}`}
                className="absolute text-yellow-200"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 70}%`,
                  fontSize: `${12 + Math.random() * 8}px`,
                  filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.8))'
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0.6, 1],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ✦
              </motion.div>
            ))}
          </>
        )}

        {/* STAGE 2 & 3: FEATHER SUMMONED AND WAVES */}
        {stage >= 2 && (
          <motion.div
            className="absolute"
            initial={{ 
              left: '50%', 
              top: '10%',
              x: '-50%',
              scale: 0.3,
              opacity: 0,
              rotate: -45
            }}
            animate={stage >= 3 ? {
              left: '50%',
              top: '40%',
              x: '-50%',
              scale: 0.6,
              opacity: 1,
              rotate: [0, -15, 25, -10, 15, 0]
            } : {
              left: '50%',
              top: '35%',
              x: '-50%',
              scale: 0.5,
              opacity: 1,
              rotate: -20
            }}
            transition={stage >= 3 ? {
              rotate: { duration: 1.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" },
              duration: 0.5
            } : {
              duration: 2.5,
              ease: "easeOut"
            }}
          >
            {/* Magical particles swirling around feather as it descends */}
            {stage >= 2 && stage < 3 && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`summon-particle-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full bg-amber-300"
                    style={{
                      left: '50%',
                      top: '50%',
                      boxShadow: '0 0 8px 2px rgba(251, 191, 36, 0.6)'
                    }}
                    animate={{
                      x: [0, Math.cos((i / 20) * Math.PI * 2) * 60, Math.cos((i / 20) * Math.PI * 2) * 100],
                      y: [0, Math.sin((i / 20) * Math.PI * 2) * 60, Math.sin((i / 20) * Math.PI * 2) * 100],
                      opacity: [1, 0.8, 0],
                      scale: [1, 1.5, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.05,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                ))}
              </>
            )}

            {/* Feather glow - soft white/golden */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(255, 250, 240, 0.6) 0%, rgba(251, 191, 36, 0.3) 50%, transparent 70%)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* The Realistic Feather */}
            <svg
              width="300"
              height="500"
              viewBox="0 0 400 700"
              className="drop-shadow-2xl"
            >
              <defs>
                {/* Realistic feather gradient - cream to white with brown tips */}
                <linearGradient id="featherGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#F5F5DC', stopOpacity: 0.95 }} />
                  <stop offset="30%" style={{ stopColor: '#FFFAF0', stopOpacity: 0.98 }} />
                  <stop offset="70%" style={{ stopColor: '#FFF8E7', stopOpacity: 0.98 }} />
                  <stop offset="100%" style={{ stopColor: '#F5F5DC', stopOpacity: 0.95 }} />
                </linearGradient>
                
                {/* Darker tips gradient */}
                <linearGradient id="featherTipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#D2B48C', stopOpacity: 0.9 }} />
                  <stop offset="50%" style={{ stopColor: '#C9A86A', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#D2B48C', stopOpacity: 0.9 }} />
                </linearGradient>

                {/* Natural brown spine */}
                <linearGradient id="spineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#8B7355', stopOpacity: 1 }} />
                  <stop offset="30%" style={{ stopColor: '#A0826D', stopOpacity: 1 }} />
                  <stop offset="70%" style={{ stopColor: '#8B7355', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#6B5A4D', stopOpacity: 1 }} />
                </linearGradient>

                {/* Soft glow */}
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Shadow for depth */}
                <filter id="featherShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                  <feOffset dx="2" dy="4" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Feather barbs - left side with natural variation */}
              {[...Array(40)].map((_, i) => {
                const yPos = 50 + i * 16;
                const width = 85 - (i * 1.8);
                const curve = 8 + (i * 0.6);
                const opacity = i < 5 ? 0.7 : (i > 35 ? 0.5 : 0.85);
                return (
                  <path
                    key={`barb-left-${i}`}
                    d={`M 200 ${yPos} Q ${200 - curve} ${yPos + 4} ${200 - width} ${yPos + 8 + Math.random() * 3}`}
                    stroke={i < 5 ? "url(#featherTipGrad)" : "url(#featherGrad)"}
                    strokeWidth={2.5 - (i * 0.03)}
                    fill="none"
                    opacity={opacity}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Feather barbs - right side with natural variation */}
              {[...Array(40)].map((_, i) => {
                const yPos = 50 + i * 16;
                const width = 85 - (i * 1.8);
                const curve = 8 + (i * 0.6);
                const opacity = i < 5 ? 0.7 : (i > 35 ? 0.5 : 0.85);
                return (
                  <path
                    key={`barb-right-${i}`}
                    d={`M 200 ${yPos} Q ${200 + curve} ${yPos + 4} ${200 + width} ${yPos + 8 + Math.random() * 3}`}
                    stroke={i < 5 ? "url(#featherTipGrad)" : "url(#featherGrad)"}
                    strokeWidth={2.5 - (i * 0.03)}
                    fill="none"
                    opacity={opacity}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Secondary smaller barbs for texture - left */}
              {[...Array(20)].map((_, i) => {
                const yPos = 100 + i * 28;
                const width = 60 - (i * 2);
                const curve = 6 + (i * 0.4);
                return (
                  <path
                    key={`barb2-left-${i}`}
                    d={`M 200 ${yPos + 8} Q ${200 - curve} ${yPos + 10} ${200 - width} ${yPos + 14}`}
                    stroke="url(#featherGrad)"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.4"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Secondary smaller barbs for texture - right */}
              {[...Array(20)].map((_, i) => {
                const yPos = 100 + i * 28;
                const width = 60 - (i * 2);
                const curve = 6 + (i * 0.4);
                return (
                  <path
                    key={`barb2-right-${i}`}
                    d={`M 200 ${yPos + 8} Q ${200 + curve} ${yPos + 10} ${200 + width} ${yPos + 14}`}
                    stroke="url(#featherGrad)"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.4"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Feather vane fill - left side */}
              <path
                d="M 200 50 Q 165 300 180 650 L 200 650 Z"
                fill="url(#featherGrad)"
                opacity="0.5"
                filter="url(#featherShadow)"
              />

              {/* Feather vane fill - right side */}
              <path
                d="M 200 50 Q 235 300 220 650 L 200 650 Z"
                fill="url(#featherGrad)"
                opacity="0.5"
                filter="url(#featherShadow)"
              />

              {/* Central rachis (spine) - natural brown */}
              <path
                d="M 200 20 L 200 670"
                stroke="url(#spineGrad)"
                strokeWidth="5"
                fill="none"
                filter="url(#softGlow)"
                strokeLinecap="round"
              />

              {/* Spine highlight for dimension */}
              <path
                d="M 199 30 L 199 660"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
                strokeLinecap="round"
              />

              {/* Feather tip - pointed */}
              <path
                d="M 200 20 L 190 45 L 200 40 L 210 45 Z"
                fill="url(#featherTipGrad)"
                opacity="0.9"
              />

              {/* Tip highlight */}
              <path
                d="M 200 20 L 195 35 L 200 32 Z"
                fill="rgba(255, 255, 255, 0.4)"
                opacity="0.6"
              />
            </svg>
          </motion.div>
        )}

        {/* STAGE 4: LIBRARY OF WORLDS - BOOKS APPEAR */}
        {stage >= 4 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {books.map((book) => (
              <motion.div
                key={`book-${book.id}`}
                className="absolute"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0, 
                  opacity: 0,
                  rotate: 0
                }}
                animate={{
                  x: book.x,
                  y: book.y,
                  scale: book.scale,
                  opacity: [0, 1, 0.9],
                  rotate: book.rotation
                }}
                transition={{
                  duration: 1.5,
                  delay: book.delay,
                  ease: "easeOut"
                }}
              >
                {/* Book icon or representation */}
                <div className="relative">
                  <BookOpen 
                    size={60} 
                    className="drop-shadow-lg"
                    style={{ 
                      color: book.color,
                      filter: `drop-shadow(0 0 10px ${book.color})`
                    }}
                  />
                  
                  {/* Book glow */}
                  <div 
                    className="absolute inset-0 blur-xl opacity-50"
                    style={{
                      background: `radial-gradient(circle, ${book.color} 0%, transparent 70%)`
                    }}
                  />

                  {/* Sparkle on book */}
                  <motion.div
                    className="absolute -top-2 -right-2 text-yellow-200"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      delay: book.delay + 0.5,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    ✦
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Magical energy waves emanating from the feather motion */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-amber-400/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 3, 5],
                  opacity: [0.6, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Final shimmer sweep */}
        {stage >= 4 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.2), transparent)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 2,
              delay: 0.5,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
