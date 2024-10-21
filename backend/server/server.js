import express from "express";
import mongoose from "mongoose";
import adminRoutes from "../routes/adminRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", adminRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`Connected to DB!`))
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
