import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Join.css'

export default function JoinScreen({ getMeetingAndToken }) {
    const [meetid, setmeetid] = useState(null);
    const navigate = useNavigate();
  
    const join = async (e) => {
      e.preventDefault();
      if (!meetid) {
        toast.error('Meeting ID is required', {
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
        await getMeetingAndToken(meetid);
      }
    };
  
    const create = async (e) => {
      e.preventDefault();
      await getMeetingAndToken(null);
    };
  
    return (
      <div className='meet-join'>
        <form className='join-meet'>
          <div className="joinscreen-form">
          <input
            className='form-control w-50'
            placeholder='Enter meet id'
            onChange={(e) => setmeetid(e.target.value)}
          />
          <button className='btn join-button' onClick={join}>Join</button>
          </div>
        </form>
        
        <form className='create-meet'>
          <button className='btn create-button 30' onClick={create}>Create a new meeting</button>
        </form>
      </div>
    );
  }