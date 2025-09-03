import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const FaceCapture = ({ mode }) => {
  const webcamRef = useRef(null);
  const [message, setMessage] = useState("");

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    try {
      const endpoint = mode === "register" ? "/register" : "/attendance";
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        image: imageSrc,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ borderRadius: "10px", border: "2px solid #333" }}
      />
      <button
        onClick={captureImage}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {mode === "register" ? "Register Face" : "Mark Attendance"}
      </button>
      {message && <p style={{ marginTop: "10px", color: "blue" }}>{message}</p>}
    </div>
  );
};

export default FaceCapture;
