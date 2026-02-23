import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="w-svw h-svh flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl font-semibold">404</h1>
        <p className="text-lg">Page Not Found</p>
        <Link
          className="btn btn--small btn--primary max-w-45 mt-5 mx-auto"
          to={"/"}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
