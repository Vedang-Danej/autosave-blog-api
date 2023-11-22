import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import blogRoutes from './routes/blogRoutes.js';

// initializes the .env file, so it can be used anywhere in the application

dotenv.config();

// connects to the mongodb database
// NOTE: After starting the server locally, please wait for some time for the
// mongoDB server to connect to the application before sending any requests.
// 'MongoDB connected' message will be shown in the console

connectDB();

const app = express();

// Cross-origin resource sharing to allow requests from a different domain

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, PATCH, GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

app.use('/api/blog', blogRoutes);

// error handler and an extra route for any endpoints that the API does not handle

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log('API is running...'));
