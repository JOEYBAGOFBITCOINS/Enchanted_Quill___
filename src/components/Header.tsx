import { Search, Feather, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export function Header({ searchQuery, onSearch }: HeaderProps) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; duration: number }>>([]);

  useEffect(() => {
    // Create subtle starfield
    const newStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 3 + 2
    }));
    setStars(newStars);
  }, []);

  return (
    <header className="relative bg-gradient-to-b from-[#1a1612] via-[#0a0a0a] to-black text-white shadow-2xl overflow-hidden border-b border-[#D4A574]/20">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1612]/50 via-black to-[#0a0a0a]"></div>
        
        {/* Subtle gold glow */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-96 h-96 bg-[#D4A574] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-10 right-32 w-80 h-80 bg-[#8B6914] rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Subtle starfield */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-[#D4A574] animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(212, 165, 116, ${star.opacity})`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-6 mb-6">
          {/* Animated Quill Icon */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#D4A574] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-[#D4A574]/20 to-[#8B6914]/20 p-4 rounded-full backdrop-blur-sm border-2 border-[#D4A574]/50 group-hover:border-[#D4A574] transition-all duration-300 group-hover:scale-110">
              <Feather size={40} className="text-[#D4A574] drop-shadow-2xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" strokeWidth={2.5} />
              <Sparkles 
                size={18} 
                className="absolute -top-1 -right-1 text-[#F5F5DC] animate-[pulse_2s_ease-in-out_infinite]" 
              />
            </div>
          </div>

          {/* Title with Elegant Effects */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="relative text-[#F5F5DC] flex items-center gap-3 group" style={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.05em' }}>
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#F5F5DC] via-[#D4A574] to-[#F5F5DC] bg-clip-text text-transparent">
                    Enchanted Quill
                  </span>
                </span>
                <span className="text-2xl">✨</span>
              </h1>
            </div>
            <p className="text-[#D4A574]/80 tracking-wide" style={{ fontFamily: 'serif', fontWeight: 300 }}>
              Book Management System
            </p>
          </div>
        </div>
        
        {/* Enhanced Search Bar */}
        <div className="relative max-w-2xl group">
          {/* Glow effect behind search bar */}
          <div className="absolute inset-0 bg-[#D4A574] rounded-lg blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          
          <div className="relative">
            <Search 
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#D4A574] transition-all duration-300 group-hover:scale-110" 
              size={20} 
            />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-lg bg-black/40 backdrop-blur-sm text-[#F5F5DC] placeholder-[#D4A574]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A574]/50 shadow-xl transition-all duration-300 hover:bg-black/60 border border-[#D4A574]/20 focus:border-[#D4A574]/60"
              style={{ fontFamily: 'serif' }}
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              <Sparkles size={16} className="text-[#D4A574] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A574] to-transparent opacity-50"></div>
    </header>
  );
}
