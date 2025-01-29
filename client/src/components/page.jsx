import React, { useState } from 'react';
import Video from './video'; // Correct path
import Meet from './record'; // Correct path for your recording functionality
import Notepad from './notepad'; // Correct path for Notepad component
import bgImage from './assets/bg.png.jpg'; // Import background image

const Page = () => {
  const [showMeet, setShowMeet] = useState(true);
  const [showNotepad, setShowNotepad] = useState(false); // State for Notepad visibility

  const handleMeetClick = () => {
    setShowMeet(true);
    setShowNotepad(false); // Hide Notepad when showing Meet
  };

  const handleVideoClick = () => {
    setShowMeet(false);
    setShowNotepad(false); // Hide Notepad when showing Video
  };

  const handleNotepadClick = () => {
    setShowNotepad(true); // Show Notepad
    setShowMeet(false); // Hide Meet
  };

  return (
    <div className="container-fluid" style={{ height: '100vh', position: 'relative' }}>
      {/* Background image with blur */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(5px)', // Add blur to background only
          zIndex: -1, // Place the background behind the content
        }}
      ></div>

      {/* Overlay to increase contrast for content */}
      <div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for better contrast
          zIndex: -2, // Place overlay behind the content but in front of the image
        }}
      ></div>

      {/* Main Content */}
      <div className="row justify-content-center align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
        <div className="col-md-4" style={{ zIndex: 1, position: 'relative' }}>
          <div
            className="d-flex mb-3 justify-content-center"
            style={{
              zIndex: 1,
              color: 'white', // Ensure buttons and text are white
            }}
          >
            <button
              className="btn btn-primary me-3"
              onClick={handleMeetClick}
              style={{ zIndex: 1, color: 'white' }} // White text on buttons
            >
              Meet
            </button>
            <button
              type="button"
              className="btn btn-warning me-3"
              onClick={handleVideoClick}
              style={{ zIndex: 1, color: 'white' }} // White text on buttons
            >
              Video
            </button>
            <button
              className="btn btn-info"
              onClick={handleNotepadClick}
              style={{ zIndex: 1, color: 'white' }} // White text on buttons
            >
              Notepad
            </button>
          </div>

          {/* Conditionally render Meet, Video, or Notepad */}
          {showMeet && <Meet />}
          {showNotepad && <Notepad />}
          {!showMeet && !showNotepad && <Video />}
        </div>
      </div>
    </div>
  );
};

export default Page;



