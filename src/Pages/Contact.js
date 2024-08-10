import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [check, setCheck] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(".contact-heading, .contact-form", { interval: 200 });
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleCheck = (e) => {
    setCheck(e.target.checked);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (check && email === localStorage.getItem("email")) {
        const header = {
          authorization: localStorage.getItem("auth"),
        };
        const response = await axios.post(
          "/api/v1/auth/contact",
          {
            email: email,
            content: content,
            type: type,
          },
          { headers: header }
        );
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
      } else if (check && email !== localStorage.getItem("email")) {
        toast.warning("Enter correct mail address", {
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
      } else {
        toast.warning("Accept the Terms and Conditions", {
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
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
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
    <>
      <Navbar />
      <div className="contact-main">
        <div className="contact-content">
          <div className="contact-heading mt-5 mb-5">
            <h1>Contact Us</h1>
          </div>
          <div className="contact-form mt-5">
            <form>
              <select
                className="form-control w-75 mx-auto mt-5"
                onChange={handleType}
              >
                <option value="default">Select type of message</option>
                <option value="complaint">Complaint</option>
                <option value="suggestion">Suggestion</option>
                <option value="enquiry">Enquiry</option>
              </select>
              <input
                className="form-control w-75 mx-auto mt-3"
                placeholder="Enter Email Address"
                onChange={handleEmail}
              ></input>
              <textarea
                className="form-control w-75 mx-auto mt-3 h-100"
                placeholder="Enter Content"
                onChange={handleContent}
              ></textarea>
              <div className="form-submit">
                <div className="contact-form-check mt-4">
                  <input
                  
                    type="checkbox"
                    name="check"
                    onChange={handleCheck}
                  ></input>
                  <label htmlFor="check" className="ms-2">
                    I agree to all <Link to="/tnc">Terms and Conditions</Link>
                  </label>
                </div>
                <button
                  className="btn btn-success mx-auto mt-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
