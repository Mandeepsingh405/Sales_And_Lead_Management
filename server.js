import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; 
import salesReportRoutes from './routes/salesReport.js';
import taxationRoutes from './routes/taxation.js';
import currencyRevenueRoutes from './routes/currencyRevenue.js';
import buyerLocationRoutes from './routes/buyerLocation.js';
import referralSalesRoutes from './routes/referralSales.js';
import productPerformanceRoutes from './routes/productPerformance.js';
import customerRoutes from "./routes/customerRoutes.js";
import salesRoutes from "./routes/saleRoutes.js";
import bodyParser from "body-parser";
import leadRoutes from './routes/leadRoutes.js';
import productRoutes from "./Routes/productRoutes.js";





dotenv.config();
const app = express();

// Database Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

// routes
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes); //sign in and sign up
app.use('/api/sales-reports', salesReportRoutes);
app.use('/api/taxation', taxationRoutes);
app.use('/api/currency-revenue', currencyRevenueRoutes);
app.use('/api/buyer-density', buyerLocationRoutes);
app.use('/api/referral-sales', referralSalesRoutes);
app.use('/api/product-performance', productPerformanceRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);
app.use('/api/leads', leadRoutes);
app.use("/api", productRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Server Running on Port ${PORT}`);
});
