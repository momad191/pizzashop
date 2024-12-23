import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  street_name: { type: String, required: true },
  street_no: { type: String, required: true },
  block: { type: String, required: true },
  floor: { type: String, required: true },
  apt_no: { type: String, required: true },
  mentions: { type: String, default: "" },
  total: { type: Number, required: true },
  status: { type: String, default: "new" }, //delivered  //received
  delivery_rep_name: { type: String, default: "" },
  date: {
    type: Date,
    default: Date.now,
  },
  cart: [],
});

export const Order =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);
