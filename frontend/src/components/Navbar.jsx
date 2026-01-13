
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import api from "../api/axios";

export default function Navbar() {
  const { isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState("");
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);

  // 🔹 mobile dropdown
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeTimer = useRef(null);


  useEffect(() => {
  if (!isAuthenticated) {
    setProfile(null);
    setAvatar("");
    return;
  }

  api.get("/profile")
    .then((res) => {
      setProfile(res.data);
      const img = res.data.profileImage;
      // setAvatar(img ? `${import.meta.env.VITE_API_URL}${img}` : "");
      setAvatar(
  img
    ? img.startsWith("http")
      ? img
      : `${import.meta.env.VITE_API_URL}${img}`
    : ""
);
      

    })
    .catch(() => {
      setProfile(null);
      setAvatar("");
    });
}, [isAuthenticated]);


  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b relative">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        GigFlow
      </h1>

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/">Gigs</Link>
            <Link to="/create-gig">Post Gig</Link>
            <Link to="/my-projects">My Projects</Link>

            {/* PROFILE DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
            >
              <img
                src={avatar || "/profile.svg"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border cursor-pointer"
              />

              {open && profile && (
                <div
                  className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-50"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                >
                  {/* USER INFO */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={avatar || "/profile.svg"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {profile.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {profile.email}
                      </p>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                    {profile.about || "No description added yet."}
                  </p>

                  {/* ACTIONS */}
                  <div className="border-t pt-3 flex flex-col gap-2">
                    <button
                      onClick={() =>
                        navigate("/profile", { state: { edit: true } })
                      }
                      className="text-left text-sm hover:bg-gray-100 px-2 py-1 rounded"
                    >
                      Update Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="text-left text-sm text-red-600 hover:bg-red-50 px-2 py-1 rounded"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {/* ================= MOBILE DROPDOWN (NEW) ================= */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="border px-3 py-1 rounded text-sm"
        >
          Menu
        </button>

        {mobileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-3 z-50">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="block py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Gigs
                </Link>
                <Link
                  to="/create-gig"
                  className="block py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Post Gig
                </Link>
                <Link
                  to="/my-projects"
                  className="block py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  My Projects
                </Link>
                <Link
                  to="/profile"
                  className="block py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
