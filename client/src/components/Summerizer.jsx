import axios from "axios";
import React, { useState, useEffect } from "react";

const Summarizer = ({ }) => {
  const [text, setText] = useState("");  // Holds user input
  const [summary, setSummary] = useState("");  // Stores summary
  const [loading, setLoading] = useState(false); // Loading state for API call


  const handleSummarize = async () => {
    if (text.trim() === "") return; // Prevent empty requests

    setLoading(true); 
    try {
      const res = await axios.get("http://127.0.0.1:8000/send_summary"); // ✅ Fixed URL
      console.log("API Response:", res.data); 

      if (res.data) {
        setSummary(res.data);  // ✅ Updates summary state
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
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
    }}>
      <h3 style={{ color: "#fff", fontSize: "1rem" }}>Summarizer</h3>

      {/* ✅ This textarea will update when API response comes */}
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

      {/* ✅ "Summarize" Button */}
      <button 
        onClick={handleSummarize} 
        disabled={loading} // Prevents multiple clicks while loading
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
  );
};

export default Summarizer;