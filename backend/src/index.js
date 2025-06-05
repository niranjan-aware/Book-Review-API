import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import bookRoutes from './routes/book.route.js'


dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api", bookRoutes);

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
