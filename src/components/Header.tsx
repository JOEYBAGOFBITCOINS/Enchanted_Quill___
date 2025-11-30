import { Search, BookOpen, Sparkles, Star, Feather } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export function Header({ searchQuery, onSearch }: HeaderProps) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; duration: number }>>([]);

  useEffect(() => {
    // Create starfield
    const newStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2
    }));
    setStars(newStars);
  }, []);

  return (
    <header className="relative bg-black text-white shadow-2xl overflow-hidden">
      {/* Deep Space Background with Milky Way */}
      <div className="absolute inset-0">
        {/* Base cosmic gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-black"></div>
        
        {/* Milky Way effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-3/4 h-full bg-gradient-to-br from-purple-300/20 via-blue-300/10 to-transparent blur-3xl transform -rotate-45"></div>
          <div className="absolute top-0 right-1/4 w-2/3 h-full bg-gradient-to-bl from-pink-300/15 via-purple-300/10 to-transparent blur-3xl transform rotate-12"></div>
        </div>

        {/* Nebula clouds */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Starfield */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-6 mb-6">
          {/* Animated Quill Icon */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-yellow-300/20 to-amber-400/20 p-4 rounded-full backdrop-blur-sm border-2 border-yellow-300/50 group-hover:border-yellow-200 transition-all duration-300 group-hover:scale-110">
              <Feather size={40} className="text-yellow-200 drop-shadow-2xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" strokeWidth={2.5} />
              <Sparkles 
                size={18} 
                className="absolute -top-1 -right-1 text-yellow-100 animate-[pulse_2s_ease-in-out_infinite]" 
              />
              <Star 
                size={14} 
                className="absolute -bottom-1 -left-1 text-pink-200 animate-[spin_3s_linear_infinite]" 
              />
            </div>
          </div>

          {/* Title with Magical Effects */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="relative text-white flex items-center gap-3 group">
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
                    Enchanted Quill
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                </span>
                <span className="text-3xl animate-[bounce_2s_ease-in-out_infinite]">✨</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-purple-300 animate-pulse" />
              <p className="text-purple-200 tracking-wide">
                Book Management System
              </p>
              <div className="flex gap-1 ml-2">
                <span className="w-1 h-1 bg-pink-300 rounded-full animate-[ping_1.5s_ease-in-out_infinite]"></span>
                <span className="w-1 h-1 bg-purple-300 rounded-full animate-[ping_1.5s_ease-in-out_infinite] animation-delay-300"></span>
                <span className="w-1 h-1 bg-yellow-300 rounded-full animate-[ping_1.5s_ease-in-out_infinite] animation-delay-600"></span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Search Bar */}
        <div className="relative max-w-2xl group">
          {/* Glow effect behind search bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          
          <div className="relative">
            <Search 
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-400 transition-all duration-300 group-hover:text-purple-600 group-hover:scale-110" 
              size={20} 
            />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white border-2 border-transparent focus:border-purple-300"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 flex gap-1">
              <Sparkles size={16} className="text-purple-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Cosmic particles floating in header */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-purple-300/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `cosmicFloat ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 10px rgba(216, 180, 254, 0.6)'
            }}
          />
        ))}
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 animate-pulse"></div>
    </header>
  );
}
