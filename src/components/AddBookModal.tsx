import { useState } from 'react';
import { Book } from '../types/book';
import { X, BookPlus, Sparkles } from 'lucide-react';

interface AddBookModalProps {
  onClose: () => void;
  onAdd: (book: Omit<Book, 'id'>) => void;
}

export function AddBookModal({ onClose, onAdd }: AddBookModalProps) {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    price: '',
    quantity: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onAdd({
        isbn: formData.isbn,
        title: formData.title,
        author: formData.author,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-[#1a1612] via-[#2a1f1a] to-[#1a1612] border border-[#D4A574]/30 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
        <div className="sticky top-0 bg-gradient-to-r from-[#8B6914] to-[#D4A574] text-black p-6 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black/20 rounded-lg">
              <BookPlus size={24} />
            </div>
            <div>
              <h2 className="text-black flex items-center gap-2" style={{ fontFamily: 'serif', fontSize: '1.5rem', fontWeight: 600 }}>
                Add New Book
                <Sparkles size={20} className="animate-pulse" />
              </h2>
              <p className="text-black/80" style={{ fontFamily: 'serif' }}>
                Add a volume to your collection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="isbn" className="block text-[#D4A574] mb-2" style={{ fontFamily: 'serif', fontWeight: 600 }}>
              ISBN
            </label>
            <input
              id="isbn"
              type="text"
              value={formData.isbn}
              onChange={(e) => handleChange('isbn', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.isbn ? 'border-red-500' : 'border-[#D4A574]/30'
              } bg-black/40 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#D4A574] transition-colors placeholder-[#D4A574]/40`}
              style={{ fontFamily: 'serif' }}
              placeholder="978-0-7475-3269-9"
            />
            {errors.isbn && (
              <p className="mt-1 text-red-400" style={{ fontFamily: 'serif', fontSize: '0.875rem' }}>{errors.isbn}</p>
            )}
          </div>

          <div>
            <label htmlFor="title" className="block text-[#D4A574] mb-2" style={{ fontFamily: 'serif', fontWeight: 600 }}>
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.title ? 'border-red-500' : 'border-[#D4A574]/30'
              } bg-black/40 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#D4A574] transition-colors placeholder-[#D4A574]/40`}
              style={{ fontFamily: 'serif' }}
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="mt-1 text-red-400" style={{ fontFamily: 'serif', fontSize: '0.875rem' }}>{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="author" className="block text-[#D4A574] mb-2" style={{ fontFamily: 'serif', fontWeight: 600 }}>
              Author
            </label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.author ? 'border-red-500' : 'border-[#D4A574]/30'
              } bg-black/40 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#D4A574] transition-colors placeholder-[#D4A574]/40`}
              style={{ fontFamily: 'serif' }}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="mt-1 text-red-400" style={{ fontFamily: 'serif', fontSize: '0.875rem' }}>{errors.author}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-[#D4A574] mb-2" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={`w-full px-4 py-3 border ${
                  errors.price ? 'border-red-500' : 'border-[#D4A574]/30'
                } bg-black/40 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#D4A574] transition-colors placeholder-[#D4A574]/40`}
                style={{ fontFamily: 'serif' }}
                placeholder="19.99"
              />
              {errors.price && (
                <p className="mt-1 text-red-400" style={{ fontFamily: 'serif', fontSize: '0.875rem' }}>{errors.price}</p>
              )}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-[#D4A574] mb-2" style={{ fontFamily: 'serif', fontWeight: 600 }}>
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                className={`w-full px-4 py-3 border ${
                  errors.quantity ? 'border-red-500' : 'border-[#D4A574]/30'
                } bg-black/40 text-[#F5F5DC] rounded-lg focus:outline-none focus:border-[#D4A574] transition-colors placeholder-[#D4A574]/40`}
                style={{ fontFamily: 'serif' }}
                placeholder="10"
              />
              {errors.quantity && (
                <p className="mt-1 text-red-400" style={{ fontFamily: 'serif', fontSize: '0.875rem' }}>{errors.quantity}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[#D4A574]/30 text-[#D4A574] bg-black/40 rounded-lg hover:bg-black/60 transition-colors"
              style={{ fontFamily: 'serif', fontWeight: 600 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#8B6914] to-[#D4A574] hover:from-[#D4A574] hover:to-[#F4E4C1] text-black rounded-lg transition-all shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'serif', fontWeight: 600 }}
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
