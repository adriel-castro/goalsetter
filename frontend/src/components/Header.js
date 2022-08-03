import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <section>
        <h2>
          <Link to="/">Goalsetter</Link>
        </h2>
      </section>
      <section>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Header;
