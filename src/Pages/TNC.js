import React, { useEffect } from "react";
import "./TNC.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";

const TNC = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });

    sr.reveal(".tnc-content", { interval: 200 });
  }, []);

  return (
    <>
      <Navbar />
      <div className="tnc-main">
        <div className="tnc-content">
          <div className="mx-5 mt-5 tnc-heading">
            <div>
              <h1>Terms and Conditions</h1>
            </div>
            <div>
              <p>Effective date: (yet to be announced)</p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>1. Acceptance of Terms</h3>
            </div>
            <div>
              <p>
                By accessing or using the SquadScript website ("Site") and its
                features, including but not limited to collaborative coding,
                video calls, and chats, you agree to abide by these Terms and
                Conditions. If you do not agree with any part of these terms,
                please refrain from using the Site.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>2. User Eligibility</h3>
            </div>
            <div>
              <p>
                You must be at least 13 years old to use SquadScript. By using
                the Site, you affirm that you are over 13 years old, and if you
                are under 18, you have obtained parental or legal guardian
                consent to use the Site.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>3. Account Registration and Security</h3>
            </div>
            <div>
              <p>
                To access certain features of SquadScript, you must register for
                an account. You agree to provide accurate, current, and complete
                information during the registration process. You are responsible
                for maintaining the confidentiality of your account credentials
                and are liable for all activities that occur under your account.
                If you suspect any unauthorized access to your account, you must
                notify SquadScript immediately.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>4. Collaborative Coding and User Content</h3>
            </div>
            <div>
              <p>
                a. SquadScript provides collaborative coding features, allowing
                users to edit code, compile, and work on projects together.
                Users are solely responsible for the content they create, share,
                or collaborate on within the platform.
                <br />
                <br />
                b. Users must respect intellectual property rights and refrain
                from sharing or collaborating on content that infringes on
                copyrights, trademarks, or any other proprietary rights.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>5. Video Calls, Chats, and Communication</h3>
            </div>
            <div>
              <p>
                a. The video call and chat features on SquadScript are meant for
                collaborative purposes. Users are expected to engage in
                respectful and professional communication.
                <br />
                <br />
                b. Users must not use the communication features for illegal,
                offensive, or harmful purposes. Any form of harassment,
                discrimination, or violation of privacy is strictly prohibited.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>6. Data Privacy and Security</h3>
            </div>
            <div>
              <p>
                a. Users acknowledge and agree to the terms outlined in
                SquadScript's Privacy Policy regarding the collection, use, and
                storage of personal information.
                <br />
                <br />
                b. Users are prohibited from attempting to breach the security
                of SquadScript, including unauthorized access to data,
                interference with services, or any malicious activities.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>7. Termination of Account</h3>
            </div>
            <div>
              <p>
                SquadScript reserves the right to suspend or terminate user
                accounts for violations of these Terms and Conditions. Users may
                also terminate their accounts at any time by following the
                provided procedures on the Site.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>8. Changes to Terms and Conditions</h3>
            </div>
            <div>
              <p>
                SquadScript may update these Terms and Conditions at any time
                without prior notice. Users will be notified of significant
                changes via email and upon their first login following the
                update. Continued use of the Site after such changes constitutes
                acceptance of the modified terms.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>9. Contact Information</h3>
            </div>
            <div>
              <p>
                For inquiries, concerns, or reporting violations, users can
                contact SquadScript developers through the{" "}
                <Link to="/contact">Contact</Link> page on the website or
                utilize the messaging features on the{" "}
                <Link to="/about">About</Link> page via LinkedIn.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 mt-5">
            <div>
              <h3>10. Governing Law</h3>
            </div>
            <div>
              <p>
                These Terms and Conditions are governed by and construed in
                accordance with the laws of India, without regard to its
                conflict of law principles.
              </p>
            </div>
          </div>
          <hr />
          <div className="mx-5 my-5">
            <div>
              <p>
                By using SquadScript, you agree to comply with these Terms and
                Conditions. Thank you for choosing SquadScript for your
                collaborative coding experience!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TNC;
