import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

export default function Profile() {
  const location = useLocation();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    about: "",
    profileImage: ""
  });

  // 👇 START IN EDIT MODE IF NAVIGATED FROM NAVBAR
  const [editMode, setEditMode] = useState(
    location.state?.edit || false
  );

  const [image, setImage] = useState(null);

  useEffect(() => {
    api.get("/profile").then((res) => setProfile(res.data));
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("about", profile.about);
      if (image) formData.append("image", image);

      await api.put("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Refresh to sync navbar
      window.location.reload();
    } catch {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* PROFILE IMAGE */}
      <div className="flex justify-center mb-4">
        <img
          src={
            profile.profileImage
              ? `${import.meta.env.VITE_API_URL}${profile.profileImage}`
              : "/profile.svg"
          }
          className="w-32 h-32 rounded-full object-cover border"
        />
      </div>

      {/* VIEW MODE */}
      {!editMode && (
        <div className="text-center">
          <p className="text-lg font-semibold">{profile.name}</p>
          <p className="text-gray-600 mb-4">{profile.email}</p>

          <p className="text-gray-700 mb-6">
            {profile.about || "No description added yet."}
          </p>

          <button
            onClick={() => setEditMode(true)}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Update Profile
          </button>
        </div>
      )}

      {/* EDIT MODE */}
      {editMode && (
        <form onSubmit={updateProfile} className="mt-6">
          <label className="block mb-2 font-medium">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <label className="block mb-2 font-medium">
            About You
          </label>
          <textarea
            className="border p-2 w-full mb-4"
            rows="4"
            value={profile.about}
            onChange={(e) =>
              setProfile({ ...profile, about: e.target.value })
            }
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="border px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
    </div>
  );
}
