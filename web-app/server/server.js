// server.js

// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // For handling Cross-Origin Resource Sharing

// --- Import Route Files ---
// These imports assume your route files are located in a 'routes' directory
// and export their respective routers as default.
import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/authRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; // Assuming you have an upload route based on your structure

// --- Import Middleware Files ---
// These imports assume your middleware files are located in a 'middleware' directory
// and export the functions as named exports.
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { protect } from './middleware/authMiddleware.js'; // Assuming 'authMiddleware.js' has a 'protect' function for authentication

// Load environment variables from .env file
dotenv.config();

// --- MongoDB Connection ---
// This function establishes a connection to your MongoDB database.
// It expects the MongoDB URI to be available as an environment variable (e.g., MONGO_URI).
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are recommended to avoid deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // No longer needed in Mongoose 6+
      // useFindAndModify: false, // No longer needed in Mongoose 6+
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Call the database connection function
connectDB();

// Initialize the Express application
const app = express();

// --- Core Middleware ---

// Enable CORS for all origins (you might want to restrict this in production)
app.use(cors());

// Body parser middleware for JSON data
// This allows Express to parse incoming request bodies with JSON payloads.
app.use(express.json());

// Body parser middleware for URL-encoded data
// This allows Express to parse incoming request bodies with URL-encoded payloads,
// typically from HTML forms. `extended: false` uses the querystring library,
// while `extended: true` uses the qs library (more powerful).
app.use(express.urlencoded({ extended: false }));

// --- API Routes ---
// Mount your imported routers to specific base paths.
// Clients will access these routes like:
// - /api/ai/...
// - /api/auth/...
// - /api/quotations/...
// - /api/testimonials/...
// - /api/uploads/... (if you have one)

app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/uploads', uploadRoutes); // Example: for file uploads

// --- Public Route ---
// A simple root route to confirm the API is running.
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Error Handling Middleware ---
// These middleware functions should be placed after all your routes.
// They catch any requests that fall through (404) or any errors that occur
// during request processing.

// Middleware for handling 404 Not Found errors
// If a request reaches this point, it means no route handled the request.
app.use(notFound);

// General error handling middleware
// This catches any errors thrown by previous middleware or route handlers.
app.use(errorHandler);

// --- Server Startup ---
// Define the port to listen on. It first tries to use the PORT environment variable,
// otherwise defaults to 5000.
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
