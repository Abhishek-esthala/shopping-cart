import React from "react";
import '../spinner.css';

export default function LoadingSpinner() {
  const spinnerStyle={
    width: "50px",
    height: "50px",
    border: "10px solid #f3f3f3", /* Light grey */
    borderTop: "10px solid #383636", /* Black */
    borderRadius: "50%",
    animation: "spinner 1.5s linear infinite",
    marginLeft: "45%",
    marginTop: "25%",
  }

  const keyframesStyle = `
  @keyframes spin{
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  `;
  return (
    <div className="spinner-container">
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle}>
      </div>
    </div>
  );
}
