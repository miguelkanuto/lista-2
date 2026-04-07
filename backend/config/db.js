import mongoose from "mongoose";
import "dotenv/config";

const senha = process.env.SENHA;

// const URL = `mongodb+srv://miguelkanuto20_db_user:${senha}@cluster0.5wijnhu.mongodb.net/todolist?retryWrites=true&w=majority`;
const URL = `mongodb://localhost:27017/todolist`;

const connectDB = () => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.error("Database connection error:", err.message);
    });
};

export default connectDB;
