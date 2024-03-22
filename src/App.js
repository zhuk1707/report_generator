import './App.css';
import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Header title='Report Generator'/>
      <Main/>
    </div>
  );
}

export default App;
