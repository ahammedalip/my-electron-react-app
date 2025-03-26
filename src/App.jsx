import React from "react";
import "./App.css";

export default function App() {
  const handlePrint = () => {
    if (window.electron) {
      window.electron.printText("Hello, this is a silent print test!");
    } else {
      console.error("Electron is not available.");
    }
  };

  return (
    <div className="main">
      <h1>Printer Native Application</h1>
      <button onClick={handlePrint}>Print Sample</button>
    </div>
  );
}
