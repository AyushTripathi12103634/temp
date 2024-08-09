import React, { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { useParticipant } from "@videosdk.live/react-sdk";
import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from "react-icons/hi2";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import "./ParticipantView.css"

export default function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="video">
      <p>
        Participant: {displayName} |{" "}
        {webcamOn ? <HiMiniVideoCamera /> : <HiMiniVideoCameraSlash />} | Mic:{" "}
        {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
      </p>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn ? (
        <ReactPlayer
          //
          playsinline // extremely crucial prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"200px"}
          width={"200px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      ) : (
        <div className="align-items-center">
          <p className="text-light">{displayName}</p>
        </div>
      )}
    </div>
  );
}
