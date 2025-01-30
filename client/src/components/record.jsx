import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Meet = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcriptedText, setTranscriptedText] = useState(null);

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

  const handleStartRecording = async () => {
    if (mediaRecorder) {
      setAudioChunks([]); // Reset previous chunks
      mediaRecorder.start();
      setIsRecording(true);

      setTimeout(async () => {
        handleStopRecording(); // Stop recording

        try {
          // First Endpoint: Record Audio
          const response = await axios.get('http://127.0.0.1:8000/record_audio?duration=15');
          if (response.data.value === 1) {
            console.log(response.data);
            setAudioUrl(response.data.file_path);

            // Second Endpoint: Get Transcript
            try {
              const textResponse = await axios.get('http://127.0.0.1:8000/Ai_transcript');
              if (textResponse.data.value === 1) {
                console.log(textResponse.data.transcripted_text);
                const transcripted_text = textResponse.data.transcripted_text;
                setTranscriptedText(transcripted_text);

                // Third Endpoint: Send Res
                try {
                  const summarizedResponse = await axios.get(`http://127.0.0.1:8000/send_res?question=${null}&transcript=${transcripted_text}`);
                  console.log(summarizedResponse.data);
                } catch (err) {
                  console.error("Error fetching summary: ", err);
                }
              }
            } catch (transcriptError) {
              console.error("Error fetching transcript: ", transcriptError);
            }
          }
        } catch (error) {
          console.error("Error recording audio: ", error);
        }

      }, 15000); // Stop recording after 15 seconds
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <h4 className="text-center mb-4" style={{ color: 'white' }}>
        Record Audio
      </h4>

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

      {/* Uncomment to display recorded audio */}
      {/* {audioUrl && (
        <div className="mt-3">
          <h5>Recorded Audio:</h5>
          <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )} */}
    </div>
  );
};

export default Meet;




  