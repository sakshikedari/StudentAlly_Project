import { Routes, Route, Navigate } from "react-router-dom";
import AdminPanel from "../pages/Admin/AdminPanel";
import AdminLogin from "../pages/Admin/AdminLogin";

function RequireAuth({ adminToken, userRole, requiredRole, children }) {
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole) {
    const allowed = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowed.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}


const AdminRoutes = ({ adminToken, userRole }) => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <RequireAuth adminToken={adminToken} userRole={userRole}>
            <AdminPanel />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/*"
        element={
          adminToken ? <Navigate to="/admin" replace /> : <Navigate to="/admin/login" replace />
        }
      />
    </Routes>
  );
};
export default AdminRoutes;
