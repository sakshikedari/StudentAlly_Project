import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Layout & Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatWidget from './components/ChatWidget'; // The floating widget

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import LoginSelection from "./pages/LoginSelection";
import StudentLogin from "./pages/StudentLogin";
import AlumniLogin from "./pages/AlumniLogin";
import AlumniDirectory from "./pages/AlumniDirectory";
import JobPortal from "./pages/JobPortal";
import SuccessStories from "./pages/SuccessStories";
import Events from "./pages/Events";
import Donate from "./pages/Donate";
import Chatbot from './pages/Chatbot';

// Routes
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const [adminToken, setAdminToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    setAdminToken(storedToken);

    const fetchUserRole = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
        setUserRole(res.data.role);
      } catch (error) {
        console.error("Error fetching user role", error);
        setUserRole(null);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar userRole={userRole} isAdmin={!!adminToken} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login-selection" element={<LoginSelection />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/alumni-login" element={<AlumniLogin />} />
          <Route path="/directory" element={<AlumniDirectory />} />
          <Route path="/jobs" element={<JobPortal />} />
          <Route path="/success" element={<SuccessStories />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/queries" element={<Chatbot />} />
        </Routes>

        <AdminRoutes adminToken={adminToken} userRole={userRole} />
      </main>

      {/* FIXED: Placed outside main to ensure it floats on every page */}
      <ChatWidget />
      
      <Footer />
    </div>
  );
}

export default App;