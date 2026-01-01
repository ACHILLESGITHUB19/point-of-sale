import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(MONGO_URI);
          console.log(`MongoDB Atlas connected: ${conn.connection.host}`);
            } catch (error) {
                console.error(`MongoDB connection error: ${error.message}`);
                    process.exit(1);
                      }
                      };

                      export default connectDB;
                      
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { connectDB, User };

