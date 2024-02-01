import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../service/helper";
import { useNavigate, Link } from "react-router-dom";
const Paper = () => {
  const [question, setQuestion] = useState(null);
  const location = useLocation();
  let navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const questionId = searchParams.get("question._id");

  useEffect(() => {
    if (questionId) {
      axios
        .get(`${BASE_URL}/getQuestionById?questionId=${questionId}`)
        .then((res) => {
          setQuestion(res.data);
        })
        .catch((err) => {
          console.error("Error fetching question: ", err);
        });
    }
  }, [questionId]);

  const handleDownload = () => {
    // Use the 'download' attribute to trigger the download
    const link = document.createElement("a");
    link.href = `http://localhost:8080/images/${question.question}`;
    link.download = "question_paper";
    link.click();
  };
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear the authentication token from localStorage and redirect to the login page
    // localStorage.clear();
    navigate("/getQp"); // Adjust the route accordingly
  };
  return (
    <>
      {/* <h2 className="text-2xl font-bold">Question</h2> */}
      <div className="relative down-4 top-4 mb-8">
        <h2 className="text-left text-xl font-bold tracking-tight text-slate-900">
          Questions Available
        </h2>
        <button
          onClick={handleLogout}
          className="absolute top-0 right-2 md:top-0 md:right-24 bg-blue-500 hover:bg-red-700 text-white py-2 px-4 rounded-md"
        >
          Home
        </button>
      </div>

      <div className="flex justify-center items-center h-full top-4 md:top-4">
        <div className="w-full max-w-screen-lg top-4 md:top-4">
          {question ? (
            <div className="flex flex-col items-center">
              <img
                src={`http://localhost:8080/images/${question.question}`}
                className="w-full h-auto max-h-screen rounded-lg"
                alt="Question Paper"
              />
              <div className="bg-gray-100 p-4 rounded-lg mt-4 w-full max-w-screen-md">
                <h3 className="text-xl font-bold">{question.college}</h3>
                <p>
                  <span className="font-semibold">Subject:</span>{" "}
                  <span className="text-blue-600">{question.subject}</span>
                </p>
                <p>
                  <span className="font-semibold">Semester:</span>{" "}
                  <span className="text-blue-600">{question.semester}</span>
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Download
              </button>
            </div>
          ) : (
            <p>No Paper data available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Paper;
