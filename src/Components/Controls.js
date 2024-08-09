import { HiMiniVideoCamera } from "react-icons/hi2";
import { FaMicrophone, FaPhoneSlash } from "react-icons/fa";
import {
  useMeeting,
} from "@videosdk.live/react-sdk";

export default function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div className='meet-controls d-flex justify-content-center  pt-4'>
      <button className='btn btn-dark' onClick={() => toggleMic()}><FaMicrophone /></button>
      <button className='btn btn-dark ms-3' onClick={() => toggleWebcam()}><HiMiniVideoCamera /></button>
      <button className='btn btn-danger ms-3' onClick={() => leave()}><FaPhoneSlash /></button>
    </div>
  );
}