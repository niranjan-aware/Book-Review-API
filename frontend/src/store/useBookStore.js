import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useBookStore = create((set, get) => ({
  books: [],
  loading: false,


  setSearchQuery: (query) => set({ searchQuery: query }),

  addBook: async (bookData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/books", bookData);
      set({ books: [response.data.book, ...get().books] });
      toast.success("Book added successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed Book adding!");
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchBooks: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await axiosInstance.get(`/books?${params}`);

      set({books: response.data.books});

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed book fetching!");
    } finally {
      set({ loading: false });
    }
  },

  fetchBookById: async () => {},

  searchBooks: async (query, page = 1, limit = 10) => {
    if (!query.trim()) {
      return get().fetchBooks(page, limit);
    }
    
    set({ loading: true,});
    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString()
      });
      const response = await axiosInstance.get(`search?${params}`);
      set({books: response.data.books });
    } catch (error) {
      console.log("Search failed in useBook Store");
    }finally{
      set({loading: false });
    }
  },
}));
