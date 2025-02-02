import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Meet = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcriptedText, setTranscriptedText] = useState(null);
  const [summary, setSummary] = useState(""); // Stores the summary
  const [loading, setLoading] = useState(false); // Loading state for API call

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
                  setSummary(summarizedResponse.data.summary); // Ensure you're setting the correct property
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

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/send_summary');
      if (response.data) {
        setSummary(response.data.summary); // Ensure you're setting the correct property
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
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

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", 
          width: "90%",
          maxWidth: "400px",
          textAlign: "center",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)"
        }}
      >
        <h3 style={{ color: "#fff", fontSize: "1rem" }}>Summarizer</h3>

        <textarea 
          value={summary} 
          readOnly 
          style={{ 
            width: "100%", 
            height: "70px",
            padding: "8px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "white",
            color: "black",
            outline: "none",
            resize: "none",
            fontSize: "0.9rem",
            fontWeight: "300",
          }}
        />

        <button 
          onClick={handleSummarize} 
          disabled={loading} 
          style={{ 
            marginTop: "8px",
            padding: "8px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "0.9rem"
          }}>
          {loading ? "Loading..." : "Summarize"}
        </button>
      </div>
    </div>
  );
};

export default Meet;
