import React from 'react';
import Page from './components/Page'; // Correct path

const App = () => {
  return (
    <div className="container-fluid">
      {/* Responsive Layout */}
      <div className="row">
        <div className="col-12">
          {/* Ensure Page component remains the same */}
          <Page />
        </div>
      </div>
    </div>
  );
};

export default App;
