import React, { useEffect, useState } from "react";
import Controls from "../Components/Controls";
import ParticipantView from "../Components/ParticipantView";
import Compiler from "../Components/Compiler";
import Chat from "../Components/Chat";
import { io } from "socket.io-client";
import { useMeeting } from "@videosdk.live/react-sdk";
import "./MeetingView.css";

export default function MeetingView({ meetingId, onMeetingLeave }) {
  const [joined, setJoined] = useState(null);
  const { join, participants } = useMeeting({
    onMeetingJoined: () => setJoined("JOINED"),
    onMeetingLeft: onMeetingLeave,
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const room = meetingId;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("join room", room);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("Disconnected from server");
    };
  }, [room]);

  return (
    <div className="meeting-main">
      <div className="vc-main">
        <div className="heading-meet">
          <h3>Meeting Id: {meetingId}</h3>
        </div>
        {joined === "JOINED" ? (
          <div className="video-vc">
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        ) : joined === "JOINING" ? (
          <p className="text-light">Joining the meeting...</p>
        ) : (
          <button className="btn btn-dark" onClick={joinMeeting}>
            Join
          </button>
        )}
      </div>
      {joined === "JOINED" && (
        <div className="join-page">
          <div className="compiler-side">
            <Compiler socket={socket} room={room} />
          </div>
          <div className="chat-side">
            <Chat socket={socket} room={room} />
          </div>
        </div>
      )}
      {joined === "JOINED" && <Controls />}
    </div>
  );
}
