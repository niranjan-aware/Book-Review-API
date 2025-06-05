import express from "express";
import {
  addBook,
  getAllBooks,
  searchBooks,
  addReview,
  updateReview,
  deleteReview
} from "../controllers/bookCRUD.controller.js";

import {protectRoute} from '../middleware/auth.middleware.js'

const router = express.Router();

router.post("/books", protectRoute, addBook);
router.get("/books", protectRoute, getAllBooks);
router.get("/search", protectRoute, searchBooks);
router.post("/books/:id/reviews", protectRoute, addReview);
router.put("/reviews/:id", protectRoute, updateReview);
router.delete("/reviews/:id", protectRoute, deleteReview);

export default router;