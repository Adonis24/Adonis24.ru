import mongoose, { mongo } from "mongoose";
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
   image: {
    type: String,
    required: false,
   }
   
}
,
  {
    timestamps: true,
  }
);
const Client =  mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
// default: "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
