import { User } from "../../db/userModel";
import connectDB from "../../auth/lib/connectDB";
connectDB();

export default async function handler(req, res) {
  if (req.method == "GET") {
    console.log(req.query);
    try {
      let data = "";
      if (req.query.by === "email") {
        data = await User.findOne({ email: req.query.email });
      } else {
        data = await User.findById(req.query.id);
      }

      res.status(200).json({ status: "successful", data });
    } catch (error) {
      const erro = requestError(error);
      res.status(400).json({ status: "an error occured", error: erro });
    }
  }
  res.status(405).json({
    status: "Failed",
    error: "invalid method used",
  });
}

function requestError(err) {
  if (err.kind == "ObjectId" && err.path == "_id") {
    return "Delete operation failed, invalid record id";
  }
  return "An Error occured please reload and try again, if persist contact developer";
}
