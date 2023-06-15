import mongoose from "mongoose";

const Schema = mongoose.Schema;
const catalogSchema = new Schema({
  design_name: {
    type: String,
    require: [true, "design_name field is required"],
  },
  description: {
    type: String,
    require: [true, "description field is required"],
  },
  photos: { type: Array, require: [true, "images field is required"] },
  thumbnail: { type: Array },
  uuid: {
    type: String,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: String },
});

catalogSchema.pre("save", function (next) {
  if (this.photos.length != 0) {
    this.thumbnail = [this.photos[0]];
  }

  this.modifiedAt = Date.now();
  next();
});
/**
 * This is the middleware, It will be called before saving any record
 */
// Uk
// lets export it, so we can import it in other files.
export const Catalog =
  mongoose.models.Catalog || mongoose.model("Catalog", catalogSchema);
