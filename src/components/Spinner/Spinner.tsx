import "components/Spinner/Spinner.scss";
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="SpinnerOverlay">
      <div className="SpinnerContainer" />
    </div>
  );
};
export default Spinner;
