import React, { useState } from 'react';

const Meet = () => {
  const [meetingId, setMeetingId] = useState('');
  const [password, setPassword] = useState('');

  const handleJoinMeet = () => {
    console.log('Joining meeting with ID:', meetingId, 'and Password:', password);
  };

  return (
    <div>
      <h4 className="text-center mb-4">Join Meeting</h4>

      <div className="mb-3">
        <label htmlFor="meetingId" className="form-label">Enter Meeting ID</label>
        <input
          type="text"
          id="meetingId"
          className="form-control"
          placeholder="Enter Meeting ID"
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-success w-100" onClick={handleJoinMeet}>
        Join Meet
      </button>
    </div>
  );
};

export default Meet;
