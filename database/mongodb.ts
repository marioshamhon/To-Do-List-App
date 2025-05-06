import mongoose from "mongoose";
import { DBConnectionURL } from "../config/env";

if (!DBConnectionURL) {
  throw new Error("MongoDB connection url not found");
}

const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(DBConnectionURL);
    console.log("connected to the database");
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default ConnectToDatabase;
