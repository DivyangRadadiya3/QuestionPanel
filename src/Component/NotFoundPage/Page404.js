import React from "react";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex items-center justify-center overflow-y-auto overflow-none text-center">
      <div className="">
        <h1 className="text-9xl  text-teal-900 ">404</h1>
        <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
        <p className="text-2xl pb-8 px-12 font-medium">
          The page you are looking for does not exist.
        </p>
        <NavLink to="/">
          <button className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-500 text-white font-semibold select-none px-6 py-3 rounded-md mr-6">
            HOME
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Page404;
