// import React, { useState } from 'react';
// import Video from './video'; 
// import Meet from './record'; 
// import Notepad from './notepad'; 
// import Chatbot from './chatbot.jsx';
// import Summarizer from './Summerizer'; // Import Summarizer
// import bgImage from './assets/bg.png.jpg'; 

// const Page = () => {
//   const [showMeet, setShowMeet] = useState(true);
//   const [showNotepad, setShowNotepad] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false);

//   const handleMeetClick = () => {
//     setShowMeet(true);
//     setShowNotepad(false);
//     setShowChatbot(false);
//   };

//   const handleVideoClick = () => {
//     setShowMeet(false);
//     setShowNotepad(false);
//     setShowChatbot(false);
//   };

//   const handleNotepadClick = () => {
//     setShowNotepad(true);
//     setShowMeet(false);
//     setShowChatbot(false);
//   };

//   const handleChatbotClick = () => {
//     setShowChatbot(true);
//     setShowMeet(false);
//     setShowNotepad(false);
//   };

//   const handleCloseChatbot = () => {
//     setShowChatbot(false);
//   };

//   return (
//     <div className="container-fluid" style={{ height: '100vh', position: 'relative' }}>
//       {/* Background Image */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           filter: 'blur(5px)',
//           zIndex: -1,
//         }}
//       ></div>

//       {/* Overlay */}
//       <div
//         className="overlay"
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           backgroundColor: 'rgba(0, 0, 0, 0.4)',
//           zIndex: -2,
//         }}
//       ></div>

//       {/* Chatbot Button */}
//       <button
//         className="btn btn-success"
//         onClick={handleChatbotClick}
//         style={{
//           position: 'fixed',
//           top: '20px',
//           right: '20px',
//           zIndex: 1,
//         }}
//       >
//         Chatbot
//       </button>

//       {/* Summarizer Component - Displayed only on Page */}
//       {!showMeet && !showNotepad && !showChatbot && (
//         <div className="row justify-content-center align-items-center" style={{ paddingTop: '10px' }}>
//           <Summarizer />
//         </div>
//       )}

//       {/* Main Content - Moved up */}
//       <div className="row justify-content-center align-items-start" style={{ height: 'calc(100vh - 56px)', paddingTop: '30px' }}>
//         <div className="col-md-4" style={{ zIndex: 1, position: 'relative' }}>
//           <div
//             className="d-flex mb-3 justify-content-center"
//             style={{
//               zIndex: 1,
//               color: 'white',
//             }}
//           >
//             <button className="btn btn-primary me-3" onClick={handleMeetClick} style={{ zIndex: 1, color: 'white' }}>
//               Meet
//             </button>
//             <button className="btn btn-warning me-3" onClick={handleVideoClick} style={{ zIndex: 1, color: 'white' }}>
//               Video
//             </button>
//             <button className="btn btn-info" onClick={handleNotepadClick} style={{ zIndex: 1, color: 'white' }}>
//               Notepad
//             </button>
//           </div>

//           {/* Conditional Rendering */}
//           {showMeet && <Meet />}
//           {showNotepad && <Notepad />}
//           {!showMeet && !showNotepad && <Video />}
//           {showChatbot && <Chatbot onClose={handleCloseChatbot} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
import React, { useState } from 'react';
import Video from './video'; 
import Meet from './record'; 
import Notepad from './notepad'; 
import Chatbot from './chatbot.jsx';
import Summarizer from './Summerizer'; // Import Summarizer
import bgImage from './assets/bg.png.jpg'; 

const Page = () => {
  const [showMeet, setShowMeet] = useState(true);
  const [showNotepad, setShowNotepad] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleMeetClick = () => {
    setShowMeet(true);
    setShowNotepad(false);
    setShowChatbot(false);
tepad(false); // Hide Notepad when showing Meet

  };

  const handleVideoClick = () => {
    setShowMeet(false);
    setShowNotepad(false);
    setShowChatbot(false);
  };

  const handleNotepadClick = () => {
    setShowNotepad(true);
    setShowMeet(false);
    setShowChatbot(false);
  };

  const handleChatbotClick = () => {
    setShowChatbot(true);
    setShowMeet(false);
    setShowNotepad(false);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <div className="container-fluid" style={{ height: '100vh', position: 'relative' }}>

      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(5px)',
          zIndex: -1,
        }}
      ></div>

      {/* Overlay */}
      <div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: -2,
        }}
      ></div>

      {/* Chatbot Button */}
      <button
        className="btn btn-success"
        onClick={handleChatbotClick}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1,
        }}
      >
        Chatbot
      </button>

      {/* Summarizer Component - Only Rendered When Meet is Active */}
      {showMeet && (
        <div className="row justify-content-center align-items-center" style={{ paddingTop: '10px' }}>
          <Summarizer />
        </div>
      )}

      {/* Main Content - Moved up */}
      <div className="row justify-content-center align-items-start" style={{ height: 'calc(100vh - 56px)', paddingTop: '100px' }}>

        <div className="col-md-4" style={{ zIndex: 1, position: 'relative' }}>
          <div
            className="d-flex mb-3 justify-content-center"
            style={{
              zIndex: 1,
              color: 'white',
            }}
          >
            <button className="btn btn-primary me-3" onClick={handleMeetClick} style={{ zIndex: 1, color: 'white' }}>
              Meet
            </button>
            <button className="btn btn-warning me-3" onClick={handleVideoClick} style={{ zIndex: 1, color: 'white' }}>
              Video
            </button>
            <button className="btn btn-info" onClick={handleNotepadClick} style={{ zIndex: 1, color: 'white' }}>
              Notepad
            </button>
          </div>

          {/* Conditional Rendering */}
          {showMeet && <Meet />}
          {showNotepad && <Notepad />}
          {!showMeet && !showNotepad && <Video />}
          {showChatbot && <Chatbot onClose={handleCloseChatbot} />}
        </div>
      </div>
    </div>
  );
};

export default Page;



