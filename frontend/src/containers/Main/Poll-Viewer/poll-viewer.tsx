import React from "react";
import { Route, useParams } from "react-router-dom";

const PollViewer = () => {
  const route = useParams();
  console.log(route);
  return <div className="poll-container">yo wassap</div>;
};

export default PollViewer;
