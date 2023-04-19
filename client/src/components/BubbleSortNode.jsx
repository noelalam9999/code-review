import React from "react";

const BubbleSortNode = ({ value, idx }) => {
  return (
    <div className="bubbleSortNode" id={idx}>
      <div className="bubbleSortNode__text">{value}</div>
    </div>
  );
};

export default BubbleSortNode;
