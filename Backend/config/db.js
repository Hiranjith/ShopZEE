import mongoose from "mongoose";

const connectDB = async () => {
   try {

      console.error("DB_URI_TYPE:", typeof process.env.MONGO_URI);
      console.error("DB_URI_VALUE:", process.env.MONGO_URI);
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Successfully connected to the database 😁");


   } catch (error) {
      console.error(`ERROR :  ${error.message}`);
      process.exit(1)
   }
}

export default connectDB;