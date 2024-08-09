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
    <div className="loginsignup-whole-page">
      <div className="loginsignup-left-container">
        <div>
          <h3>Welcome to</h3>
          <h1>SquadScript</h1>
        </div>
      </div>
      <div className="loginsignup-middle-container">
        <img src={LoginImg} alt="login" />
      </div>
      <div className="loginsignup-right-container">
        <div className="loginsignup-card-container">
          <animated.div
            className="loginsignup-card loginsignup-back"
            style={{ transform }}
          >
            <div className="loginsignup-form-box">
              <div className="loginsignup-form-container">
                <form>
                  <div className="loginsignup-input-group">
                    <i className="fas fa-envelope loginsignup-icon"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      onChange={handleloginemail}
                      value={loginemail}
                    />
                  </div>
                  <div className="loginsignup-input-group">
                    <i className="fas fa-lock loginsignup-icon"></i>
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
                  <Link
                    to="/forgot-password"
                    className="loginsignup-forgot-password"
                  >
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
            className="loginsignup-card loginsignup-front"
            style={{ transform: transform.to((t) => `${t} rotateY(180deg)`) }}
          >
            <div className="loginsignup-form-box">
              <div className="loginsignup-form-container">
                <h2 className="loginsignup-form-heading">Sign Up</h2>
                <form>
                  <div className="loginsignup-input-group">
                    <i className="fas fa-user loginsignup-icon"></i>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      onChange={handleregisterusername}
                      value={registerusername}
                    />
                  </div>
                  <div className="loginsignup-input-group">
                    <i className="fas fa-id-card loginsignup-icon"></i>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      onChange={handleregistername}
                      value={registername}
                    />
                  </div>
                  <div className="loginsignup-input-group">
                    <i className="fas fa-envelope loginsignup-icon"></i>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      onChange={handleregisteremail}
                      value={registeremail}
                    />
                  </div>
                  <div className="loginsignup-input-group">
                    <i className="fas fa-lock loginsignup-icon"></i>
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
