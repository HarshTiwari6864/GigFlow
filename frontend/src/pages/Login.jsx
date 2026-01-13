import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/login", { email, password });
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <div className="flex justify-center mt-12 px-6 pt-4">


      <div className="w-full max-w-md border border-black rounded-lg p-6">
        
        {/* WELCOME TEXT */}
        <h2 className="text-2xl font-bold mb-2 text-center">
          Welcome back to GigFlow 👋
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Login to explore gigs or manage your projects.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="border p-3 w-full rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="border p-3 w-full rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-black text-white w-full py-3 rounded"
          >
            Login
          </button>
        </form>

        {/* FOOTER LINK */}
        <p className="text-center text-sm mt-6">
          New to GigFlow?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
