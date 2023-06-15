import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // if (mongoose.connections[0]) {
    //   console.log("already connected");
    //   console.log(mongoose.connections);
    //   return;
    // }
    const url = process.env.MONGODB_URI;
    try {
      const connect = await mongoose.connect(url);
    } catch (error) {
      console.log(error);
    }

    return;
  } catch (error) {
    console.log("error occured while trying to connect to mongodb");
  }
};
export default connectDB;
