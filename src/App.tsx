import { useState, useEffect } from 'react';
import { BookList } from './components/BookList';
import { AddBookModal } from './components/AddBookModal';
import { EditBookModal } from './components/EditBookModal';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { SeshatChat } from './components/SeshatChat';
import { SeshatButton } from './components/SeshatButton';
import { SplashScreen } from './components/SplashScreen';
import { Book } from './types/book';
import { Plus } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(true); // Start with mock data
  const [isSeshatOpen, setIsSeshatOpen] = useState(false);

  // API base URL - Set to false to use mock data, or your Flask backend URL
  const API_URL = 'http://localhost:5000';

  // Mock data for demo purposes
  const getMockBooks = (): Book[] => [
    {
      id: 1,
      isbn: '978-0-7475-3269-9',
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      price: 19.99,
      quantity: 15
    },
    {
      id: 2,
      isbn: '978-0-544-00341-5',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      price: 14.99,
      quantity: 8
    },
    {
      id: 3,
      isbn: '978-0-345-39180-3',
      title: 'The Lion, the Witch and the Wardrobe',
      author: 'C.S. Lewis',
      price: 12.99,
      quantity: 12
    },
    {
      id: 4,
      isbn: '978-0-141-43951-8',
      title: '1984',
      author: 'George Orwell',
      price: 13.99,
      quantity: 20
    },
    {
      id: 5,
      isbn: '978-0-06-112008-4',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 15.99,
      quantity: 3
    },
    {
      id: 6,
      isbn: '978-0-316-76948-0',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      price: 11.99,
      quantity: 7
    },
    {
      id: 7,
      isbn: '978-1-885395-00-2',
      title: 'The Emerald Tablets',
      author: 'Hermes Trismegistus',
      price: 24.99,
      quantity: 6
    },
    {
      id: 8,
      isbn: '978-1-932073-20-8',
      title: 'The Way of the Peaceful Warrior',
      author: 'Dan Millman',
      price: 16.99,
      quantity: 10
    },
    {
      id: 9,
      isbn: '978-1-57731-480-6',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      price: 18.99,
      quantity: 14
    },
    {
      id: 10,
      isbn: '978-0-06-025665-3',
      title: 'The Giving Tree',
      author: 'Shel Silverstein',
      price: 17.99,
      quantity: 12
    },
    {
      id: 11,
      isbn: '978-0-06-025667-7',
      title: 'Where the Sidewalk Ends',
      author: 'Shel Silverstein',
      price: 19.99,
      quantity: 8
    },
    {
      id: 12,
      isbn: '978-1-5445-0258-3',
      title: 'Can\'t Hurt Me',
      author: 'David Goggins',
      price: 26.99,
      quantity: 15
    },
    {
      id: 13,
      isbn: '978-0-87220-633-9',
      title: 'Five Dialogues',
      author: 'Plato',
      price: 16.99,
      quantity: 10
    },
    {
      id: 14,
      isbn: '978-1-4516-7331-9',
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      price: 15.99,
      quantity: 7
    },
    {
      id: 15,
      isbn: '978-0-440-17800-4',
      title: 'Shogun',
      author: 'James Clavell',
      price: 22.99,
      quantity: 5
    },
    {
      id: 16,
      isbn: '978-0-517-88726-2',
      title: 'Fingerprints of the Gods',
      author: 'Graham Hancock',
      price: 20.99,
      quantity: 9
    },
    {
      id: 17,
      isbn: '978-0-7434-7712-3',
      title: 'Hamlet',
      author: 'William Shakespeare',
      price: 9.99,
      quantity: 18
    },
    {
      id: 18,
      isbn: '978-0-440-35510-1',
      title: 'Man and His Symbols',
      author: 'Carl Jung',
      price: 19.99,
      quantity: 11
    },
    {
      id: 19,
      isbn: '978-0-8070-1427-1',
      title: 'Man\'s Search for Meaning',
      author: 'Viktor Frankl',
      price: 14.99,
      quantity: 4
    },
    {
      id: 20,
      isbn: '978-0-06-231609-7',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      price: 21.99,
      quantity: 13
    },
    {
      id: 21,
      isbn: '978-0-451-19114-3',
      title: 'Atlas Shrugged',
      author: 'Ayn Rand',
      price: 25.99,
      quantity: 6
    },
    // Harry Potter Series
    {
      id: 22,
      isbn: '978-0-439-13959-7',
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      price: 19.99,
      quantity: 14
    },
    {
      id: 23,
      isbn: '978-0-439-13635-0',
      title: 'Harry Potter and the Prisoner of Azkaban',
      author: 'J.K. Rowling',
      price: 20.99,
      quantity: 12
    },
    {
      id: 24,
      isbn: '978-0-439-13959-8',
      title: 'Harry Potter and the Goblet of Fire',
      author: 'J.K. Rowling',
      price: 22.99,
      quantity: 10
    },
    {
      id: 25,
      isbn: '978-0-439-35806-4',
      title: 'Harry Potter and the Order of the Phoenix',
      author: 'J.K. Rowling',
      price: 24.99,
      quantity: 9
    },
    {
      id: 26,
      isbn: '978-0-439-78454-2',
      title: 'Harry Potter and the Half-Blood Prince',
      author: 'J.K. Rowling',
      price: 21.99,
      quantity: 11
    },
    {
      id: 27,
      isbn: '978-0-545-01022-1',
      title: 'Harry Potter and the Deathly Hallows',
      author: 'J.K. Rowling',
      price: 23.99,
      quantity: 13
    },
    // Twilight Saga
    {
      id: 28,
      isbn: '978-0-316-01584-4',
      title: 'Twilight',
      author: 'Stephenie Meyer',
      price: 18.99,
      quantity: 16
    },
    {
      id: 29,
      isbn: '978-0-316-16017-9',
      title: 'New Moon',
      author: 'Stephenie Meyer',
      price: 18.99,
      quantity: 14
    },
    {
      id: 30,
      isbn: '978-0-316-16028-5',
      title: 'Eclipse',
      author: 'Stephenie Meyer',
      price: 19.99,
      quantity: 12
    },
    {
      id: 31,
      isbn: '978-0-316-06792-8',
      title: 'Breaking Dawn',
      author: 'Stephenie Meyer',
      price: 20.99,
      quantity: 15
    }
  ];

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    
    if (useMockData) {
      // Use mock data for demo
      setTimeout(() => {
        const mockBooks = getMockBooks();
        setBooks(mockBooks);
        setFilteredBooks(mockBooks);
        setLoading(false);
      }, 500); // Simulate loading
      return;
    }

    // Try to fetch from real backend
    try {
      const response = await fetch(`${API_URL}/books`);
      if (!response.ok) throw new Error('Backend not available');
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      // Fallback to mock data if backend fails
      console.warn('Could not connect to backend, using mock data');
      setUseMockData(true);
      const mockBooks = getMockBooks();
      setBooks(mockBooks);
      setFilteredBooks(mockBooks);
    } finally {
      setLoading(false);
    }
  };

  // Add a new book
  const addBook = async (bookData: Omit<Book, 'id'>) => {
    if (useMockData) {
      // Mock data mode
      const newBook = { ...bookData, id: Date.now() };
      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      setIsAddModalOpen(false);
      return;
    }

    // Real backend mode
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) throw new Error('Failed to add book');
      const newBook = await response.json();
      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book to backend. Please check if your Flask server is running.');
    }
  };

  // Update a book
  const updateBook = async (id: number, bookData: Omit<Book, 'id'>) => {
    if (useMockData) {
      // Mock data mode
      const updatedBooks = books.map((book) =>
        book.id === id ? { ...bookData, id } : book
      );
      setBooks(updatedBooks);
      const filtered = updatedBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery)
      );
      setFilteredBooks(searchQuery ? filtered : updatedBooks);
      setEditingBook(null);
      return;
    }

    // Real backend mode
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) throw new Error('Failed to update book');
      const updatedBook = await response.json();
      const updatedBooks = books.map((book) =>
        book.id === id ? updatedBook : book
      );
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery)
      ));
      setEditingBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book. Please check if your Flask server is running.');
    }
  };

  // Delete a book
  const deleteBook = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    if (useMockData) {
      // Mock data mode
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks.filter(book => 
        !searchQuery || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery)
      ));
      return;
    }

    // Real backend mode
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete book');
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      setFilteredBooks(updatedBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book. Please check if your Flask server is running.');
    }
  };

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.includes(query)
    );
    setFilteredBooks(filtered);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        {/* Base space gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-black"></div>
        
        {/* Animated nebula clouds */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[110px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        </div>

        {/* Starfield layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>

        {/* Subtle cosmic dust */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoNTAwdjUwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        
        {/* Shooting stars occasionally */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="shooting-star"></div>
          <div className="shooting-star" style={{ animationDelay: '5s', top: '30%' }}></div>
          <div className="shooting-star" style={{ animationDelay: '12s', top: '60%' }}></div>
        </div>
      </div>

      <div className="relative z-10">
        <Header searchQuery={searchQuery} onSearch={handleSearch} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mode Toggle */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => {
                setUseMockData(!useMockData);
                setBooks([]);
                setFilteredBooks([]);
                setTimeout(() => fetchBooks(), 100);
              }}
              className={`px-4 py-2 rounded-lg transition-all shadow-lg backdrop-blur-sm border-2 ${
                useMockData
                  ? 'bg-blue-500/20 text-blue-200 border-blue-400/50 hover:bg-blue-500/30'
                  : 'bg-green-500/20 text-green-200 border-green-400/50 hover:bg-green-500/30'
              }`}
            >
              {useMockData ? '📚 Demo Mode (Mock Data)' : '🔌 Connected to Backend'}
            </button>
          </div>

          <Stats books={books} />
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-white drop-shadow-lg">Book Collection</h2>
              <p className="text-purple-200 mt-1">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-purple-400/30"
            >
              <Plus size={20} />
              Add New Book
            </button>
          </div>

          <BookList
            books={filteredBooks}
            loading={loading}
            onEdit={setEditingBook}
            onDelete={deleteBook}
          />
        </main>
      </div>

      {isAddModalOpen && (
        <AddBookModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={addBook}
        />
      )}

      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onUpdate={updateBook}
        />
      )}

      {/* Seshat AI Assistant */}
      <SeshatButton onClick={() => {
        console.log('Opening Seshat chat, current state:', isSeshatOpen);
        setIsSeshatOpen(!isSeshatOpen);
      }} />
      <SeshatChat 
        books={books} 
        isOpen={isSeshatOpen} 
        onClose={() => {
          console.log('Closing Seshat chat');
          setIsSeshatOpen(false);
        }} 
      />
    </div>
  );
}
