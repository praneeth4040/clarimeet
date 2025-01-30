import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = ({ onClose }) => {
  const [message, setMessage] = useState(''); // Holds the current message in the input field
  const [messages, setMessages] = useState([]); // Holds the list of all messages
  const [transcript, setTranscripted] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleArrowButtonClick = async () => {
    if (message.trim() !== '') {
      // Add the message to the messages array when the arrow button is clicked
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage(''); // Clear the input after sending

      try {
        // API call to get the chatbot response
        const response = await axios.get(`http://127.0.0.1:8000/send_res?question=${message}&transcript=${transcript}`);
        console.log(response.data);

        const botResponse = response.data.ai_response; // Extracting the ai_response property

        // Add the bot response to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: 'bot' },
        ]);
      } catch (error) {
        console.error("Error fetching bot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error fetching bot response", sender: 'bot' },
        ]);
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '400px',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        zIndex: '1000',
        overflowY: 'scroll',
      }}
    >
      {/* Title and Back Button */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Back Button */}
        <button
          onClick={onClose}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#007bff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/545/545682.png" // Upward arrow icon (same as the back button)
            alt="Back"
            style={{ width: '24px', height: '24px' }}
          />
        </button>

        {/* Chatbot Title */}
        <div style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          Clarimeet Chatbot
        </div>
      </div>

      {/* Chatbot Avatar */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '50px', // Avatar size
            height: '50px', // Avatar size
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto', // Center the avatar
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" // Chatbot avatar
            alt="Chatbot Avatar"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Messages Display */}
      <div
        style={{
          flex: 1,
          width: '100%',
          overflowY: 'auto',
          paddingBottom: '50px', // Add space at the bottom to avoid the text being hidden
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              padding: '5px',
              margin: '5px 0',
            }}
          >
            <span
              style={{
                backgroundColor: msg.sender === 'user' ? '#007bff' : '#ccc',
                color: msg.sender === 'user' ? '#fff' : '#000',
                padding: '8px 12px',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: 'normal',
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Field and Arrow Button */}
      <div
        style={{
          width: '100%',
          position: 'absolute',
          bottom: '20px',
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          backgroundColor: '#f1f1f1',
          borderRadius: '5px',
        }}
      >
        <textarea
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{
            flex: '1',
            height: '50px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
            resize: 'none',
          }}
        />

        {/* Circular Send Button with Image */}
        <button
          onClick={handleArrowButtonClick} // Trigger sending the message
          style={{
            marginLeft: '10px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#007bff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/545/545682.png" // Upward arrow icon
            alt="Up"
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
