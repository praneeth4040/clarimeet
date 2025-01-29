import React, { useState } from 'react';

const Notepad = () => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState(localStorage.getItem('meetingNotes') || '');

  const handleChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('meetingNotes', notes); // Save notes to localStorage
    setSavedNotes(notes);
    alert('Notes saved!');
  };

  const handleClear = () => {
    setNotes('');
    setSavedNotes('');
    localStorage.removeItem('meetingNotes'); // Remove notes from localStorage
  };

  return (
    <div style={{ color: 'white' }}>
      <h3>Meeting Notepad</h3>
      <textarea
        value={notes}
        onChange={handleChange}
        rows="10"
        cols="50"
        placeholder="Write down important points here..."
        style={{
            color: 'white',
            backgroundColor: 'transparent', // Make background transparent for the textarea
            border: 'white', // Optional: Remove border to blend with the background
          }}// white text and dark background
      />
      <br />
      <button
        className="btn btn-success mt-2"
        onClick={handleSave}
        style={{ color: 'white' }} // button text color to white
      >
        Save Notes
      </button>
      <button
        className="btn btn-danger mt-2 ms-2"
        onClick={handleClear}
        style={{ color: 'white' }} // button text color to white
      >
        Clear Notes
      </button>

      {savedNotes && (
        <div className="mt-3">
          <h5>Saved Notes:</h5>
          <p>{savedNotes}</p>
        </div>
      )}
    </div>
  );
};

export default Notepad;
