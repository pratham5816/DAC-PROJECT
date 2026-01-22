import React from "react";

const DriverPage = () => {
  return (
    <div className="p-4">
      <h2>Driver Dashboard</h2>
      <ul>
        <li>🚗 Start/End Trip - Control trip lifecycle</li>
        <li>📍 Manual Location Update - Update position with one click</li>
        <li>⏱ Auto-Update Mode - Automatic updates every 30 seconds</li>
        <li>✅ Checkpoint Management - Mark checkpoints manually or automatically (within 100m)</li>
        <li>📊 Real-time Progress - See route progress and next checkpoint</li>
        <li>🗺 Live Map - View your position and entire route with numbered checkpoints</li>
      </ul>
    </div>
  );
};

export default DriverPage;