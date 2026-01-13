
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";


/**
 * SUBMIT BID
 */
export const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== "open") {
      return res.status(400).json({ message: "Gig not available" });
    }

    // 🚫 Prevent owner from bidding on own gig
    if (gig.ownerId.toString() === req.user.id) {
      return res.status(403).json({
        message: "You cannot bid on your own gig"
      });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price
    });

    res.status(201).json(bid);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET BIDS for a gig (OWNER ONLY)
 */
export const getBidsByGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId).populate("ownerId", "_id");
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    const isOwner = gig.ownerId._id.toString() === req.user.id;

    // Owner can see all bids, others see none
    const bids = isOwner ? await Bid.find({ gigId }).populate("freelancerId", "name email about profileImage")
  : [];

    res.json({
      bids,
      ownerId: gig.ownerId._id
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const hireBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).populate("gigId");
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId._id);

    // 🔒 Only gig owner can hire
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Prevent rehiring
    if (gig.status === "assigned") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // Update bid + gig
    bid.status = "hired";
    await bid.save();

    gig.status = "assigned";
    gig.assignedTo = bid.freelancerId;
    await gig.save();


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
