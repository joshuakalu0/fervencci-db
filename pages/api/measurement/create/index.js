import { Measurement } from "./../../db/measurementModel";
import connectDB from "./../../auth/lib/connectDB";

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
    try {
      const data = await Measurement.create(req.body);
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
