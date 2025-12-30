import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/POSdb";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Compass has been Connected `);
  } catch (error) {
    console.error(`MongoDB Compass Didn't Connect`);
    process.exit(1);
  }
};

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

