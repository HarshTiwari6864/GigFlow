import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Modal from "../components/Modal";


export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [gigToDelete, setGigToDelete] = useState(null);


  const fetchGigs = async () => {
    const res = await api.get("/gigs", {
      params: search ? { search } : {}
    });
    setGigs(res.data);
  };

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setCurrentUserId(res.data.userId);
    } catch {
      setCurrentUserId(null);
    }
  };

  useEffect(() => {
    fetchGigs();
    fetchMe();
  }, [search]);

 const deleteGig = (gigId) => {
  setGigToDelete(gigId);
  setShowDeleteModal(true);
};

const confirmDeleteGig = async () => {
  try {
    await api.delete(`/gigs/${gigToDelete}`);
    setShowDeleteModal(false);
    setGigToDelete(null);
    fetchGigs();
  } catch (err) {
    console.error("Failed to delete gig", err);
    setShowDeleteModal(false);
  }
};


  return (
    <div className="p-6 mt-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Gigs</h2>

      {/* SEARCH BOX */}
      <input
        type="text"
        placeholder="Search gigs by title..."
        className="border p-2 w-full mb-6 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* EMPTY STATE */}
      {gigs.length === 0 && (
        <p className="text-gray-500">No gigs found</p>
      )}

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            {/* TOP SECTION */}
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {gig.title}
              </h3>

              <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                {gig.description}
              </p>

              <p className="font-medium mb-2">
                ₹{gig.budget}
              </p>

              <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {gig.bidCount} Bid{gig.bidCount !== 1 && "s"}
              </span>
            </div>

            {/* BOTTOM SECTION */}
            <div className="mt-4 flex justify-between items-center">
              {gig.status === "assigned" ? (
                <div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    HIRED
                  </span>
                </div>
              ) : (
                <Link
                  to={`/gigs/${gig._id}/bids`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Bids Section →
                </Link>
              )}

              {/* DELETE BUTTON – ONLY OWNER */}
              {currentUserId === gig.ownerId && (
                <button
                  onClick={() => deleteGig(gig._id)}
                  className="text-red-600 text-xs hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        <Modal
  show={showDeleteModal}
  title="Delete Gig ❌"
  message="Are you sure you want to delete this gig? This action cannot be undone."
  showCancel
  confirmText="Delete"
  onClose={() => {
    setShowDeleteModal(false);
    setGigToDelete(null);
  }}
  onConfirm={confirmDeleteGig}
/>

      </div>
    </div>
    
  );
}
