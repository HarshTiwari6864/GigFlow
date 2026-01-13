// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import Modal from "../components/Modal";

// export default function CreateGig() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [budget, setBudget] = useState("");
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);


//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/gigs", {
//         title,
//         description,
//         budget
//       });
//       navigate("/");
//     } catch {
//       alert("Failed to create gig");
//     }
//   };

//   return (
//     <div className="flex justify-center mt-12 px-6 pt-4">


//       <div className="w-full max-w-xl border border-black rounded-lg p-6">

//         {/* WELCOME TEXT */}
//         <h2 className="text-2xl font-bold mb-2 text-center">
//           Create a New Gig 🧑‍💼
//         </h2>
//         <p className="text-gray-600 text-center mb-6">
//           Post a gig and start receiving bids from talented freelancers.
//         </p>

//         <form onSubmit={submit} className="space-y-4">
//           {/* TITLE */}
//           <input
//             type="text"
//             placeholder="Gig Title"
//             className="border p-3 w-full rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           {/* DESCRIPTION */}
//           <textarea
//             placeholder="Describe the work in detail"
//             className="border p-3 w-full rounded"
//             rows="4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />

//           {/* BUDGET */}
//           <input
//             type="text"
//             inputMode="numeric"
//             placeholder="₹ Value in rupees"
//             className="border p-3 w-full rounded"
//             value={budget}
//             onChange={(e) =>
//               setBudget(e.target.value.replace(/\D/g, ""))
//             }
//             required
//           />

//           {/* SUBMIT */}
//           <button
//             type="submit"
//             className="bg-black text-white w-full py-3 rounded"
//           >
//             Post Gig
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/gigs", {
        title,
        description,
        budget
      });

      // ✅ SUCCESS MODAL
      setModalTitle("Gig Created 🎉");
      setModalMessage("Your gig has been posted successfully.");
      setIsSuccess(true);
      setShowModal(true);

    } catch (err) {
      console.error("Failed to create gig", err);

      // ❌ ERROR MODAL
      setModalTitle("Failed to Create Gig ❌");
      setModalMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-12 px-6 pt-4">
        <div className="w-full max-w-xl border border-black rounded-lg p-6">

          {/* HEADER */}
          <h2 className="text-2xl font-bold mb-2 text-center">
            Create a New Gig 🧑‍💼
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Post a gig and start receiving bids from talented freelancers.
          </p>

          <form onSubmit={submit} className="space-y-4">
            {/* TITLE */}
            <input
              type="text"
              placeholder="Gig Title"
              className="border p-3 w-full rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Describe the work in detail"
              className="border p-3 w-full rounded"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* BUDGET */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="₹ Value in rupees"
              className="border p-3 w-full rounded"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value.replace(/\D/g, ""))
              }
              required
            />

            {/* SUBMIT */}
            <button
              type="submit"
              className="bg-black text-white w-full py-3 rounded"
            >
              Post Gig
            </button>
          </form>
        </div>
      </div>

      {/* MODAL (SUCCESS + ERROR) */}
      <Modal
        show={showModal}
        title={modalTitle}
        message={modalMessage}
        onClose={() => {
          setShowModal(false);
          if (isSuccess) navigate("/");
        }}
      />
    </>
  );
}
