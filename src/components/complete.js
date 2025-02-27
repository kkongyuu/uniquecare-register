import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CompletePage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      {/* Thank You Message */}
      <div className="text-center mt-5 p-4">
        <h1 className="text-success">Registration Complete!</h1>
        <p>Your registration has been successfully completed.</p>
        <p>Your information has been recorded and will be used within the application.</p>
        <p>Thank you for joining us!</p>

        {/* Refresh Button */}
        <button className="btn btn-primary mt-3" onClick={handleRefresh}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
