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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <BookPlus size={24} />
            </div>
            <div>
              <h2 className="text-white flex items-center gap-2">
                Add New Book
                <Sparkles size={20} className="animate-pulse" />
              </h2>
              <p className="text-purple-100">
                Add a magical tome to your collection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="isbn" className="block text-gray-700 mb-2">
              ISBN
            </label>
            <input
              id="isbn"
              type="text"
              value={formData.isbn}
              onChange={(e) => handleChange('isbn', e.target.value)}
              className={`w-full px-4 py-3 border-2 ${
                errors.isbn ? 'border-red-300' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:border-purple-500 transition-colors`}
              placeholder="978-0-7475-3269-9"
            />
            {errors.isbn && (
              <p className="mt-1 text-red-600">{errors.isbn}</p>
            )}
          </div>

          <div>
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full px-4 py-3 border-2 ${
                errors.title ? 'border-red-300' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:border-purple-500 transition-colors`}
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="mt-1 text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="author" className="block text-gray-700 mb-2">
              Author
            </label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              className={`w-full px-4 py-3 border-2 ${
                errors.author ? 'border-red-300' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:border-purple-500 transition-colors`}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="mt-1 text-red-600">{errors.author}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={`w-full px-4 py-3 border-2 ${
                  errors.price ? 'border-red-300' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:border-purple-500 transition-colors`}
                placeholder="19.99"
              />
              {errors.price && (
                <p className="mt-1 text-red-600">{errors.price}</p>
              )}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-gray-700 mb-2">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                className={`w-full px-4 py-3 border-2 ${
                  errors.quantity ? 'border-red-300' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:border-purple-500 transition-colors`}
                placeholder="10"
              />
              {errors.quantity && (
                <p className="mt-1 text-red-600">{errors.quantity}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
