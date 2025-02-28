import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle } from "react-icons/fa";

const CompletePage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-3">
      <div
        className="card shadow-lg p-4 text-center"
        style={{ maxWidth: "500px" }}
      >
        <div className="d-flex justify-content-center">
          <FaCheckCircle className="text-success" size={80} />
        </div>

        {/* Success Message */}
        <h2 className="text-success mt-3">Registration Complete!</h2>
        <p className="text-muted">
          Your registration has been successfully completed. We will contact you
          once the application is ready for use.
        </p>

        {/* Instructions */}
        <div className="alert alert-info">
          <strong>What's Next?</strong>
          <ul className="list-unstyled mt-2">
            <li>✔ Stay updated with our latest news and announcements</li>
            <li>✔ Get ready to experience our application soon</li>
            <li>✔ Contact us if you have any questions</li>
          </ul>
        </div>
        
        {/* Refresh Button */}
        <button className="btn btn-primary mt-3" onClick={handleRefresh}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
