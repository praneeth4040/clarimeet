import React, { useState } from 'react';
import Video from './video'; // Correct path
import Meet from './record'; // Correct path for your recording functionality
import Notepad from './notepad'; // Correct path for Notepad component

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
    <div className="container-fluid" style={{ height: '100vh' }}>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Clarimeet
          </a>
        </div>
      </nav>

      <div className="row justify-content-center align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
        <div className="col-md-4">
          <div className="d-flex mb-3 justify-content-center">
            <button className="btn btn-primary me-3" onClick={handleMeetClick}>Meet</button> {/* Added margin-right */}
            <button type="button" className="btn btn-warning me-3" onClick={handleVideoClick}>Video</button> {/* Added margin-right */}
            <button className="btn btn-info" onClick={handleNotepadClick}>Notepad</button> {/* No margin needed here */}
          </div>

          {/* Conditionally render Meet, Video, or Notepad */}
          {showMeet && <Meet />}
          {showNotepad && <Notepad />}
          {!showMeet && !showNotepad && <Video />} {/* Default to Video if neither Meet nor Notepad is selected */}
        </div>
      </div>
    </div>
  );
};

export default Page;


