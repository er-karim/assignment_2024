import React, { useState } from "react";

const ErrorAlert = ({ errorMessage }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible && errorMessage ? (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      {errorMessage}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={handleClose}
      ></button>
    </div>
  ) : null;
};

export default ErrorAlert;
