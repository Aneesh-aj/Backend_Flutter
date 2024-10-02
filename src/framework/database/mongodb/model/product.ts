import mongoose, { Schema, Model } from "mongoose";
import { Iproduct } from "../../../../entities/product";

const productSchema: Schema<Iproduct> = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  createdAt: { type: Date, default: Date.now } 
});

const productModel: Model<Iproduct> = mongoose.model('product', productSchema);
export default productModel;
