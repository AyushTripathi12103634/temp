import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./LoginSignup.css";
import LoginImg from "../images/login-image.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = () => {
  const [flipped, setFlipped] = useState(false);
  const { transform } = useSpring({
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 1, tension: 200, friction: 20 },
  });

  const [registername, setregistername] = useState("");
  const [registerusername, setregisterusername] = useState("");
  const [registeremail, setregisteremail] = useState("");
  const [registerpassword, setregisterpassword] = useState("");
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [islogin, setislogin] = useState(false);

  const navigate = useNavigate();

  const handleregistername = (e) => {
    setregistername(e.target.value);
  };

  const handleregisterusername = (e) => {
    setregisterusername(e.target.value);
  };

  const handleregisteremail = (e) => {
    setregisteremail(e.target.value);
  };

  const handleregisterpassword = (e) => {
    setregisterpassword(e.target.value);
  };

  const handleregisterdetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/register", {
        username: registerusername,
        name: registername,
        email: registeremail,
        password: registerpassword,
      });
      toast.success(`${response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setFlipped(!flipped);
    } catch (e) {
      toast.error(`Error ${e.response.status} :${e.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleloginemail = (e) => {
    setloginemail(e.target.value);
  };

  const handleloginpassword = (e) => {
    setloginpassword(e.target.value);
  };

  const handlelogindetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email: loginemail,
        password: loginpassword,
      });

      const t = res.data;
      if (t.success) {
        localStorage.setItem("auth", t.token);
        localStorage.setItem("name", t.user.name);
        localStorage.setItem("username", t.user.username);
        localStorage.setItem("email", t.user.email);
        localStorage.setItem("isVerified", String(t.user.isVerified));
        toast.success(`${t.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/");
      }
    } catch (e) {
      toast.error(`${e.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="whole-page">
      <div className="left-container">
        <div>
          <h3>Welcome to</h3>
          <h1>SquadScript</h1>
        </div>
      </div>
      <div className="middle-container">
        <img src={LoginImg} alt="login" />
      </div>
      <div className="right-container">
        <div className="card-container">
          <animated.div className="card back" style={{ transform }}>
            <div className="form-box">
              <div className="form-container">
                <form>
                  <div className="input-group">
                    <i className="fas fa-envelope icon"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      onChange={handleloginemail}
                      value={loginemail}
                    />
                  </div>
                  <div className="input-group">
                    <i className="fas fa-lock icon"></i>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      onChange={handleloginpassword}
                      value={loginpassword}
                    />
                  </div>
                  <button type="submit" onClick={handlelogindetails}>
                    Login
                  </button>
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </form>
                <p onClick={() => setFlipped((state) => !state)}>
                  Don't have an account? Sign Up
                </p>
              </div>
            </div>
          </animated.div>

          <animated.div
            className="card front"
            style={{ transform: transform.to((t) => `${t} rotateY(180deg)`) }}
          >
            <div className="form-box">
              <div className="form-container">
                <h2 className="form-heading">Sign Up</h2>
                <form>
                  <div className="input-group">
                    <i className="fas fa-user icon"></i>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      onChange={handleregisterusername}
                      value={registerusername}
                    />
                  </div>
                  <div className="input-group">
                    <i className="fas fa-id-card icon"></i>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      onChange={handleregistername}
                      value={registername}
                    />
                  </div>
                  <div className="input-group">
                    <i className="fas fa-envelope icon"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      onChange={handleregisteremail}
                      value={registeremail}
                    />
                  </div>
                  <div className="input-group">
                    <i className="fas fa-lock icon"></i>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      onChange={handleregisterpassword}
                      value={registerpassword}
                    />
                  </div>
                  <button type="submit" onClick={handleregisterdetails}>
                    Sign Up
                  </button>
                </form>
                <p onClick={() => setFlipped((state) => !state)}>
                  Already have an account? Login
                </p>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;