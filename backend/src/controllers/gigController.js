import Gig from "../models/Gig.js";
import Bid from "../models/Bid.js";

/**
 * GET all open gigs (search by title)
 */
export const getGigs = async (req, res) => {
  const { search } = req.query;

  const filter = {
    ...(search && { title: { $regex: search, $options: "i" } })
  };

  const gigs = await Gig.find(filter)
    .populate("assignedTo", "name")
    .sort({ createdAt: -1 });

  // 🔥 Add bid count to each gig
  const gigsWithBidCount = await Promise.all(
    gigs.map(async (gig) => {
      const bidCount = await Bid.countDocuments({ gigId: gig._id });

      return {
        ...gig.toObject(),
        bidCount
      };
    })
  );

  res.json(gigsWithBidCount);
};



/**
 * CREATE gig
 */
export const createGig = async (req, res) => {
  const { title, description, budget } = req.body;

  if (!title || !description || !budget) {
    return res.status(400).json({ message: "All fields required" });
  }

  const gig = await Gig.create({
    title,
    description,
    budget,
    ownerId: req.user.id
  });

  res.status(201).json(gig);
};
export const getMyProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    // Gigs where I am hired
    const hiredProjects = await Gig.find({
      assignedTo: userId
    }).sort({ createdAt: -1 });

    // Gigs I posted
    const myPostedGigs = await Gig.find({
      ownerId: userId
    }).sort({ createdAt: -1 });

    res.json({
      hiredProjects,
      myPostedGigs
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
export const deleteGig = async (req, res) => {
  const gig = await Gig.findById(req.params.id);

  if (!gig || gig.ownerId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await gig.deleteOne();
  res.json({ message: "Gig deleted" });
};


