import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiresQuizId = false }) => {
  const token = localStorage.getItem("token");
  const quizId = localStorage.getItem("quiz_id");

  if (requiresQuizId && !quizId) {
    return <Navigate to="/" />;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
