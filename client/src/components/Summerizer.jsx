import React, { useState } from "react";

const Summarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = () => {
    if (text.trim() === "") return;
    const words = text.split(" ");
    setSummary(words.slice(0, 15).join(" ") + (words.length > 15 ? "..." : ""));
  };

  return (
    <div style={{ 
      position: "fixed",
      bottom: "20px", // Position it at the bottom of the page
      left: "50%",
      transform: "translateX(-50%)", // Center the summarizer horizontally
      backgroundColor: "rgba(255, 255, 255, 0.1)", 
      padding: "12px", 
      borderRadius: "8px", 
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", 
      width: "90%", 
      maxWidth: "400px", // Reduced width
      textAlign: "center",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)"
    }}>
      <h3 style={{ color: "#fff", fontSize: "1rem" }}>Summarizer</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
        style={{ 
          width: "100%", 
          height: "70px", // Reduced height
          padding: "8px", 
          borderRadius: "5px", 
          border: "none", 
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
          color: "#fff",
          outline: "none",
          resize: "none",
          fontSize: "0.9rem",
          fontWeight: "300",
        }}
      />
      <button 
        onClick={handleSummarize} 
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
        Summarize
      </button>
      {summary && (
        <div style={{ 
          marginTop: "8px", 
          padding: "8px", 
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
          borderRadius: "5px", 
          fontSize: "0.9rem",
          color: "#fff"
        }}>
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
};

export default Summarizer;

