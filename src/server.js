import express from 'express';
import dotenv from 'dotenv';

//Database Configuration & Connection
import connectDB from './config/db.js';

//Error Middlewares
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

//Routes
import userRoutes from './routes/userRoutes.js';

const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is up and running...');
});

app.use('/api/v1/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT: ${PORT}`)
);
