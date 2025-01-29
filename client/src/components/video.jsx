import React from 'react';

const Video = () => {
  return (
    <div>
      <h4 className="text-center mb-4">Upload Video</h4>

      <div className="mb-3">
        <label htmlFor="videoFile" className="form-label">Upload Video</label>
        <input
          type="file"
          id="videoFile"
          className="form-control"
          placeholder="Choose Video"
        />
      </div>

      <button className="btn btn-success w-100">Upload Video</button>
    </div>
  );
};

export default Video;
