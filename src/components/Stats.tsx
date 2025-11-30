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
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'rgba(59, 130, 246, 0.3)',
    },
    {
      label: 'Total Copies',
      value: totalQuantity.toString(),
      icon: Package,
      color: 'from-green-500 to-emerald-500',
      glowColor: 'rgba(34, 197, 94, 0.3)',
    },
    {
      label: 'Inventory Value',
      value: `$${totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500',
      glowColor: 'rgba(168, 85, 247, 0.3)',
    },
    {
      label: 'Avg. Price',
      value: `$${avgPrice.toFixed(2)}`,
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      glowColor: 'rgba(249, 115, 22, 0.3)',
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
            className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"
            style={{ background: stat.glowColor }}
          ></div>
          
          {/* Card content */}
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
            <p className="text-purple-200/80">{stat.label}</p>
            <p className="text-white drop-shadow-lg">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
