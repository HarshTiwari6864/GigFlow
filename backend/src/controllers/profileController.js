import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "name email profileImage about"
  );
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const update = {
    about: req.body.about
  };

  if (req.file) {
    update.profileImage = `/uploads/${req.file.filename}`;
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    update,
    { new: true }
  ).select("name email profileImage about");

  res.json(user);
};
