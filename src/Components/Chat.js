import React, {useState} from 'react';
import "./Chat.css";
import { useSelector} from "react-redux";

const Chat = () => {
  const [input, setInput] = useState('');
  const mode = useSelector((state)=>state.mode);

  return (
    <>
    <div>
        <div></div>
        <div>
            <input className='form-control' placeholder='Enter Message' onChange={(e)=>setInput(e.target.value)}></input>
            <button className={`btn btn-${mode? 'dark':'light'}`} disabled={input===''}>Send</button>
        </div>
    </div>
    </>
  )
}

export default Chat