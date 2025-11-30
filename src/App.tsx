import { useState, useEffect } from 'react';
import { BookList } from './components/BookList';
import { AddBookModal } from './components/AddBookModal';
import { EditBookModal } from './components/EditBookModal';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { SeshatChat } from './components/SeshatChat';
import { SeshatButton } from './components/SeshatButton';
import { SplashScreen } from './components/SplashScreen';
import RareMarketplace from './components/RareMarketplace';
import { Book } from './types/book';
import { Plus, Gem } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<'inventory' | 'marketplace'>('inventory');
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
      quantity: 15,
      imageUrl: 'https://prodimage.images-bn.com/pimages/9781546148500_p0_v4_s1200x1200.jpg'
    },
    {
      id: 2,
      isbn: '978-0-544-00341-5',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      price: 14.99,
      quantity: 8,
      imageUrl: 'https://bookoutlet.com/_next/image?url=https%3A%2F%2Fimages.bookoutlet.com%2Fcovers%2Flarge%2Fisbn978061%2F9780618260300-l.jpg&w=3840&q=75'
    },
    {
      id: 3,
      isbn: '978-0-345-39180-3',
      title: 'The Lion, the Witch and the Wardrobe',
      author: 'C.S. Lewis',
      price: 12.99,
      quantity: 12,
      imageUrl: 'https://store.rabbitroom.com/cdn/shop/products/516lPV5TmxL._SX334_BO1_204_203_200.jpg?v=1599253759&width=600'
    },
    {
      id: 4,
      isbn: '978-0-141-43951-8',
      title: '1984',
      author: 'George Orwell',
      price: 13.99,
      quantity: 20,
      imageUrl: 'https://bookoutlet.com/_next/image?url=https%3A%2F%2Fimages.bookoutlet.com%2Fcovers%2Flarge%2Fisbn978140%2F9781405965347-l.jpg&w=640&q=75'
    },
    {
      id: 5,
      isbn: '978-0-06-112008-4',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 15.99,
      quantity: 3,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/500px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg'
    },
    {
      id: 6,
      isbn: '978-0-316-76948-0',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      price: 11.99,
      quantity: 7,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/500px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg'
    },
    {
      id: 7,
      isbn: '978-1-885395-00-2',
      title: 'The Emerald Tablets',
      author: 'Hermes Trismegistus',
      price: 24.99,
      quantity: 6,
      imageUrl: 'https://images.booksense.com/images/149/866/9781603866149.jpg'
    },
    {
      id: 8,
      isbn: '978-1-932073-20-8',
      title: 'The Way of the Peaceful Warrior',
      author: 'Dan Millman',
      price: 16.99,
      quantity: 10,
      imageUrl: 'https://m.media-amazon.com/images/I/51IYDk0JlJL._SY445_SX342_FMwebp_.jpg'
    },
    {
      id: 9,
      isbn: '978-1-57731-480-6',
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      price: 18.99,
      quantity: 14,
      imageUrl: 'https://newworldlibrary.com/wp-content/webp-express/webp-images/uploads/2023/11/New-Power-of-Now86-993x1536.jpg.webp'
    },
    {
      id: 10,
      isbn: '978-0-06-025665-3',
      title: 'The Giving Tree',
      author: 'Shel Silverstein',
      price: 17.99,
      quantity: 12,
      imageUrl: 'https://npr.brightspotcdn.com/dims4/default/bb75182/2147483647/strip/true/crop/500x627+0+0/resize/1760x2208!/format/webp/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwwno%2Ffiles%2F202012%2FThe_Giving_Tree_1.jpg'
    },
    {
      id: 11,
      isbn: '978-0-06-025667-7',
      title: 'Where the Sidewalk Ends',
      author: 'Shel Silverstein',
      price: 19.99,
      quantity: 8,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Where_the_Sidewalk_Ends_%281974%29.jpg'
    },
    {
      id: 12,
      isbn: '978-1-5445-0258-3',
      title: 'Can\'t Hurt Me',
      author: 'David Goggins',
      price: 26.99,
      quantity: 15,
      imageUrl: 'https://prodimage.images-bn.com/pimages/9781544512273_p0_v9_s600x595.jpg'
    },
    {
      id: 13,
      isbn: '978-0-87220-633-9',
      title: 'Five Dialogues',
      author: 'Plato',
      price: 16.99,
      quantity: 10,
      imageUrl: 'https://www.gutenberg.org/cache/epub/76464/pg76464.cover.medium.jpg'
    },
    {
      id: 14,
      isbn: '978-1-4516-7331-9',
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      price: 15.99,
      quantity: 7,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/db/Fahrenheit_451_1st_ed_cover.jpg'
    },
    {
      id: 15,
      isbn: '978-0-440-17800-4',
      title: 'Shogun',
      author: 'James Clavell',
      price: 22.99,
      quantity: 5,
      imageUrl: 'https://archangelstomp.com/wp-content/uploads/2012/01/ba8ab-shogun.jpg'
    },
    {
      id: 16,
      isbn: '978-0-517-88726-2',
      title: 'Fingerprints of the Gods',
      author: 'Graham Hancock',
      price: 20.99,
      quantity: 9,
      imageUrl: 'https://m.media-amazon.com/images/I/71ejchQQRhL._SL1500_.jpg'
    },
    {
      id: 17,
      isbn: '978-0-7434-7712-3',
      title: 'Hamlet',
      author: 'William Shakespeare',
      price: 9.99,
      quantity: 18,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY8FwdPI2ip4ia5T1TINZEniH34ggFFOuI-w&s'
    },
    {
      id: 18,
      isbn: '978-0-440-35510-1',
      title: 'Man and His Symbols',
      author: 'Carl Jung',
      price: 19.99,
      quantity: 11,
      imageUrl: 'https://bookoutlet.com/_next/image?url=https%3A%2F%2Fimages.bookoutlet.com%2Fcovers%2Flarge%2Fisbn978044%2F9780440351832-l.jpg&w=640&q=75'
    },
    {
      id: 19,
      isbn: '978-0-8070-1427-1',
      title: 'Man\'s Search for Meaning',
      author: 'Viktor Frankl',
      price: 1887.77,
      quantity: 4,
      imageUrl: 'https://d3525k1ryd2155.cloudfront.net/h/795/584/1394584795.0.m.1.jpg'
    },
    {
      id: 20,
      isbn: '978-0-06-231609-7',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      price: 21.99,
      quantity: 13,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sapiens-_A_Brief_History_of_Humankind.png/330px-Sapiens-_A_Brief_History_of_Humankind.png'
    },
    {
      id: 21,
      isbn: '978-0-451-19114-3',
      title: 'Atlas Shrugged',
      author: 'Ayn Rand',
      price: 25.99,
      quantity: 6,
      imageUrl: 'https://i.ebayimg.com/images/g/i6AAAOSwIQ1iLhqq/s-l1600.webp'
    },
    // Harry Potter Series
    {
      id: 22,
      isbn: '978-0-439-13959-7',
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      price: 19.99,
      quantity: 14,
      imageUrl: 'https://i.ebayimg.com/images/g/4I0AAeSwA91oUK5L/s-l1600.webp'
    },
    {
      id: 23,
      isbn: '978-0-439-13635-0',
      title: 'Harry Potter and the Prisoner of Azkaban',
      author: 'J.K. Rowling',
      price: 20.99,
      quantity: 12,
      imageUrl: 'https://i.ebayimg.com/images/g/Z1wAAOSwIIlmRA~t/s-l1600.webp'
    },
    {
      id: 24,
      isbn: '978-0-439-13959-8',
      title: 'Harry Potter and the Goblet of Fire',
      author: 'J.K. Rowling',
      price: 22.99,
      quantity: 10,
      imageUrl: 'https://i.ebayimg.com/images/g/jewAAOSwxCdfR1E0/s-l1600.webp'
    },
    {
      id: 25,
      isbn: '978-0-439-35806-4',
      title: 'Harry Potter and the Order of the Phoenix',
      author: 'J.K. Rowling',
      price: 24.99,
      quantity: 9,
      imageUrl: 'https://thesalmonbookshop.com/cdn/shop/products/harry-potter-and-the-order-of-the-phoenix-jk-rowling-the-salmon-bookshop-ennistymon-county-clare_1024x1024.jpg?v=1608146928'
    },
    {
      id: 26,
      isbn: '978-0-439-78454-2',
      title: 'Harry Potter and the Half-Blood Prince',
      author: 'J.K. Rowling',
      price: 21.99,
      quantity: 11,
      imageUrl: 'https://m.media-amazon.com/images/I/61jLPrvDreL._SY522_.jpg'
    },
    {
      id: 27,
      isbn: '978-0-545-01022-1',
      title: 'Harry Potter and the Deathly Hallows',
      author: 'J.K. Rowling',
      price: 2168.88,
      quantity: 13,
      imageUrl: 'https://sothebys-md.brightspotcdn.com/dims4/default/c539950/2147483647/strip/true/crop/2400x2400+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F85%2F18%2F091a2b814d5582c447962f08b59f%2Fjk-rowling-deathly-hallows-signed-front.jpg'
    },
    // Twilight Saga
    {
      id: 28,
      isbn: '978-0-316-01584-4',
      title: 'Twilight',
      author: 'Stephenie Meyer',
      price: 18.99,
      quantity: 16,
      imageUrl: 'https://m.media-amazon.com/images/I/31cOZeTAIRL._SY445_SX342_FMwebp_.jpg'
    },
    {
      id: 29,
      isbn: '978-0-316-16017-9',
      title: 'New Moon',
      author: 'Stephenie Meyer',
      price: 18.99,
      quantity: 14,
      imageUrl: 'https://m.media-amazon.com/images/I/91mXSjFNdLL._SY466_.jpg'
    },
    {
      id: 30,
      isbn: '978-0-316-16028-5',
      title: 'Eclipse',
      author: 'Stephenie Meyer',
      price: 19.99,
      quantity: 12,
      imageUrl: 'https://i.ebayimg.com/images/g/jz4AAOSwZzBlkNV2/s-l1600.webp'
    },
    {
      id: 31,
      isbn: '978-0-316-06792-8',
      title: 'Breaking Dawn',
      author: 'Stephenie Meyer',
      price: 20.99,
      quantity: 15,
      imageUrl: 'https://m.media-amazon.com/images/I/51vW5YKOEiL.jpg'
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
      {/* Elegant Dark Background */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1612] via-black to-[#0a0a0a]"></div>
        
        {/* Subtle gold glow clouds */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-[#D4A574] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-[#8B6914] rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#D4A574]/50 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoNTAwdjUwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="relative z-10">
        {currentView === 'inventory' && (
          <Header searchQuery={searchQuery} onSearch={handleSearch} />
        )}
        
        {currentView === 'marketplace' ? (
          <RareMarketplace onBack={() => setCurrentView('inventory')} />
        ) : (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* View Toggle - Clean and spacious */}
            <div className="mb-6 flex justify-center">
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentView('inventory')}
                  className={`px-8 py-3 rounded-lg transition-all shadow-lg backdrop-blur-sm border flex items-center gap-2 ${
                    currentView === 'inventory'
                      ? 'bg-gradient-to-r from-[#8B6914] to-[#D4A574] text-black border-[#D4A574]'
                      : 'bg-black/40 text-[#D4A574]/80 border-[#D4A574]/20 hover:border-[#D4A574]/40'
                  }`}
                  style={{ fontFamily: 'serif', fontWeight: 600 }}
                >
                  <Plus size={20} />
                  Inventory Management
                </button>
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className={`px-8 py-3 rounded-lg transition-all shadow-lg backdrop-blur-sm border flex items-center gap-2 ${
                    currentView === 'marketplace'
                      ? 'bg-gradient-to-r from-[#8B6914] to-[#D4A574] text-black border-[#D4A574]'
                      : 'bg-black/40 text-[#D4A574]/80 border-[#D4A574]/20 hover:border-[#D4A574]/40'
                  }`}
                  style={{ fontFamily: 'serif', fontWeight: 600 }}
                >
                  <Gem size={20} />
                  Rare Marketplace
                </button>
              </div>
            </div>

            {/* Data Source Status Badge - Subtle and elegant */}
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => {
                  setUseMockData(!useMockData);
                  setBooks([]);
                  setFilteredBooks([]);
                  setTimeout(() => fetchBooks(), 100);
                }}
                className={`px-3 py-1.5 rounded-full transition-all backdrop-blur-sm border text-xs ${
                  useMockData
                    ? 'bg-[#8B6914]/10 text-[#D4A574]/90 border-[#D4A574]/30 hover:bg-[#8B6914]/20 hover:border-[#D4A574]/50'
                    : 'bg-green-900/10 text-green-400/90 border-green-400/30 hover:bg-green-900/20 hover:border-green-400/50'
                }`}
                style={{ fontFamily: 'serif', letterSpacing: '0.02em' }}
                title="Click to toggle between demo data and backend connection"
              >
                {useMockData ? '📚 Demo Mode' : '🔌 Live Backend'}
              </button>
            </div>

            <Stats books={books} />
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-[#F5F5DC] drop-shadow-lg" style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 400, letterSpacing: '0.05em' }}>Book Collection</h2>
              <p className="text-[#D4A574]/80 mt-1" style={{ fontFamily: 'serif' }}>
                {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B6914] to-[#D4A574] hover:from-[#D4A574] hover:to-[#F4E4C1] text-black rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-[#D4A574]/30"
              style={{ fontFamily: 'serif', fontWeight: 600 }}
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
        )}
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
