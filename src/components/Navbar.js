import React, { useContext } from "react";
import { Link } from "gatsby";
import { AppContext } from "../AppProvider";

export default function Navbar() {
  const { isActive } = useContext(AppContext);

  return (
    <div>
      <Link to="/" state={{ isActive: isActive ? true : false }}>
        Index
      </Link>
      <Link to="/test" state={{ isActive: isActive ? true : false }}>
        Test
      </Link>
    </div>
  );
}
