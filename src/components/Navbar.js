import React from "react";
import { Link } from "gatsby";

export default function Navbar() {
  return (
    <div>
      <Link style={{ marginLeft: "20px" }} to="/">
        Index
      </Link>
      <Link style={{ marginLeft: "20px" }} to="/test">
        Test
      </Link>
      <Link style={{ marginLeft: "20px" }} to="/blog">
        Blog
      </Link>
    </div>
  );
}
