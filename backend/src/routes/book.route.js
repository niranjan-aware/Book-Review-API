import express from "express";
import {
  addBook,
  getAllBooks,
  searchBooks,
} from "../controllers/bookCRUD.controller.js";

const router = express.Router();

router.post("/books", addBook);
router.get("/books", getAllBooks);
router.get("/search", searchBooks);

export default router;