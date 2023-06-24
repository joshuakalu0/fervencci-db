import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { require: [true, "Username field is required"], type: String },
  firstname: { require: [true, "Firstname field is required"], type: String },
  middlename: {
    require: [true, " Middlename field is required"],
    type: String,
  },
  lastname: { require: [true, "Lastname field is required"], type: String },
  email: {
    type: String,
    require: [true, "Email field is required"],
    unique: true,
  },
  date_of_birth: {
    require: [true, "date-of-birth field is required"],
    type: String,
  },
  tel: { require: [true, "phone number field is required"], type: Number },
  password: { require: [true, "Password field is required"], type: String },
  bio: { require: [true, "bio field is required"], type: String },
  aim: { require: [true, "aim field is required"], type: String, trim: true },
  photos: { require: [true, "photo field is required"], type: Array },
  uuid: {
    type: String,
    unique: true,
  },
  is_admin: { type: Boolean, default: false },
  is_staff: { type: Boolean, default: false },
  is_readonly: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: String },
});

userSchema.pre("save", async function (next) {
  this.modifiedAt = Date.now();
  next();
});

/**
 * This is the middleware, It will be called before saving any record
 */
// Uk
// lets export it, so we can import it in other files.
export const User = mongoose.models.User || mongoose.model("User", userSchema);
