import React, { useState, useEffect } from 'react';
import './Chat.css';

const Chat = ({ socket, room }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off('message');
      }
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', { room, text: input, username: localStorage.getItem('username') });
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <h6>{msg.username}</h6>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
