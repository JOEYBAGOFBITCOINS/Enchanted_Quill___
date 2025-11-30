import { Book } from '../types/book';
import { BookOpen, DollarSign, Package, TrendingUp } from 'lucide-react';

interface StatsProps {
  books: Book[];
}

export function Stats({ books }: StatsProps) {
  const totalBooks = books.length;
  const totalQuantity = books.reduce((sum, book) => sum + book.quantity, 0);
  const totalValue = books.reduce((sum, book) => sum + (book.price * book.quantity), 0);
  const avgPrice = totalBooks > 0 ? totalValue / totalQuantity : 0;

  const stats = [
    {
      label: 'Total Titles',
      value: totalBooks.toString(),
      icon: BookOpen,
    },
    {
      label: 'Total Copies',
      value: totalQuantity.toString(),
      icon: Package,
    },
    {
      label: 'Inventory Value',
      value: `$${totalValue.toFixed(2)}`,
      icon: DollarSign,
    },
    {
      label: 'Avg. Price',
      value: `$${avgPrice.toFixed(2)}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative group"
        >
          {/* Glow effect on hover */}
          <div 
            className="absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 blur-lg bg-[#D4A574]/30 transition-all duration-300"
          ></div>
          
          {/* Card content */}
          <div className="relative bg-gradient-to-br from-[#1a1612] via-[#2a1f1a] to-[#1a1612] border border-[#D4A574]/20 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#8B6914] to-[#D4A574] shadow-lg">
                <stat.icon className="text-black" size={24} />
              </div>
            </div>
            <p className="text-[#D4A574]/70 mb-1" style={{ fontFamily: 'serif', fontSize: '0.875rem' }}>{stat.label}</p>
            <p className="text-[#F5F5DC]" style={{ fontFamily: 'serif', fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
