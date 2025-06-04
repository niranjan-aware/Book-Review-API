import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useBookStore = create((set, get) => ({
  books: [],

  addBook: async() =>{},

  fetchBooks: async() =>{},

  fetchBookById: async() =>{},

  searchBooks: async() =>{},
}));