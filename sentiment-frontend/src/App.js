import './App.css';
import React from 'react';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: "url('/coca-cola_&_pepsi.png') no-repeat center center fixed",
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <div className="app-overlay">
        <div className="app-content">
          <h1>Customer Sentiment Analyzer</h1>
          <FileUpload />
        </div>
      </div>
    </div>
  );
}

export default App;