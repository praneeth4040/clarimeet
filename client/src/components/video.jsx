import React from 'react';

const Video = () => {
  return (
    <div>
      <h4 className="text-center mb-4" style={{ color: 'white' }}>Upload Video</h4>

      <div className="mb-3">
        <label htmlFor="videoFile" className="form-label"style={{ color: 'white' }}>Upload Video</label>
        <input
          type="file"
          id="videoFile"
          className="form-control"
          placeholder="Choose Video"
        />
      </div>

      <button className="btn btn-success w-100"style={{ color: 'white' }}>Upload Video</button>
    </div>
  );
};

export default Video;
