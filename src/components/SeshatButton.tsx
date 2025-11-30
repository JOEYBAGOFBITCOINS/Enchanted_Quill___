import seshatImage from 'figma:asset/de8c7736f42b1c9c5b5f08772e995a1e009197ab.png';

interface SeshatButtonProps {
  onClick: () => void;
  hasNotification?: boolean;
}

export function SeshatButton({ onClick, hasNotification = false }: SeshatButtonProps) {
  const handleClick = () => {
    console.log('Seshat button clicked! Opening chat...');
    onClick();
  };
  
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-110 active:scale-95 z-40 group ring-2 ring-amber-500 animate-bounce hover:animate-none"
      aria-label="Chat with Seshat"
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
        {/* Seshat Image */}
        <img 
          src={seshatImage} 
          alt="Seshat" 
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain relative z-10"
        />
        
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-10"></div>
        
        {/* Notification badge */}
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-20"></div>
        )}
      </div>
      
      {/* Tooltip - Hidden on mobile since it doesn't work well with touch */}
      <div className="hidden sm:block absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        <p className="text-sm">💬 Speak to Seshat</p>
        <p className="text-xs text-amber-300">Goddess of Knowledge</p>
        <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
}
