import { Gallery as Catalog } from "./../../db/galleryModel";
import connectDB from "./../../auth/lib/connectDB";
connectDB();

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { by, value, filter, page, limit } = req.query;
    const skip = (page - 1) * page || 0;
    const recordlimit = limit || 5;
    try {
      let regex = new RegExp(value, "i");

      const data = await Catalog.find({ [by]: { $regex: regex } })
        .skip(skip)
        .limit(recordlimit)
        .select(filter);

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
