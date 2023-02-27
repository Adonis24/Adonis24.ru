import nc from "next-connect";
import db from "../../../../utils/db";
import Project from "../../../../models/Project";
import auth from "../../../../middleware/auth";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const project = await Project.findById(req.query.id);
    if (project) {
      const exist = project.reviews.find(
        (x) => x.reviewBy.toString() == req.user
      );
      if (exist) {
        await Project.updateOne(
          {
            _id: req.query.id,
            "reviews._id": exist._id,
          },
          {
            $set: {
              "reviews.$.review": req.body.review,
              "reviews.$.images": req.body.images,
     
            },
          },
          {
            new: true,
          }
        );

        const updatedProject = await Project.findById(req.query.id);
        updatedProject.numReviews = updatedProject.reviews.length;
        updatedProject.rating =
        updatedProject.reviews.reduce((a, r) => r.rating + a, 0) /
        updatedProject.reviews.length;
        await updatedProject.save();
        await updatedProject.populate("reviews.reviewBy");
        await db.disconnectDb();
        return res
          .status(200)
          .json({ reviews: updatedProject.reviews.reverse() });
      } else {
        const review = {
          reviewBy: req.user,
          rating: req.body.rating,
          review: req.body.review,
          images: req.body.images,
        };
        project.reviews.push(review);
        project.numReviews = project.reviews.length;
        project.rating =
        project.reviews.reduce((a, r) => r.rating + a, 0) /
        project.reviews.length;
        await project.save();
        await project.populate("reviews.reviewBy");
        await db.disconnectDb();
        return res.status(200).json({ reviews: project.reviews.reverse() });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;