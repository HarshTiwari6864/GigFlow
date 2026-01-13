import { useEffect, useState } from "react";
import api from "../api/axios";
import Modal from "../components/Modal";


export default function MyProjects() {
  const [hired, setHired] = useState([]);
  const [posted, setPosted] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [gigToDelete, setGigToDelete] = useState(null);


  const loadProjects = async () => {
    const res = await api.get("/gigs/my-projects");
    setHired(res.data.hiredProjects);
    setPosted(res.data.myPostedGigs);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const deleteGig = (gigId) => {
  setGigToDelete(gigId);
  setShowDeleteModal(true);
};

const confirmDeleteGig = async () => {
  try {
    await api.delete(`/gigs/${gigToDelete}`);
    setShowDeleteModal(false);
    setGigToDelete(null);
    loadProjects();

  } catch (err) {
    console.error("Failed to delete gig", err);
    setShowDeleteModal(false);
  }
};


  return (
    <div className="p-6 max-w-6xl mt-8 mx-auto grid grid-cols-2 gap-6">

      {/* LEFT: HIRED PROJECTS */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Projects I’m Working On
        </h2>

        {hired.length === 0 && (
          <p className="text-gray-500">No active projects</p>
        )}

        {hired.map(gig => (
          <div key={gig._id} className="border rounded p-4 mb-3">
            <h3 className="font-semibold">{gig.title}</h3>
            <p className="text-sm text-gray-600">
              Budget: ₹{gig.budget}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT: POSTED PROJECTS */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          My Posted Gigs
        </h2>

        {posted.length === 0 && (
          <p className="text-gray-500">No gigs posted</p>
        )}

        {posted.map(gig => (
          <div key={gig._id} className="border rounded p-4 mb-3 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{gig.title}</h3>
              <p className="text-sm text-gray-600">
                Status: {gig.status}
              </p>
            </div>

            <button
              onClick={() => deleteGig(gig._id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
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
