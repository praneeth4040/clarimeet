import React, { useState } from 'react';

const Chatbot = ({ onClose }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      console.log('Message sent:', message); // Placeholder action
      setMessage('');
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
        justifyContent: 'flex-start', // Keep the content starting from the top
        alignItems: 'center', // Center horizontally
        fontSize: '20px',
        fontWeight: 'bold',
        zIndex: '1000',
        overflowY: 'scroll', // Add scroll feature
      }}
    >
      {/* Title at the top */}
      <div style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        Clarimeet Chatbot {/* Title */}
      </div>

      {/* Avatar and Welcome Message below the title */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '50px', // Adjusted size
            height: '50px', // Adjusted size
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto', // Center the avatar
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="Chatbot Avatar"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div style={{ marginTop: '10px', fontSize: '18px', textAlign: 'center' }}>
          Hey! How can I help you?
        </div>
      </div>

      {/* Floating Icon */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
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

      {/* Placeholder Input at the bottom */}
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
          onClick={handleSendMessage}
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
            src="https://cdn-icons-png.flaticon.com/512/892/892692.png"
            alt="Send"
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
