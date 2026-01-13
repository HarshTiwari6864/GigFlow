// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function Bids() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [bids, setBids] = useState([]);
//   const [ownerId, setOwnerId] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [message, setMessage] = useState("");
//   const [price, setPrice] = useState("");

//   // Load bids + owner info + current user
//   const load = async () => {
//     const bidsRes = await api.get(`/bids/${id}`);
//     setBids(bidsRes.data.bids);
//     setOwnerId(bidsRes.data.ownerId);

//     const meRes = await api.get("/auth/me");
//     setCurrentUserId(meRes.data.userId);
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   // Submit bid (non-owner)
//   const submitBid = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/bids", {
//         gigId: id,
//         message,
//         price
//       });

//       setMessage("");
//       setPrice("");

//       // Redirect to gigs page
//       navigate("/");
//     } catch (err) {
//       alert("Failed to submit bid");
//     }
//   };

//   // Hire freelancer (owner only)
//   const hire = async (bidId) => {
//     await api.patch(`/bids/${bidId}/hire`);
//     alert("Freelancer hired");
//     load();
//   };

//   // Ownership check
//   const isOwner = currentUserId === ownerId;

//   return (
//     <div className="p-6 max-w-2xl mx-auto">

//       {/* BID FORM (NON-OWNER ONLY) */}
//       {!isOwner && (
//         <form onSubmit={submitBid} className="border rounded p-4 mb-6">
//           <h3 className="font-semibold mb-2">Place a Bid</h3>

//           <textarea
//             className="border p-2 w-full mb-2"
//             placeholder="Your proposal"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />

//           <input
//             type="number"
//             className="border p-2 w-full mb-2"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />

//           <button className="bg-black text-white px-4 py-2">
//             Submit Bid
//           </button>
//         </form>
//       )}

//       {/* INFO MESSAGE FOR NON-OWNER */}
//       {!isOwner && (
//         <p className="text-gray-600 mb-4">
//           You can place your bid above. Other bidders’ proposals are hidden.
//         </p>
//       )}

//       {/* BIDS LIST */}
//       <h2 className="text-xl font-bold mb-4">Bids</h2>

//       {/* OWNER EMPTY STATE */}
//       {isOwner && bids.length === 0 && (
//         <p className="text-gray-500">No bids yet</p>
//       )}

//       {/* OWNER BIDS VIEW */}
//       {bids.map((bid) => (
//         <div key={bid._id} className="border rounded p-4 mb-3">
//           <p className="font-semibold">{bid.freelancerId?.name}</p>
//           <p className="text-sm text-gray-600 mb-1">
//             {bid.freelancerId?.email}
//           </p>

//           <p>{bid.message}</p>
//           <p className="font-medium">₹{bid.price}</p>
//           <p className="text-sm">Status: {bid.status}</p>

//           {isOwner && bid.status === "pending" && (
//             <button
//               onClick={() => hire(bid._id)}
//               className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
//             >
//               Hire
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useParams, useNavigate } from "react-router-dom";
// import Modal from "../components/Modal";

// export default function Bids() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [bids, setBids] = useState([]);
//   const [ownerId, setOwnerId] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [message, setMessage] = useState("");
//   const [price, setPrice] = useState("");

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [modalTitle, setModalTitle] = useState("");
//   const [modalMessage, setModalMessage] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);

//   // Load bids + owner info + current user
//   const load = async () => {
//     try {
//       const bidsRes = await api.get(`/bids/${id}`);
//       setBids(bidsRes.data.bids);
//       setOwnerId(bidsRes.data.ownerId);

//       const meRes = await api.get("/auth/me");
//       setCurrentUserId(meRes.data.userId);
//     } catch (err) {
//       console.error("Failed to load bids", err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [id]);

//   // Submit bid (non-owner)
//   const submitBid = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/bids", {
//         gigId: id,
//         message,
//         price
//       });

//       setMessage("");
//       setPrice("");

//       // ✅ SUCCESS MODAL
//       setModalTitle("Bid Submitted ✅");
//       setModalMessage("Your proposal has been sent successfully.");
//       setIsSuccess(true);
//       setShowModal(true);

//     } catch (err) {
//       console.error("Failed to submit bid", err);

//       // ❌ ERROR MODAL
//       setModalTitle("Bid Failed ❌");
//       setModalMessage("Unable to submit your bid. Please try again.");
//       setIsSuccess(false);
//       setShowModal(true);
//     }
//   };

//   // Hire freelancer (owner only)
//   const hire = async (bidId) => {
//     try {
//       await api.patch(`/bids/${bidId}/hire`);

//       // ✅ SUCCESS MODAL
//       setModalTitle("Freelancer Hired 🎉");
//       setModalMessage("You have successfully hired this freelancer.");
//       setIsSuccess(true);
//       setShowModal(true);

//     } catch (err) {
//       console.error("Failed to hire freelancer", err);

//       // ❌ ERROR MODAL
//       setModalTitle("Hiring Failed ❌");
//       setModalMessage("Something went wrong. Please try again.");
//       setIsSuccess(false);
//       setShowModal(true);
//     }
//   };

//   // Ownership check
//   const isOwner = currentUserId === ownerId;

//   return (
//     <>
//       <div className="p-6 max-w-2xl mx-auto">

//         {/* BID FORM (NON-OWNER ONLY) */}
//         {!isOwner && (
//           <form onSubmit={submitBid} className="border rounded p-4 mb-6">
//             <h3 className="font-semibold mb-2">Place a Bid</h3>

//             <textarea
//               className="border p-2 w-full mb-2"
//               placeholder="Your proposal"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               required
//             />

//             <input
//               type="number"
//               className="border p-2 w-full mb-2"
//               placeholder="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />

//             <button className="bg-black text-white px-4 py-2">
//               Submit Bid
//             </button>
//           </form>
//         )}

//         {/* INFO MESSAGE FOR NON-OWNER */}
//         {!isOwner && (
//           <p className="text-gray-600 mb-4">
//             You can place your bid above. Other bidders’ proposals are hidden.
//           </p>
//         )}

//         {/* OWNER EMPTY STATE */}
//         {isOwner && bids.length === 0 && (
//           <p className="text-gray-500">No bids yet</p>
//         )}

//         {/* OWNER BIDS VIEW */}
//         {bids.map((bid) => (
//           <div key={bid._id} className="border rounded p-4 mb-3">
//             <p className="font-semibold">{bid.freelancerId?.name}</p>
//             <p className="text-sm text-gray-600 mb-1">
//               {bid.freelancerId?.email}
//             </p>

//             <p>{bid.message}</p>
//             <p className="font-medium">₹{bid.price}</p>
//             <p className="text-sm">Status: {bid.status}</p>

//             {isOwner && bid.status === "pending" && (
//               <button
//                 onClick={() => hire(bid._id)}
//                 className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
//               >
//                 Hire
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* MODAL (SUCCESS + ERROR) */}
//       <Modal
//         show={showModal}
//         title={modalTitle}
//         message={modalMessage}
//         onClose={() => {
//           setShowModal(false);
//           if (isSuccess && modalTitle.includes("Bid Submitted")) {
//             navigate("/");
//           }
//           if (isSuccess && modalTitle.includes("Freelancer Hired")) {
//             load();
//           }
//         }}
//       />
//     </>
//   );
// }
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function Bids() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bids, setBids] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const load = async () => {
    try {
      const bidsRes = await api.get(`/bids/${id}`);
      setBids(bidsRes.data.bids);
      setOwnerId(bidsRes.data.ownerId);

      const meRes = await api.get("/auth/me");
      setCurrentUserId(meRes.data.userId);
    } catch (err) {
      console.error("Failed to load bids", err);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const submitBid = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bids", { gigId: id, message, price });
      setMessage("");
      setPrice("");

      setModalTitle("Bid Submitted ✅");
      setModalMessage("Your proposal has been sent successfully.");
      setIsSuccess(true);
      setShowModal(true);
    } catch (err) {
      setModalTitle("Bid Failed ❌");
      setModalMessage("Unable to submit your bid. Please try again.");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const hire = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      setModalTitle("Freelancer Hired 🎉");
      setModalMessage("You have successfully hired this freelancer.");
      setIsSuccess(true);
      setShowModal(true);
    } catch (err) {
      setModalTitle("Hiring Failed ❌");
      setModalMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const isOwner = currentUserId === ownerId;

  return (
    <>
      {/* CENTERED LAYOUT */}
      <div className="flex justify-center mt-12 px-6 pt-4">
        <div className="w-full max-w-xl border border-black rounded-lg p-6">

          {/* HEADER */}
          <h2 className="text-2xl font-bold mb-2 text-center">
            Bids & Proposals
          </h2>

          <p className="text-gray-600 text-center mb-6">
            {isOwner
              ? "Review bids and hire a freelancer"
              : "Submit your proposal for this gig"}
          </p>

          {/* BID FORM */}
          {!isOwner && (
            <form onSubmit={submitBid} className="space-y-3 mb-6">
              <textarea
                className="border p-3 w-full rounded"
                placeholder="Your proposal"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <input
                type="text"
                className="border p-3 w-full rounded"
                placeholder="Proposed price in digits"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <button className="bg-black text-white w-full py-3 rounded">
                Submit Bid
              </button>
            </form>
          )}

          {!isOwner && (
            <p className="text-gray-600 text-sm mb-4 text-center">
              Other bidders’ proposals are hidden.
            </p>
          )}

          {/* OWNER EMPTY STATE */}
          {isOwner && bids.length === 0 && (
            <p className="text-gray-500 text-center">
              No bids yet
            </p>
          )}

          {/* BIDS LIST */}
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="border rounded p-4 mb-3"
            >
              <div className="relative inline-block group">
  <p className="font-semibold cursor-pointer text-blue-600">
    {bid.freelancerId?.name}
  </p>

  {/* TOOLTIP */}
  {bid.freelancerId?.about && (
  <div
    className="absolute left-0 top-full mt-2 w-72
    rounded-xl p-4 text-sm
    bg-white/80 backdrop-blur-md
    border border-gray-200
    text-gray-800
    shadow-lg
    opacity-0 group-hover:opacity-100
    pointer-events-none transition-opacity duration-200
    z-[9999]"
  >
    {/* HEADER: Avatar + Name */}
    <div className="flex items-center gap-3 mb-2">
      <img
        src={
          bid.freelancerId.profileImage
            ? `${import.meta.env.VITE_API_URL}${bid.freelancerId.profileImage}`
            : "/profile.svg"
        }
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover border"
      />

      <p className="font-semibold text-sm">
        {bid.freelancerId.name}
      </p>
    </div>

    {/* ABOUT */}
    <p className="text-gray-700 leading-relaxed">
      {bid.freelancerId.about}
    </p>
  </div>
)}

</div>

              <p className="text-sm text-gray-600">
                {bid.freelancerId?.email}
              </p>

              <p className="mt-2">{bid.message}</p>
              <p className="font-medium mt-1">
                ₹{bid.price}
              </p>

              <p className="text-sm mt-1">
                Status: {bid.status}
              </p>

              {isOwner && bid.status === "pending" && (
                <button
                  onClick={() => hire(bid._id)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Hire
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        show={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={() => {
          setShowModal(false);
          if (isSuccess && modalTitle.includes("Bid Submitted")) {
            navigate("/");
          }
          if (isSuccess && modalTitle.includes("Freelancer Hired")) {
            load();
          }
        }}
      />
    </>
  );
}
