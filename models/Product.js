import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    details: [
      {
        name: String,
        value: String,
      },
    ],
 
  },
  {
    timestamps:true
  },

);
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
