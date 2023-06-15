import { User } from "./../../db/userModel";
import connectDB from "./../../auth/lib/connectDB";
import bcrypt from "bcrypt";

connectDB();
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};

export default async function handler(req, res) {
  if (req.method == "POST") {
    let salt = await bcrypt.genSalt(10);
    let newpassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = newpassword;
    try {
      const data = await User.create(req.body);
      res.status(200).json({ status: "successful", data });
    } catch (error) {
      res.status(400).json({ status: "an error occured", err });
    }
  }
  res.status(405).json({
    status: "Failed",
    error: "invalid method used",
  });
}
