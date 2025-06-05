import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useBookStore = create((set, get) => ({
  books: [],
  loading: false,
  currentBook: null,
  reviews: [],
  error: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  addBook: async (bookData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/books", bookData);
      set({ books: [response.data.book, ...get().books] });
      toast.success("Book added successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed Book adding!");
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },

  fetchBooks: async (page = 1, limit = 10, filters = {}) => {
    set({ loading: true });
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });

      const response = await axiosInstance.get(`/books?${params}`);

      set({ books: response.data.books });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed book fetching!");
      set({
        error:
          error?.response?.data?.message || error.message || "Unknown error",
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchBookById: async (bookId, reviewPage = 1, reviewLimit = 5) => {
    set({ loading: true, error: null });
    try {
      const params = new URLSearchParams({
        page: reviewPage.toString(),
        limit: reviewLimit.toString(),
      });
      const response = await axiosInstance.get(`/books/${bookId}?${params}`);

      set({ loading: true });
      set({ currentBook: response.data });
      set({ reviews: response.data.reviews });
    } catch (error) {
      toast.error("Error in fetch by ID");
      set({
        error:
          error?.response?.data?.message || error.message || "Unknown error",
      });
    } finally {
      set({ loading: false });
    }
  },

  searchBooks: async (query, page = 1, limit = 10) => {
    if (!query.trim()) {
      return get().fetchBooks(page, limit);
    }

    set({ loading: true });
    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString(),
      });
      const response = await axiosInstance.get(`search?${params}`);
      set({ books: response.data.books});
    } catch (error) {
      toast.error("Search failed!");
      set({
        error:
          error?.response?.data?.message || error.message || "Unknown error",
      });
    } finally {
      set({ loading: false });
    }
  },

  addReview: async (bookId, reviewData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `/books/${bookId}/reviews`,
        reviewData
      );

      set((state) => ({
        reviews: [response.data.review, ...state.reviews],
        loading: false,
      }));

      await get().fetchBookById(bookId);

      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error(error?.response?.data?.message || "Error adding review");
      set({
        error:
          error?.response?.data?.message || error.message || "Unknown error",
        loading: false,
      });
    }
  },

  updateReview: async (reviewId, reviewData) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.put(`/reviews/${reviewId}`, {
        rating: reviewData.rating,
        comment: reviewData.comment,
      });

      set({ loading: true });
      const newReview = response.data.review;

      set((state) => ({
        reviews: state.reviews.map((review) =>
          review._id === reviewId ? newReview : review
        ),
      }));
      toast.success("Review updated successfully!");
    } catch (error) {
      toast.error("Error in updating review");
      set({
        error:
          error?.response?.data?.message || error.message || "Unknown error",
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteReview: async (reviewId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {},
      });
      set((state) => ({
        reviews: state.reviews.filter((review) => review._id !== reviewId),
        loading: false,
      }));
      toast.success("Review deleted successfully!");
    } catch (error) {
      toast.error("Error in deleting the review");
      set({
        error:
          error?.response?.data?.message || error.message || "Unknown error",
      });
      
    } finally {
      set({ loading: false });
    }
  },

  clearCurrentBook: () =>
    set({
      currentBook: null,
      reviews: [],
    }),

  clearError: () => set({ error: null }),
}));
