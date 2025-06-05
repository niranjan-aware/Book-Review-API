import React, { useState, useEffect } from "react";
import { Search, Star, Plus, Filter, X } from "lucide-react";
import { useBookStore } from "../store/useBookStore";
import AddBookModal from "../components/AddBookModal";
import BookDetailsModal from "../components/BookDetailsModel";

const Home = () => {
  const {
    books,
    loading,
    error,
    searchQuery,
    fetchBooks,
    searchBooks,
    setSearchQuery,
    clearError,
  } = useBookStore();

  const [showBookDetails, setShowBookDetails] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    author: "",
    genre: "",
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchBooks(searchInput);
      setSearchQuery(searchInput);
    } else {
      fetchBooks(1, 10, filters);
      setSearchQuery("");
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    if (searchQuery) {
      searchBooks(searchQuery, 1, 10);
    } else {
      fetchBooks(1, 10, newFilters);
    }
  };

  const clearFilters = () => {
    setFilters({ author: "", genre: "" });
    setSearchInput("");
    setSearchQuery("");
    fetchBooks();
  };

  const handlePageChange = (page) => {
    if (searchQuery) {
      searchBooks(searchQuery, page);
    } else {
      fetchBooks(page, 10, filters);
    }
  };

  const openBookDetails = (bookId) => {
    setSelectedBookId(bookId);
    setShowBookDetails(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-violet-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Review System
          </h1>
          <p className="text-gray-600">Some Assesment Features are implemented for testing purpose(add book, search book, get book, get book by ID, add review, update review, delete review,<br /> Pagination done at Backend pedning frontend integration)</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button
                onClick={() => setShowAddBook(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Book
              </button>
            </div>
          </div>
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Author
                  </label>
                  <input
                    type="text"
                    placeholder="Enter author name..."
                    value={filters.author}
                    onChange={(e) =>
                      handleFilterChange("author", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Genre
                  </label>
                  <input
                    type="text"
                    placeholder="Enter genre..."
                    value={filters.genre}
                    onChange={(e) =>
                      handleFilterChange("genre", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {(searchQuery || filters.author || filters.genre) && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {searchQuery && `Searching for: "${searchQuery}"`}
              {filters.author && ` | Author: "${filters.author}"`}
              {filters.genre && ` | Genre: "${filters.genre}"`}
            </p>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {books.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No books found</p>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg  cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => openBookDetails(book._id)}
                  >
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-2">by {book.author}</p>
                      <p className="text-sm text-gray-500 mb-3">{book.genre}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {renderStars(book.averageRating || 0)}
                        </div>
                        <span className="text-sm text-gray-600">
                          (
                          {book.averageRating
                            ? book.averageRating.toFixed(1)
                            : "0.0"}
                          )
                        </span>
                      </div>

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
      {showBookDetails && (
        <BookDetailsModal
          bookId={selectedBookId}
          onClose={() => setShowBookDetails(false)}
        />
      )}

      {showAddBook && <AddBookModal onClose={() => setShowAddBook(false)} />}
    </div>
  );
};

export default Home;
