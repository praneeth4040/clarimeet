import React, { useState, useEffect } from 'react';

const Meet = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  // Initialize MediaRecorder once component is mounted
  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (event) => {
            setAudioChunks(prevChunks => [...prevChunks, event.data]);
          };
          recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            setAudioUrl(URL.createObjectURL(audioBlob));
          };
          setMediaRecorder(recorder);
        })
        .catch(err => {
          console.error("Error accessing microphone: ", err);
        });
    }
  }, [audioChunks]);

  // Start recording for 15 seconds
  const handleStartRecording = () => {
    if (mediaRecorder) {
      setAudioChunks([]); // Reset previous chunks
      mediaRecorder.start();
      setIsRecording(true);

      setTimeout(() => {
        handleStopRecording(); // Stop recording after 15 seconds
      }, 15000);
    }
  };

  // Stop recording and save the audio
  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <h4 className="text-center mb-4">Record Audio</h4>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={handleStartRecording}
          disabled={isRecording}
        >
          Start Recording
        </button>

        <button
          className="btn btn-danger"
          onClick={handleStopRecording}
          disabled={!isRecording}
        >
          Stop Recording
        </button>
      </div>

      {audioUrl && (
        <div className="mt-3">
          <h5>Recorded Audio:</h5>
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Meet;
