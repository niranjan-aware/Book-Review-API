import React,{useState, useEffect} from 'react'
import { useBookStore } from '../store/useBookStore';
import AddBookModal from '../components/AddBookModal';

export default function HomePage() {
  const {loading, books, fetchBooks, searchBooks, setSearchQuery} = useBookStore();
  const [showAddBook, setShowAddBook] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchBooks(searchInput);
      setSearchQuery(searchInput);
    } else {
      fetchBooks(1, 10, filters);
      setSearchQuery('');
    }
  };

  return (
    <div className="home-container min-h-screen bg-sky-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search books by title or author..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddBook(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Book
              </button>
            </div>
            
            </div>
            </div>
            {false ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {books.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No books found</p>
                <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick="{() => openBookDetails(book._id)}"
                  >
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-2">by {book.author}</p>
                      <p className="text-sm text-gray-500 mb-3">{book.genre}</p>
                      
                      
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-green-600">
                          ${book.price}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            
          </>
        )}
          
      </div>
      {showAddBook && (
        <AddBookModal
          onClose={() => setShowAddBook(false)}
        />
      )}
    </div>
  )
}
