import React from "react";
import { Link } from "react-router-dom";
import home from "../../images/home.png";

const BackHome = () => {
  return (
    <Link
      to="/"
      className="rounded-full border-2 border-blue-600 p-2 fixed left-10 bottom-10"
    >
      <img src={home} alt="home" width={30} height={30} />
    </Link>
  );
};

export default BackHome;
