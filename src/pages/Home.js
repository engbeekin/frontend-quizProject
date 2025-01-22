import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/quiz/start");
      const { quiz_id } = response.data;

      localStorage.setItem("quiz_id", quiz_id);

      navigate("/quiz", { state: { id: quiz_id } });
    } catch (err) {
      setError("Error starting the quiz. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz</h1>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleStartQuiz}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Starting Quiz..." : "Start Quiz"}
        </button>
      </div>
    </div>
  );
};

export default Home;
