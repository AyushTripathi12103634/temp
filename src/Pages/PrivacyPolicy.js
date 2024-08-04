import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./PrivacyPolicy.css";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";

const PrivacyPolicy = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(".privacy-content", { interval: 200 });
  }, []);

  return (
    <>
      <Navbar />
      <div className="privacy-main">
        <div className="privacy-content">
          <div className="mx-5 mt-5 privacy-heading">
            <div>
              <h1>Privacy Policy</h1>
            </div>
            <div>
              <p>Effective date: (yet to be announced)</p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>Introduction</h3>
            </div>
            <div>
              <p>
                Welcome to SquadScript, your collaborative coding platform. This
                comprehensive Privacy Policy outlines how we handle user data to
                ensure a secure and enjoyable experience on our platform. It
                details the purpose of data collection, use, and storage
                practices, as well as other key aspects like third-party access,
                retention periods, policy changes, and compliance with relevant
                laws. Please take a moment to familiarize yourself with this
                policy to understand how your personal information is treated.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>Identification of Site and Site Owner</h3>
            </div>
            <div>
              <p>
                SquadScript is meticulously crafted by two dedicated developers,
                and our site is co-owned by these individuals. For additional
                information about the developers and their commitment to
                providing an exceptional user experience, please refer to the{" "}
                <Link to="/about">About</Link> page on our website.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>Data Collection</h3>
            </div>
            <div>
              <p>
                In order to offer our collaborative coding features seamlessly,
                we collect specific personal information during the signup
                process. This includes your email, a securely hashed password,
                your name, and a profile photo. The secure storage of passwords
                is ensured through our MongoDB database, which is accessible
                only to authorized developers. This information is essential for
                user registration and identity verification.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>Purpose of Data Collection</h3>
            </div>
            <div>
              <p>
                Your data is exclusively stored for the purpose of identity
                verification and to facilitate seamless collaboration on our
                platform. The collaborative features, including the
                collaborating code editor and compiler, video call, and screen
                sharing, rely on this information to enhance your collaborative
                coding experience.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>Third-Party Access</h3>
            </div>
            <div>
              <p>
                The only third-party entity with access to our stored data is
                MongoDB, the trusted company hosting our database. We ensure
                that their practices align with our commitment to user privacy
                and security.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>Data Sharing</h3>
            </div>
            <div>
              <p>
                We do not share user data with any third-party entities. Your
                information remains confidential and is used solely for the
                functionalities provided on our collaborative coding platform.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>User Rights</h3>
            </div>
            <div>
              <p>
                Users have the right to submit complaints or queries to the
                developers via the <Link to="/contact">Contact</Link> page.
                Additionally, users have the right to inquire about the use of
                their data, especially in the context of collaborative features
                like code editing, compiling, video calls, and screen sharing.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>Retention Period</h3>
            </div>
            <div>
              <p>
                Your personal information will be retained until you choose to
                delete your profile and discontinue using the website. This
                ensures that your collaborative projects and coding history are
                available for your convenience.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>Policy Changes</h3>
            </div>
            <div>
              <p>
                Any modifications to this policy will be communicated via email
                and prominently announced on the website upon the user's first
                login following the update. We are committed to transparency and
                will keep you informed about any changes that may affect your
                privacy and user experience.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>Contact Information</h3>
            </div>
            <div>
              <p>
                For any concerns or inquiries, users can contact the developers
                through the <Link to="/contact">Contact</Link> page to email any
                issues or utilize the <Link to="/about">About</Link> page to
                send messages via LinkedIn. We value your feedback and are
                dedicated to providing a secure and collaborative coding
                environment for our users.
              </p>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
