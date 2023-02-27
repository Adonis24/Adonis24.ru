import mongoose, { mongo } from "mongoose";
const { ObjectId } = mongoose.Schema;
const reviewSchema = new mongoose.Schema({

  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: true,
  },
  style: {
    color: String,
    image: String,
  },
  
  images: [],
  likes: [],
});
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    client: {
      type: ObjectId,
      required: true,
      ref: "Client"
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      //lowercase: true,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    images:[],
    details: [
      {
        name: String,
        value: String,
      },
    ],

    reviews: [reviewSchema],

  },
  {
    timestamps: true,
  }
);
const Project =
mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

/*
  reviewBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
        reviews: [reviewSchema],
*/