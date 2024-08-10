import Navbar from "../Components/Navbar";
import "./Profile.css";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [isverified, setisverified] = useState("");
  const [edit, setedit] = useState(false);
  const [show, setshow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setname(localStorage.getItem("name"));
    setusername(localStorage.getItem("username"));
    setemail(localStorage.getItem("email"));
    setisverified(localStorage.getItem("isVerified"));
  }, []);

  const handlelogout = () => {
    localStorage.clear(); // Clear all local storage items
    toast.success("Logged Out", {
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
    navigate("/login-signup");
  };

  const handleedit = () => {
    setedit(!edit);
  };

  const handlesave = async () => {
    setedit(!edit);
    const headers = {
      Authorization: localStorage.getItem("auth"),
    };
    try {
      const response = await axios.post(
        "/api/v1/auth/islogin",
        { name, email, username },
        { headers }
      );
      if (response.data.success) {
        localStorage.setItem("name", response.data.data[1]);
        localStorage.setItem("email", response.data.data[2]);
        localStorage.setItem("username", response.data.data[0]);
        localStorage.setItem("isVerified", response.data.data[3]);
        toast.success("User Details Updated successfully", {
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
        toast.error("Details updation failed. Try again or contact admin", {
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
      toast.error("An error occurred. Try again or contact admin", {
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

  const handleInputChange = (e, setter) => {
    setter(e.target.innerText);
  };

  const handledelete = async () => {
    if (
      window.confirm(
        "Are you sure to delete your account? This action cannot be reversed"
      )
    ) {
      const headers = {
        Authorization: localStorage.getItem("auth"),
      };
      try {
        const response = await axios.post(
          "/api/v1/auth/deleteuser",
          {},
          { headers }
        );
        if (response.data.success) {
          toast.success("User Deleted successfully", {
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
          localStorage.clear(); // Clear all local storage items
          navigate("/login-signup");
        } else {
          toast.error("Failed to Delete User. Try again or contact admin", {
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
        toast.error("An error occurred. Try again or contact admin", {
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
    }
  };

  const verifyuser = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("auth"),
      };
      const response = await axios.post(
        "/api/v1/auth/sendotp",
        { email },
        { headers }
      );
      if (response.data.success) {
        const otp = prompt("Enter OTP");
        const res = await axios.post(
          "/api/v1/auth/verifyotp",
          { email, otp },
          { headers }
        );
        if (res.data.success) {
          localStorage.setItem("isVerified", "true");
          setisverified("true");
          toast.success("User Verification Successful", {
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
          toast.error("Failed to Verify User. Try again or contact admin", {
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

  const handleoption = () => {
    setshow(!show);
  };

  return (
    <>
      <Navbar />
      <div className="profile-main">
        <div className="profile-content">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Name:</strong>
                </td>
                <td>
                  {edit ? (
                    <span
                      contentEditable
                      onBlur={(e) => handleInputChange(e, setname)}
                    >
                      {name}
                    </span>
                  ) : (
                    name
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Username:</strong>
                </td>
                <td>
                  {edit ? (
                    <span
                      contentEditable
                      onBlur={(e) => handleInputChange(e, setusername)}
                    >
                      {username}
                    </span>
                  ) : (
                    username
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>
                  {edit ? (
                    <span
                      contentEditable
                      onBlur={(e) => handleInputChange(e, setemail)}
                    >
                      {email}
                    </span>
                  ) : (
                    email
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Verified:</strong>
                </td>
                <td>
                  {isverified}
                  {isverified === "true" ? (
                    <button className="btn btn-dark" disabled>
                      Verified
                    </button>
                  ) : (
                    <button className="btn btn-dark" onClick={verifyuser}>
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="edit-options">
            <button className="btn btn-dark" onClick={handleoption}>
              {show ? "Hide options" : "Show more options"}
            </button>
          </div>
          {show && (
            <div className="profile-buttons">
              
                {edit ? (
                  <div className="profile-save-btn">
                  <button className="btn btn-dark" onClick={handlesave}>
                    Save Details
                  </button>
                  </div>
                ) : (
                  <div className="profile-edit-btn">
                  <button className="btn btn-dark" onClick={handleedit}>
                    Edit Details
                  </button>
                  </div>
                )}
                <div className="profile-logout-btn">
                <button className="btn btn-danger" onClick={handlelogout}>
                  Logout
                </button>
                </div>
                <div className="profile-delete-btn">
                <button className="btn btn-danger" onClick={handledelete}>
                  Delete Profile
                </button>
                </div>
              
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
