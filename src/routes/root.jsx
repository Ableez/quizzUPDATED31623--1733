import { Link, Outlet } from "react-router-dom";
import logo from "../assets/react.svg";
import { useEffect, useState } from "react";
import "../App.css";

import "../assets/fonts.css";
export default function Root() {
  const getCredentials = JSON.parse(localStorage.getItem("details"));
  const [scrolled, setScroll] = useState(false);
  console.log(getCredentials)
  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  function auth() {
    if(getCredentials){
      window.location.href = "/quiz";
    }else{
      window.location.href = "/login";
    }
  }

  return (
    <>
      <div className="App">
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
              onClick={auth}
              className="login--btn bg-lime-300 px-4 py-2 rounded-xl ring-lime-500 hover:bg-lime-200 transition-all duration-400 font-bold"
            >
              Get Started
            </button>
          </div>
        </nav>
        <div className="hero  text-center w-3/4 px-24 mt-36 mx-auto">
          <h2
            className="font-semibold text-6xl"
          >
            FEED YOUR MIND
          </h2>
        </div>
        <div className="cta mx-auto w-max text-center p-10">
          <p className="font-light mb-5 text-stone-800">
            Train you mind to its full potential with this quiz.
          </p>
          <button
            onClick={auth}
            className="login--btn bg-lime-300 px-20 py-3 rounded-xl ring-lime-500 hover:bg-lime-200 transition-all duration-400 font-bold"
          >
            Get Started
          </button>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
