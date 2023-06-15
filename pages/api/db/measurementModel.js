import mongoose from "mongoose";

const Schema = mongoose.Schema;
const measurementSchema = new Schema({
  client_name: { type: String },
  client_Tel: { type: String },
  client_location: { type: String },
  photos: { type: Array },
  material: { type: Array },
  chest: { type: Number },
  waist: { type: Number },
  hip: { type: Number },
  thigh: { type: Number },
  neck: { type: Number },
  inseam: { type: Number },
  sleeve: { type: Number },
  description: { type: String },
  uuid: {
    type: String,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: String },
});

/**
 * This is the middleware, It will be called before saving any record
 */
// Uk
// lets export it, so we can import it in other files.
export const Measurement =
  mongoose.models.Measurement ||
  mongoose.model("Measurement", measurementSchema);
