import express from "express";
import multer from "multer";
import s3 from '../config/s3.js'; 
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage(); // Store the file in memory before uploading to S3

const upload = multer({ storage }); // Use the memoryStorage for multer


router.post('/', upload.single('image'), async (req, res) => {
    const file = req.file;
  
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
  
    // Set parameters for the S3 upload
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Bucket name from .env
      Key: `uploads/${Date.now()}-${file.originalname}`, // Unique file name
      Body: file.buffer, // File content
      ContentType: file.mimetype, // File type
      ACL: 'public-read', // Public access for the file
    };
  
    try {
      // Upload file to S3
      const result = await s3.upload(params).promise();
      console.log('File received:', file);
      console.log('Uploading to S3 with params:', params);
      // Return the public URL of the uploaded image
      res.status(200).json({
        message: 'Your image is uploaded',
        image: result.Location, // Publicly accessible URL
      });
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      res.status(500).json({ message: 'Error uploading file.' });
    }
  });
  
  export default router;