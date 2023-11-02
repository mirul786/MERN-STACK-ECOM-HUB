import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import ProductRoutes from "./routes/productRoute.js";
import cors from "cors";
import path from "path";

//configure dotenv
dotenv.config();

//config mongodb
connectDB();

// rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", ProductRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// PORT

const PORT = process.env.PORT || 8080;

// listent to port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
