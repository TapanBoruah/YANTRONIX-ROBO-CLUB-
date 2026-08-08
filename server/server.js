import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yantronix';

app.use(cors());
app.use(express.json());


app.use('/api', apiRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
  res.send('Yantronix API Server is running.');
});


console.log(`Connecting to MongoDB at: ${mongoURI}`);
mongoose.connect(mongoURI, { family: 4 })
  .then(() => {
    console.log('MongoDB Connected Successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
