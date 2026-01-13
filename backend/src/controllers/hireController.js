import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid || bid.status !== "pending") {
      throw new Error("Bid not valid");
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (gig.status !== "open") {
      throw new Error("Gig already assigned");
    }

    // Assign gig
    gig.status = "assigned";
    gig.assignedTo = bid.freelancerId;
    await gig.save({ session });

    // Hire chosen bid
    bid.status = "hired";
    await bid.save({ session });

    // Reject others
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Freelancer hired successfully" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: err.message });
  }
};
