import { useEffect, useState } from "react";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";
import "../assets/fonts.css";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Navigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

export default function Quiz() {
  const getQuestion = JSON.parse(localStorage.getItem("questions"));
  const [questions, setQuestions] = useState(getQuestion || []);

  const [currQuestion, setCurrQuestion] = useState(0);
  const [showAns, setShowAns] = useState(false);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((response) => {
        const updatedQuestions = response.data.results.map((question) => {
          return {
            ...question,
            question: question.question.replace(/&#?\w+;/g, (match) => {
              const entity = match.replace(/&#|;/g, "");
              const char = String.fromCharCode(entity);
              return char;
            }),
          };
        });
        // response.data.results.incorrect_answers.length() + 1
        const rand = Math.floor(Math.random() * 4);
        const toStorage = updatedQuestions.map((question) => {
          question.incorrect_answers.splice(rand, 0, question.correct_answer);
          return {
            ...question,
            options: question.incorrect_answers,
            incorrect_answers: [],
          };
        });
        localStorage.setItem("questions", JSON.stringify(toStorage));
        if (!questions) {
          setQuestions(updatedQuestions);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [selectedOption, setSelectedOption] = useState(null);
  const [ansCorrect, setAnsCorrect] = useState(false);
  const handleOptionClick = (event) => {
    setSelectedOption(event.target.value);
  };

  const validateAnswer = (e) => {
    e.preventDefault();
    if (selectedOption) {
      setShowAns(true);
    }
    if (selectedOption === questions[currQuestion].correct_answer) {
      setAnsCorrect(true);
    }
  };

  const getCredentials = JSON.parse(localStorage.getItem("details"));
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [scrolled, setScroll] = useState(false);
  function logout() {
    localStorage.removeItem("details");
    window.location.reload();
  }
  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 20) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const details = JSON.parse(localStorage.getItem("details"));
  if (!details) {
    return <Navigate to="/login" />;
  }
  function prevQuestion() {
    if (currQuestion > 0) {
      setCurrQuestion((prev) => prev - 1);
    }
  }
  const [beginQuiz, setBeginQuiz] = useState(false);

  function startQuiz() {
    setBeginQuiz(true);
  }
  const goodReactions = [
    "1f389",
    "270c",
    "1f339",
    "1f64c",
    "1f44f",
    "2714",
    "2728",
    "1f38a",
  ];
  const badReactions = [
    "1f615",
    "1f614",
    "1f62d",
    "1f612",
    "1f620",
    "274c",
    "1f44e",
    "1f4a9",
  ];

  function nextQuestion() {
    if (showAns) {
      setCurrQuestion((prev) => prev + 1);
    }
  }

  function showReaction(ansCorrect, reactionType) {
    const reactions = reactionType === "good" ? goodReactions : badReactions;
    const randomIndex = Math.floor(Math.random() * reactions.length);
    const reactionCode = reactions[randomIndex];
    const reaction = String.fromCodePoint(parseInt(reactionCode, 16));

    return ansCorrect ? reaction : `${reaction}`;
  }
  return (
    <div className="Quizpage">
      <nav
        className={`navbar ${
          scrolled ? "bg-white filter:blur-md" : ""
        } bg-opacity-60 `}
      >
        <Link to={"/"}>
          <div className="logo font-bold">
            <img src={logo} alt="" /> <span className="text-xl">Quizzle</span>
          </div>
        </Link>

        <div>
          <button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            className="login--btn px-4 py-2  focus:ring-lime-500 font-bold"
          >
            {getCredentials.userName}
          </button>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            <div className="p-2 font-medium ">
              <p className="py-1">{getCredentials.userName}</p>
              <p className="py-1">{getCredentials.email}</p>
              <button
                onClick={logout}
                className="font-bold bg-red-200 my-2 px-4 py-1 rounded-lg"
              >
                Logout
              </button>
            </div>
          </Typography>
        </Popover>
      </nav>
      {!beginQuiz && !questions ? (
        <div className="cont flex align-middle justify-center ">
          <div className=" text-center grid place-items-center">
            <h2
              className="text-6xl font-bold"
              style={{ letterSpacing: "-0.06em" }}
            >
              Discover Your Inner Knowledge
            </h2>
            <p className="subHead">Take Our Fun and Engaging Quiz Today!</p>
            <div className="btn">
              <button
                onClick={startQuiz}
                className="bg-lime-500 font-semibold px-36 py-2 hover:bg-lime-600 transition-all duration-200 hover:text-white rounded-xl text-lime-100"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="Quizbody  box-border">
          <div className="questions h-fit ">
            <p
              style={{
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontSize: "0.7em",
              }}
              className="font-bold text-lime-700"
            >
              Question{" "}
              <span className="text-gray-400 ">{currQuestion + 1} of {questions.length}</span>
            </p>
          </div>
          <div className="question py-6">
            <h2 style={{ fontFamily: "Roboto" }} className="text-5xl font-bold">
              {questions[currQuestion].question}
            </h2>
          </div>
          <div className="options py-5">
            {questions[currQuestion].options.map((option, index) => {
              return (
                <button
                  className={`px-14 ring-1  ring-zinc-200 hover:bg-lime-200 disabled:border-lime-100 disabled:cursor-not-allowed transition-all duration-300 font-bold mr-2 rounded-2xl py-2 ${
                    selectedOption === option
                      ? "bg-lime-300 disabled:bg-lime-300"
                      : "bg-lime-0"
                  } `}
                  style={{
                    backgroundColor: showAns && "transparent",
                  }}
                  value={option}
                  disabled={showAns}
                  id="ansbtn"
                  onClick={(e) => handleOptionClick(e)}
                  key={index}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <div className="displayAns text-lg flex align-middle py-10 font-semibold">
            <p>
              Answer:{" "}
              {showAns ? (
                <span
                  className={`${
                    ansCorrect ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {questions[currQuestion].correct_answer}{" "}
                  {showReaction(ansCorrect, ansCorrect ? "good" : "bad")}
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="next--prev mt-5  flex justify-between">
            <button
              className={`px-14 ring-1 ring-zinc-200 hover:bg-gray-300 transition-all duration-300 text-zinc-900 bg-gray-300 font-bold mr-2 rounded-2xl py-2  ${
                currQuestion < 0
                  ? "bg-lime-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed "
              }`}
              onClick={prevQuestion}
              value="prev"
            >
              Prev
            </button>
            {!showAns ? (
              <button
                className={`px-14 ring-1 rounded-2xl ring-zinc-200  transition-all duration-300 text-white ${
                  selectedOption
                    ? "bg-lime-600"
                    : "bg-gray-300 text-gray-900 cursor-not-allowed "
                } font-bold mr-2 rounded-2xl py-2`}
                onClick={validateAnswer}
              >
                {selectedOption ? "Check Answer" : "Next"}
              </button>
            ) : (
              <button
                className="px-14 ring-1 ring-zinc-200 rounded-2xl  transition-all duration-300 text-white bg-lime-600"
                onClick={nextQuestion}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
