import React, { useState } from 'react';

const App = () => {
  // State for storing Meeting ID and Password
  const [meetingId, setMeetingId] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle join button click
  const handleJoinMeet = () => {
    // Log a message in the console when the button is clicked
    console.log('Joining meeting with ID:', meetingId, 'and Password:', password);
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
          <h4 className="text-center mb-4">Join Meeting</h4>

          <div className="d-flex mb-3 justify-content-center">
            <button className="btn btn-primary me-2">Meet</button>
            <button type="button" className="btn btn-warning">Video</button>
          </div>

          <div className="mb-3">
            <label htmlFor="meetingId" className="form-label">Enter Meeting ID</label>
            <input 
              type="text" 
              id="meetingId" 
              className="form-control" 
              placeholder="Enter Meeting ID"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)} // Update state on input change
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Enter Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
            />
          </div>

          <button className="btn btn-success w-100" onClick={handleJoinMeet}>
            Join Meet
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;


// import React, { useState } from 'react';

// const App = () => {
//   // State for storing Meeting ID and Password
//   const [meetingId, setMeetingId] = useState('');
//   const [password, setPassword] = useState('');

//   // Function to handle join button click
//   const handleJoinMeet = () => {
//     // Check if both fields are filled
//     if (meetingId && password) {
//       // Create the Zoom meeting URL
//       const zoomUrl = `https://zoom.us/j/${meetingId}?pwd=${password}`;
//       // Redirect to Zoom meeting page
//       window.location.href = zoomUrl;
//     } else {
//       alert('Please fill in both the Meeting ID and Password.');
//     }
//   };

//   return (
//     <div className="container-fluid" style={{ height: '100vh' }}>
//       <nav className="navbar navbar-light bg-light">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">
//             Clarimeet
//           </a>
//         </div>
//       </nav>

//       <div className="row justify-content-center align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
//         <div className="col-md-4">
//           <h4 className="text-center mb-4">Join Meeting</h4>

//           <div className="d-flex mb-3 justify-content-center">
//             <button className="btn btn-primary me-2">Meet</button>
//             <button className="btn btn-secondary">Video</button>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="meetingId" className="form-label">Enter Meeting ID</label>
//             <input 
//               type="text" 
//               id="meetingId" 
//               className="form-control" 
//               placeholder="Enter Meeting ID"
//               value={meetingId}
//               onChange={(e) => setMeetingId(e.target.value)} // Update state on input change
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Enter Password</label>
//             <input 
//               type="password" 
//               id="password" 
//               className="form-control" 
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} // Update state on input change
//             />
//           </div>

//           <button className="btn btn-success w-100" onClick={handleJoinMeet}>
//             Join Meet
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
