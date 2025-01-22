import React, { useState, useEffect } from "react";
import api from "../services/api";
const QuizResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/quiz/dashboard");
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Dashboard
        </h1>
        {data.map((user) => (
          
          <div
            key={user.id}
            className="mb-8 bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
          >
          
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Your Quizzes Result
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold">Total Quizzes</h3>
                <p className="text-2xl font-bold">{user.overallQuizCount}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold">Total Questions</h3>
                <p className="text-2xl font-bold">
                  {user.overallQuizUserResultCount}
                </p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold">Total Correct Answers</h3>
                <p className="text-2xl font-bold">{user.overallCorrectCount}</p>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold">Total Incorrect Answers</h3>
                <p className="text-2xl font-bold">
                  {user.overallIncorrectCount}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Quizzes:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.quizzes.quiz_info.map((quiz, index) => {
                  const result = user.quizzes.quizUserResult[quiz.id] || {};
                  return (
                    <div
                      key={quiz.id}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <h4 className="text-lg font-semibold">
                        Quiz {index + 1}
                      </h4>
                      <p className="text-md">
                        Total Questions: {quiz.quizUserResultCount}
                      </p>
                      <p className="text-md">Correct: {result.correct_count}</p>
                      <p className="text-md">
                        Incorrect: {result.incorrect_count}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResult;
