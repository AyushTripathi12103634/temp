import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import ScrollReveal from "scrollreveal";
import "./Landing.css";
import DashedCloud from "../images/DashedCloud.png";
import { Link } from "react-router-dom";
import codergif from "../images/codergif.gif";

const Landing = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(".Landing-content1, .Landing-content2", { interval: 200 });
  }, []);

  return (
    <>
      <Navbar bgColor="#040514" color="#4BC286" />
      <div className="Landing-main-section">
        <div className="Landing-content">
          <div className="Landing-content1">
            <img src={codergif} alt="" />
          </div>
          <div className="Landing-content2">
            <div className="Landing-content2a">
              <h1>
                Unleash Innovation:
                <img src={DashedCloud} alt="" />
              </h1>
              <p>
                Where Growth Meets Scripting in <span>Perfect Harmony...</span>
              </p>
            </div>
            <div className="Landing-content2b">
              <div className="Landing-content2bButton">
                <Link to="/join" className="nav-links">
                  <button>Get Started</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
