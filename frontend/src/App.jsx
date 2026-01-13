import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import Bids from "./pages/Bids";
import Profile from "./pages/Profile";
import MyProjects from "./pages/MyProjects";
import HomeRedirect from "./pages/HomeRedirect";


export default function App() {
  return (
    <BrowserRouter>
      {/* APP CONTAINER */}
      <div className="h-screen flex flex-col">
        
        {/* FIXED NAVBAR */}
        <Navbar />

        {/* SCROLLABLE APP CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomeRedirect />} />
  <Route path="/gigs" element={<Gigs />} />

            <Route path="/register" element={<Register />} />
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/gigs/:id/bids" element={<Bids />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-projects" element={<MyProjects />} />

            
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}
