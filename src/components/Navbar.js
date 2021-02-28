import React, { useContext } from "react";
import { Link } from "gatsby";
import { AppContext } from "../AppProvider";

export default function Navbar() {
  const { isActive } = useContext(AppContext);

  return (
    <div>
      <Link
        style={{ marginLeft: "20px" }}
        to="/"
        state={{ isActive: isActive ? true : false }}
      >
        Index
      </Link>
      <Link
        style={{ marginLeft: "20px" }}
        to="/test"
        state={{ isActive: isActive ? true : false }}
      >
        Test
      </Link>
      <Link
        style={{ marginLeft: "20px" }}
        to="/blog"
        state={{ isActive: isActive ? true : false }}
      >
        Blog
      </Link>
    </div>
  );
}
