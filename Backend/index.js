//packages
import path from 'path'
import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
//utils
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors';


dotenv.config()
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

// Allow requests from the frontend during development
const allowedOrigins = [
    'http://127.0.0.1:5173', // Dev frontend
    'https://shop-zee-git-main-hiranjiths-projects.vercel.app/', // Production frontend
  ];
  
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    })
  );
  


app.get('/', (req, res) => {
    res.send('Welcome to the ShopZEE API');
  });
  
app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => {
    res.send({clientId : process.env.PAYPAL_CLIENT_ID})
})

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use('/api/upload', uploadRoutes)


app.listen(port, ()=> console.log(`Server running on port ${port}`));