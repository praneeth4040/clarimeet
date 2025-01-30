// // import axios from "axios";
// // import React, { useState } from "react";

// // const Summarizer = () => {
// //   const [text, setText] = useState("");
// //   const [summary, setSummary] = useState("");

// //   const handleSummarize = async() => {
// //     if (text.trim() === "") return;
// //     const words = text.split(" ");
// //     setSummary(words.slice(0, 15).join(" ") + (words.length > 15 ? "..." : ""));
// //     try{
// //     const res = await axios.get(`http://127.0.0.1:8000/send_res?question=${null}&transcript=${null}`)
// //     console.log(res.data)
// //     }catch(error){
// //       console.log(error)
// //     }
// //   };

// //   return (
// //     <div style={{ 
// //       position: "fixed",
// //       bottom: "20px", // Position it at the bottom of the page
// //       left: "50%",
// //       transform: "translateX(-50%)", // Center the summarizer horizontally
// //       backgroundColor: "rgba(255, 255, 255, 0.1)", 
// //       padding: "12px", 
// //       borderRadius: "8px", 
// //       boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", 
// //       width: "90%", 
// //       maxWidth: "400px", // Reduced width
// //       textAlign: "center",
// //       backdropFilter: "blur(10px)",
// //       border: "1px solid rgba(255, 255, 255, 0.3)"
// //     }}>
// //       <h3 style={{ color: "#fff", fontSize: "1rem" }}>Summarizer</h3>
// //       <textarea
// //         value={text}
// //         onChange={(e) => setText(e.target.value)}
// //         placeholder = {summary} 
// //         style={{ 
// //           width: "100%", 
// //           height: "70px", // Reduced height
// //           padding: "8px", 
// //           borderRadius: "5px", 
// //           border: "none", 
// //           backgroundColor: "white", 
// //           color: "#fff",
// //           outline: "none",
// //           resize: "none",
// //           fontSize: "0.9rem",
// //           fontWeight: "300",
// //         }}
// //       />
// //       {summary && (
// //         <div style={{ 
// //           marginTop: "8px", 
// //           padding: "8px", 
// //           backgroundColor: "rgba(255, 255, 255, 0.1)", 
// //           borderRadius: "5px", 
// //           fontSize: "0.9rem",
// //           color: "#fff"
// //         }}>
// //           <strong>Summary:</strong> {summary}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Summarizer;


// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Summarizer = ({ transcript }) => {
//   const [text, setText] = useState("");
//   const [summary, setSummary] = useState("");

//   useEffect(() => {
//     if (transcript) {
//       setText(transcript);
//       fetchSummary(transcript);
//     }
//   }, [transcript]);

//   const fetchSummary = async (inputText) => {
//     if (!inputText.trim()) return;

//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/send_res?question=${null}&transcript=${inputText}`);
//       console.log(res.data);
//       setSummary(res.data.summary);
//     } catch (error) {
//       console.error("Error fetching summary:", error);
//     }
//   };

//   return (
//     <div style={{ 
//       position: "fixed",
//       bottom: "20px",
//       left: "50%",
//       transform: "translateX(-50%)",
//       backgroundColor: "rgba(255, 255, 255, 0.1)", 
//       padding: "12px", 
//       borderRadius: "8px", 
//       boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", 
//       width: "90%", 
//       maxWidth: "400px",
//       textAlign: "center",
//       backdropFilter: "blur(10px)",
//       border: "1px solid rgba(255, 255, 255, 0.3)"
//     }}>
//       <h3 style={{ color: "#fff", fontSize: "1rem" }}>Summarizer</h3>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter text here..."
//         style={{ 
//           width: "100%", 
//           height: "70px", 
//           padding: "8px", 
//           borderRadius: "5px", 
//           border: "none", 
//           backgroundColor: "white", 
//           color: "#000",
//           outline: "none",
//           resize: "none",
//           fontSize: "0.9rem",
//           fontWeight: "300",
//         }}
//       />
//       <button 
//         onClick={() => fetchSummary(text)} 
//         style={{ 
//           marginTop: "8px", 
//           padding: "8px 15px", 
//           backgroundColor: "#007bff", 
//           color: "white", 
//           border: "none", 
//           borderRadius: "5px", 
//           cursor: "pointer",
//           fontSize: "0.9rem"
//         }}>
//         Summarize
//       </button>
//       {summary && (
//         <div style={{ 
//           marginTop: "8px", 
//           padding: "8px", 
//           backgroundColor: "rgba(255, 255, 255, 0.1)", 
//           borderRadius: "5px", 
//           fontSize: "0.9rem",
//           color: "#fff"
//         }}>
//           <strong>Summary:</strong> {summary}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Summarizer;


import axios from "axios";
import React, { useState, useEffect } from "react";

const Summarizer = ({ summaryFromAPI }) => {
  const [text, setText] = useState("");  // Text state that holds input
  const [summary, setSummary] = useState("");  // Summary state for storing summary
  const [loading, setLoading] = useState(false); // Loading state to show if API request is in progress

  useEffect(() => {
    if (summaryFromAPI) {
      setSummary(summaryFromAPI); // When summary is passed as prop, update state
    }
  }, [summaryFromAPI]); // Listen for changes in the summary from props

  const handleSummarize = async () => {
    if (text.trim() === "") return;
    const words = text.split(" ");
    setSummary(words.slice(0, 15).join(" ") + (words.length > 15 ? "..." : ""));  // Generate a simple summary

    try {
      const res = await axios.get(`http://127.0.0.1:8000/send_summary`);
      if (res.data) {
        setSummary(res.data);  // Update summary from API response
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
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
        placeholder={loading ? "Loading summary..." : summary || "Enter text to summarize..."} // Display loading message or default placeholder
        style={{ 
          width: "100%", 
          height: "70px", // Reduced height
          padding: "8px", 
          borderRadius: "5px", 
          border: "none", 
          backgroundColor: "white", 
          color: "#fff",
          outline: "none",
          resize: "none",
          fontSize: "0.9rem",
          fontWeight: "300",
        }}
      />
      <form>
        <button onAuxClick={handleSummarize}>hello</button>
      </form>
      
      {summary && !loading && (
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
