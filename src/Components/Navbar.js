import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {  HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import SSLogo from "../images/SquadScript.png";
import { useDispatch, useSelector } from "react-redux";
import {ReactComponent as Sun} from "../Icons/Sun.svg";
import {ReactComponent as Moon} from "../Icons/Moon.svg";
import { setMode } from "../Redux/ModeSlice";

function NavBar() {
  const [click, setClick] = useState(false);
  const [username, setusername] = useState("");
  const dispatch = useDispatch();
  const mode = useSelector((state)=>state.mode);

  const handlethemechange = () => {
    dispatch(setMode(!mode));
  }

  useEffect(() => {
    setusername(localStorage.getItem("username"));
  }, []);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar" >
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <img src={SSLogo} alt="/"></img>
            {/* <i className="fas fa-code"></i> */}
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink to="/" className="nav-links" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-links" onClick={handleClick}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/join" className="nav-links" onClick={handleClick}>
                Join
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              {username ? (
                <>
                  <NavLink
                    to="/profile"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    {username}
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </>
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
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuClose />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
