import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";

const QuizForm = () => {
  const [question, setQuestion] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const [data, setData] = useState();
  const [quizResult, setQuizResult] = useState([]);

  const navigate = useNavigate();
  const quizId = localStorage.getItem("quiz_id");

  useEffect(() => {
    !quizId ? navigate("/") : fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setLoading(true);
    setFeedback(null);
    setSelectedAnswer("");
    setShowNext(false);
    try {
      const response = await api.get("/quiz/question");
      setQuestion(response.data);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    try {
      const response = await api.post("/quiz/check", {
        country: question.question?.country?.name,
        answer: selectedAnswer,
        quizId: quizId,
      });

      const { result } = response.data;
      setData(result);

      if (result.isCorrect) {
        setFeedback("correct");
      } else {
        setFeedback("wrong");
      }
      setShowNext(true);
      setQuizResult(result.quizResult);
    } catch (error) {
      console.error("Error validating answer:", error);
    }
  };

  const exitTheQuiz = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to finish the quiz and see your results?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, finish it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("quiz_id");
        Swal.fire({
          title: "Quiz Results",
          html: `
            <strong>Total Questions:</strong> ${
              quizResult.totalQuestions ?? 0
            } <br>
            <strong>Correct Answers:</strong> ${
              quizResult.correctAnswers ?? 0
            } <br>
            <strong>Incorrect Answers:</strong> ${
              quizResult.inCorrectAnswers ?? 0
            } <br>
            <strong>Percentage of Correct Answers:</strong> ${
              quizResult.percentageOfCorrectAnswers ?? 0
            }%`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : question ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What is the capital of {question.question?.country?.name}?
            </h2>
            <form className="space-y-4">
              {question.question?.options.map((option) => (
                <div
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedAnswer === option
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <p className="text-gray-700 font-medium">{option}</p>
                </div>
              ))}
            </form>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={submitAnswer}
                hidden={!selectedAnswer || feedback}
                className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow ${
                  !selectedAnswer || feedback
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                Submit
              </button>
            </div>
            {showNext && feedback === "correct" && (
              <p className="text-green-600 font-medium mt-2">
                Correct! The answer is {selectedAnswer}.
              </p>
            )}
            {showNext && feedback === "wrong" && (
              <p className="text-red-600 font-medium mt-2">
                Wrong! The correct answer is {data.correctCapital}.
              </p>
            )}
            {showNext && (
              <button
                onClick={fetchQuestion}
                className="mt-4 w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-900"
              >
                Next Question
              </button>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">No question available.</p>
        )}
        <button
          onClick={exitTheQuiz}
          className="mt-6 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 w-full"
        >
          Exit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizForm;
