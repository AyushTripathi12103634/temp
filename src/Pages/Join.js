import axios from "axios";
// import Footer from '../Components/Footer';
import Navbar from "../Components/Navbar";
import "./Join.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./VC/API";

import gif from "../images/joingif.gif";
import MeetingView from "./MeetingView";
import JoinScreen from "./JoinScreen";

// route/:meet_id -> query

const Join = () => {
  const [meetingId, setMeetingId] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: username,
        }}
        token={authToken}
      >
        <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
      </MeetingProvider>
    </>
  ) : (
    <>
      <Navbar />
      <div className="join-main">
        <div className="join-content">
          <div className="join-left-container">
            <div className="join-left-heading ">
              <h1>Connect Indulge And Develop</h1>
            </div>
            <div className="join-left-content ">
              <span>
                Our enhanced premium group project meeting platform, originally
                designed for secure business engagements as Squad Script, is now
                available to a broader audience at no cost.
              </span>
            </div>
            <JoinScreen getMeetingAndToken={getMeetingAndToken} />
          </div>
          <div className="join-right-container">
            <img src={gif} alt="" />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Join;
