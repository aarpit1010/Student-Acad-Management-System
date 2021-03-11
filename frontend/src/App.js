import React from 'react';
import './App.css';
import Leftpane from './components/leftpane';
import Navbar from './components/navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Leftpane />
    </div>
  );
}

export default App;
