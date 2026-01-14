import dotenv from 'dotenv';
import path from 'path';

// Load from root .env (since index.js does dotenv.config() which looks in current dir).
// If we run this from Backend/, we might need to point to ../.env or run from root.
// Let's assume we run from root like `node Backend/debug_check.js`.
dotenv.config();

console.log('Current Directory:', process.cwd());
console.log('MONGO_URI type:', typeof process.env.MONGO_URI);
console.log('MONGO_URI value (masked):', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 5) + '...' : 'undefined');
console.log('AWS_ACCESS_KEY_ID exists:', !!process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_BUCKET_NAME exists:', !!process.env.AWS_BUCKET_NAME);
