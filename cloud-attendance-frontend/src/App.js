import React, { useState } from "react";
import FaceCapture from "./components/FaceCapture";

function App() {
  const [mode, setMode] = useState("register");

  return (
    <div style={{ textAlign: "center", padding: "30px", fontFamily: "Arial" }}>
      <h1>Cloud Attendance System</h1>

      <div style={{ margin: "20px" }}>
        <button
          onClick={() => setMode("register")}
          style={{ marginRight: "10px", padding: "8px 15px" }}
        >
          Register
        </button>
        <button
          onClick={() => setMode("attendance")}
          style={{ padding: "8px 15px" }}
        >
          Mark Attendance
        </button>
      </div>

      <FaceCapture mode={mode} />
    </div>
  );
}

export default App;
