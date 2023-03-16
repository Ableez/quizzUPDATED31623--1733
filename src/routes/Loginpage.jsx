import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";
export default function Login() {
  const getCredentials = JSON.parse(localStorage.getItem("details"));
  const [start, setStart] = useState(false);
  const [credentials, setCredentials] = useState(
    getCredentials || {
      userName: "",
      email: "",
      subscribe: false,
    }
  );
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setCredentials((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(credentials);
    localStorage.setItem("details", JSON.stringify(credentials));
    const toStart = Object.values(credentials).every((elem) => elem);
    if (toStart && credentials) {
      setStart(true);
      setTimeout(() => {
        window.location.href = "/quiz";
      }, 2000);
    } else {
      setStart(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="relative w-full max-w-md space-y-8 bg-white shadow-sm p-8 rounded-3xl">
        {start ? (
          <div className="overlay  w-full h-full bg-opacity-50 z-30 rounded-3xl bg-white absolute top-0 left-0 p-10">
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </div>
        ) : (
          ""
        )}
        <Link to="/">
          <div className=" flex  align-middle justify-center">
          <img
            src={logo}
            alt="Quizzlet"
          /><p className="text-xl flex align-middle justify-center mx-2 font-semibold">Quizzle</p>
        </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign into Quizzle
          </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="userName" className="sr-only">
                Username
              </label>
              <input
                onChange={(event) => handleChange(event)}
                id="userName"
                name="userName"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                onChange={(event) => handleChange(event)}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center ">
              <input
                id="subscribe"
                name="subscribe"
                type="checkbox"
                onChange={(event) => handleChange(event)}
                className="h-4 w-4 rounded cursor-pointer border-gray-300 text-lime-600 focus:ring-lime-600"
              />
              <label
                htmlFor="subscribe"
                className="ml-2 block text-sm cursor-pointer text-gray-900"
              >
                Subscribe to my Newsletter
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`group z-50 relative flex w-full justify-center rounded-md ${
                start ? "bg-lime-400 " : "bg-lime-600"
              } py-2 px-3 text-sm font-semibold text-white hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 focus-visible:outline-lime-600`}
            >
              Sign in
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
