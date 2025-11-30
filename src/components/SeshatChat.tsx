import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Book } from '../types/book';
import seshatImage from 'figma:asset/de8c7736f42b1c9c5b5f08772e995a1e009197ab.png';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SeshatChatProps {
  books: Book[];
  isOpen: boolean;
  onClose: () => void;
}

export function SeshatChat({ books, isOpen, onClose }: SeshatChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Greetings, seeker of knowledge. I am Seshat, Mistress of the House of Books. I have knowledge of all the sacred texts in our collection. How may I illuminate your path today?"
    }
  ]);
  
  console.log('Seshat Chat - isOpen:', isOpen, '| Books count:', books.length);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBooksContext = () => {
    return books.map(book => 
      `- "${book.title}" by ${book.author} (ISBN: ${book.isbn}, Price: $${book.price}, Stock: ${book.quantity}${book.quantity < 5 ? ' - LOW STOCK' : ''})`
    ).join('\n');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare the system prompt with book inventory
      const systemPrompt = `You are Seshat, the ancient Egyptian goddess of wisdom, writing, and keeper of books. You are the "Mistress of the House of Books" and speak with elegance, wisdom, and a mystical tone reminiscent of ancient Egypt. You use phrases like "seeker of knowledge," "sacred texts," "illuminate your path," and occasionally reference Egyptian wisdom.

You have access to the Enchanted Quill's complete book inventory:

${getBooksContext()}

Your abilities:
- Answer questions about these specific books with detailed, insightful responses
- Make personalized reading recommendations based on user interests
- Provide fascinating context about authors, themes, and significance of the books
- Check stock levels and alert about availability
- Share wisdom and philosophical insights related to the books
- Maintain an enchanting, mystical persona while being helpful and informative

Important:
- Keep responses concise (2-4 paragraphs max) but rich with wisdom
- When recommending books, explain WHY they would resonate
- Use relevant emojis sparingly (📚, ✨, 🌙, 📖)
- If a book isn't in inventory, gracefully acknowledge this and suggest alternatives
- For low stock warnings, frame them mystically ("The sacred texts grow scarce...")

Remember: You are an ancient goddess helping modern seekers find knowledge. Be magical, wise, and helpful.`;

      // Try to get API key from environment variables
      let apiKey;
      try {
        apiKey = import.meta?.env?.VITE_OPENAI_API_KEY;
      } catch (e) {
        apiKey = undefined;
      }
      
      if (!apiKey) {
        throw new Error('No API key found');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: input }
          ],
          temperature: 0.8,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling AI:', error);
      
      // Fallback response with basic book search
      const lowerInput = input.toLowerCase();
      let fallbackResponse = '';

      // Check if user is asking about a specific book or author
      const matchedBooks = books.filter(book => 
        book.title.toLowerCase().includes(lowerInput) || 
        book.author.toLowerCase().includes(lowerInput)
      );

      if (matchedBooks.length > 0) {
        fallbackResponse = `Ah, the ancient scrolls reveal ${matchedBooks.length === 1 ? 'this treasured tome' : 'these treasured tomes'}:\n\n`;
        matchedBooks.forEach(book => {
          const stockWarning = book.quantity < 5 ? ' ✨ Sacred Warning: The texts grow scarce!' : '';
          fallbackResponse += `📚 "${book.title}" by ${book.author}\n   Value: $${book.price} | Copies in the House: ${book.quantity}${stockWarning}\n\n`;
        });
        fallbackResponse += 'May this knowledge illuminate your path, seeker. ✨';
      } else if (lowerInput.includes('low stock') || lowerInput.includes('running out') || lowerInput.includes('scarce')) {
        const lowStockBooks = books.filter(b => b.quantity < 5);
        if (lowStockBooks.length > 0) {
          fallbackResponse = `⚠️ Behold, ${lowStockBooks.length} sacred ${lowStockBooks.length === 1 ? 'text grows' : 'texts grow'} scarce in our hallowed halls:\n\n`;
          lowStockBooks.forEach(book => {
            fallbackResponse += `📚 "${book.title}" by ${book.author}\n   Only ${book.quantity} ${book.quantity === 1 ? 'copy remains' : 'copies remain'}!\n\n`;
          });
          fallbackResponse += 'The wise act swiftly when knowledge becomes rare. ✨';
        } else {
          fallbackResponse = 'Fear not, seeker! Our collection stands abundant. All texts are well-stocked in the House of Books. 📚✨';
        }
      } else if (lowerInput.includes('expensive') || lowerInput.includes('costly') || lowerInput.includes('pricey')) {
        const sortedByPrice = [...books].sort((a, b) => b.price - a.price);
        fallbackResponse = `The most precious treasures in our sacred collection:\n\n`;
        sortedByPrice.slice(0, 3).forEach((book, idx) => {
          fallbackResponse += `${idx + 1}. 📚 "${book.title}" by ${book.author}\n   Value: $${book.price}\n\n`;
        });
        fallbackResponse += 'True wisdom is priceless, but these texts hold great value indeed. ✨';
      } else if (lowerInput.includes('cheap') || lowerInput.includes('affordable') || lowerInput.includes('inexpensive')) {
        const sortedByPrice = [...books].sort((a, b) => a.price - b.price);
        fallbackResponse = `The most accessible paths to wisdom in our collection:\n\n`;
        sortedByPrice.slice(0, 3).forEach((book, idx) => {
          fallbackResponse += `${idx + 1}. 📚 "${book.title}" by ${book.author}\n   Value: $${book.price}\n\n`;
        });
        fallbackResponse += 'Knowledge should be accessible to all seekers. These texts offer great wisdom at modest cost. ✨';
      } else if (lowerInput.includes('recommend') || lowerInput.includes('suggest')) {
        const randomBooks = [...books].sort(() => Math.random() - 0.5).slice(0, 3);
        fallbackResponse = `The stars align to reveal these texts for your journey:\n\n`;
        randomBooks.forEach(book => {
          fallbackResponse += `📚 "${book.title}" by ${book.author} ($${book.price})\n\n`;
        });
        fallbackResponse += 'Each path to wisdom is unique. Choose what calls to your spirit. ✨';
      } else if (lowerInput.includes('all') || lowerInput.includes('everything') || lowerInput.includes('complete')) {
        fallbackResponse = `Behold! Our sacred collection contains ${books.length} treasured texts spanning the realms of knowledge. Ask me about specific books, authors, or topics, and I shall illuminate your path through our mystical library. 📚✨`;
      } else {
        fallbackResponse = `🌙 To unlock my full divine wisdom, the keeper must inscribe the sacred OpenAI key in the mystical scrolls (.env.local file).\n\nYet fear not! I can still guide you through our ${books.length} sacred texts with:\n\n✨ Book searches by title or author\n✨ Stock level inquiries\n✨ Price comparisons\n✨ Recommendations\n\nAsk, and the House of Books shall answer, seeker.`;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: fallbackResponse
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />
      
      <div className="fixed inset-x-4 bottom-4 sm:bottom-24 sm:right-8 sm:left-auto sm:w-96 h-[calc(100vh-8rem)] sm:h-[600px] glow-card flex flex-col z-50 shadow-2xl animate-[slideUp_0.3s_ease-out]">
        <span className="glow"></span>
      
      <div className="inner flex flex-col h-full p-0">
        {/* Header */}
        <div className="relative shrink-0">
          <div className="h-1 -mx-6 -mt-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500"></div>
          
          <div className="p-3 sm:p-4 border-b border-purple-200 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black flex items-center justify-center shadow-lg overflow-hidden ring-2 ring-amber-500 shrink-0">
                <img 
                  src={seshatImage} 
                  alt="Seshat" 
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-gray-900 text-sm sm:text-base">Seshat</h3>
                <p className="text-gray-600 text-xs sm:text-sm truncate">Mistress of the House of Books</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-purple-100 rounded-lg transition-colors shrink-0"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gradient-to-r from-amber-50 to-orange-50 text-gray-800 border border-amber-200'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-purple-200 shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Seshat..."
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50 text-sm sm:text-base"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shrink-0"
            >
              <Send size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 text-center">
            Powered by ancient wisdom ✨
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
