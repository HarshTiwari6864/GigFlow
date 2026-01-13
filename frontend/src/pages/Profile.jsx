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
  const [imageUploaded, setImageUploaded] = useState(false);


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
    formData.append("name", profile.name);
    if (image) formData.append("image", image);

    await api.put("/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    // ✅ redirect safely
    window.location.href = "/";

  } catch {
    console.error("Failed to update profile");
  }
};

  return (
  <div className="flex justify-center mt-16 px-6">
    <div className="w-full max-w-md border border-black rounded-lg p-6">

      <h2 className="text-2xl font-bold mb-6 text-center">
        My Profile
      </h2>

      {/* PROFILE IMAGE */}
      <div className="flex justify-center mb-4">
        <img
          src={
            profile.profileImage
              ? `${import.meta.env.VITE_API_URL}${profile.profileImage}`
              : "/profile.svg"
          }
          className="w-28 h-28 rounded-full object-cover border"
        />
      </div>

      {/* VIEW MODE */}
      {!editMode && (
        <div className="text-center">
          <p className="text-lg font-semibold">
            {profile.name}
          </p>

          <p className="text-gray-600 mb-4">
            {profile.email}
          </p>

          <p className="text-gray-700 mb-6">
            {profile.about || "No description added yet."}
          </p>

          <button
            onClick={() => setEditMode(true)}
            className="bg-black text-white w-full py-3 rounded"
          >
            Update Profile
          </button>
        </div>
      )}

      {/* EDIT MODE */}
      {editMode && (
        <form onSubmit={updateProfile} className="mt-6">
          {/* NAME */}
    <label className="block mb-2 font-medium">
      Name
    </label>
    <input
      type="text"
      className="border p-2 w-full mb-4 rounded"
      value={profile.name}
      onChange={(e) =>
        setProfile({ ...profile, name: e.target.value })
      }
    />
          <label className="block mb-2 font-medium">
  Profile Photo
</label>

<input
  id="profileImage"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    setImage(e.target.files[0]);
    setImageUploaded(true);
  }}
/>

<label
  htmlFor="profileImage"
  className="inline-block cursor-pointer border px-4 py-2 rounded hover:bg-gray-100"
>
  Choose Image
</label>

{imageUploaded && (
  <p className="text-sm text-green-600 mt-2">
    Image uploaded ✅
  </p>
)}


          <label className="block mb-2 font-medium">
            About You
          </label>

          <textarea
            className="border p-2 w-full mb-4 rounded"
            rows="4"
            value={profile.about}
            onChange={(e) =>
              setProfile({ ...profile, about: e.target.value })
            }
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-black text-white w-full py-3 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="border w-full py-3 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

    </div>
  </div>
);

}
