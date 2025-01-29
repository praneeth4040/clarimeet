import React, { useState } from 'react';
import Meet from './meet'; // Correct path
import Video from './video'; // Correct path

const Page = () => {
  const [showMeet, setShowMeet] = useState(true);

  const handleMeetClick = () => {
    setShowMeet(true);
  };

  const handleVideoClick = () => {
    setShowMeet(false);
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
            <button className="btn btn-primary me-2" onClick={handleMeetClick}>Meet</button>
            <button type="button" className="btn btn-warning" onClick={handleVideoClick}>Video</button>
          </div>

          {/* Conditionally render Meet or Video component */}
          {showMeet ? <Meet /> : <Video />}
        </div>
      </div>
    </div>
  );
};

export default Page;
