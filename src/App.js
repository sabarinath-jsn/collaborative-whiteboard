import React from 'react';
import './App.css'; // If you want to add some global styles
import Whiteboard from './Whiteboard';

function App() {
  return (
    <div className="App">
      <h1>Real-Time Collaborative Whiteboard</h1>
      <Whiteboard />
    </div>
  );
}

export default App;
