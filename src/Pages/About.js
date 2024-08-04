import React, { useEffect } from "react";
import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer.js";
import ScrollReveal from "scrollreveal";
import "./About.css";
import { BiLogoLinkedin, BiLogoGithub } from "react-icons/bi";
import { Link } from "react-router-dom";
import About1 from "../images/About1.png";
import About2 from "../images/About2.png";

function About() {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(".new-about-main-card", { interval: 200 });
  }, []);

  return (
    <>
      <Navbar />
      <div className="new-about-main-section">
        <div className="new-about-main-div">
          <div className="new-about-main-card">
            <div className="new-about-card">
              <div className="new-about-card-image">
                <img src={About1} alt="Ayush Tripathi"></img>
              </div>
              <div className="new-about-card-info">
                <h1>Ayush Tripathi</h1>
                <h6>Full Stack Developer</h6>
                <div className="new-about-card-icons">
                  <Link
                    to="https://www.linkedin.com/in/ayush-tripathi-039a20220"
                    target="_blank"
                  >
                    <BiLogoLinkedin className="new-about-logo" />
                  </Link>
                  <Link
                    to="https://www.github.com/ayushtripathi12103634"
                    target="_blank"
                  >
                    <BiLogoGithub className="new-about-logo" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="new-about-main-card">
            <div className="new-about-card">
              <div className="new-about-card-image">
                <img src={About2} alt="Mohak Tiwari"></img>
              </div>
              <div className="new-about-card-info">
                <h1>Mohak Tiwari</h1>
                <h6>Full Stack Developer</h6>
                <div className="new-about-card-icons">
                  <Link
                    to="https://www.linkedin.com/in/mohak-tiwari-b78198226/"
                    target="_blank"
                  >
                    <BiLogoLinkedin className="new-about-logo" />
                  </Link>
                  <Link to="https://www.github.com/mohak1301" target="_blank">
                    <BiLogoGithub className="new-about-logo" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
