import React from "react";

const Navbar = (): JSX.Element => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* change these to links with react-router-dom */}
        <div className="left-side">

        <a className="navbar-brand">Issue Tracker</a>
        </div>

        <div className="right-side">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Issues
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
