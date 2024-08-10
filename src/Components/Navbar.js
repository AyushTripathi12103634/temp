import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import SSLogo from "../images/SquadScript.png";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Sun } from "../Icons/Sun.svg";
import { ReactComponent as Moon } from "../Icons/Moon.svg";
import { setMode } from "../Redux/ModeSlice";

function NavBar() {
  const [click, setClick] = useState(false);
  const [username, setusername] = useState("");
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const handlethemechange = () => {
    dispatch(setMode(!mode));
  };

  useEffect(() => {
    setusername(localStorage.getItem("username"));
  }, []);

  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <NavLink to="/">
            <img src={SSLogo} alt="SquadScript Logo" />
          </NavLink>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-links"
              onClick={() => setClick(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className="nav-links"
              onClick={() => setClick(false)}
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/join"
              className="nav-links"
              onClick={() => setClick(false)}
            >
              Join
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className="nav-links"
              onClick={() => setClick(false)}
            >
              Contact Us
            </NavLink>
          </li>
          <li className="nav-item">
            {username ? (
              <NavLink
                to="/profile"
                className="nav-links"
                onClick={() => setClick(false)}
              >
                {username}
              </NavLink>
            ) : (
              <NavLink
                to="/login-signup"
                className="nav-links"
                onClick={() => setClick(false)}
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>

        <div className="dark_mode">
          <input
            className="dark_mode_input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            onChange={handlethemechange}
          />
          <label
            className={`dark_mode_label form-check-label text-${
              mode === "light" ? "dark" : "light"
            }`}
            htmlFor="flexSwitchCheckDefault"
          >
            <Sun />
            <Moon />
          </label>
        </div>

        <div className="nav-icon me-5" onClick={handleClick}>
          {click ? (
            <span className="icon">
              <HamburgetMenuClose />
            </span>
          ) : (
            <span className="icon">
              <HamburgetMenuOpen />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
