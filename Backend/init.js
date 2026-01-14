import dotenv from 'dotenv';
import path from 'path';

console.error("DEBUG: Loading .env from init.js");
dotenv.config();
console.error("DEBUG: MONGO_URI in init.js is", process.env.MONGO_URI ? "DEFINED" : "UNDEFINED");

// Import index.js dynamically to ensure it runs after dotenv
import('./index.js').catch(err => console.error(err));
