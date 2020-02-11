import React from "react";
import { createPortal } from "react-dom";

const SharePoll = () => {
  console.log("sharepoll mounted");
  return createPortal(
    <div className="share-poll"></div>,
    //@ts-ignore
    document.querySelector("#root")
  );
};

export default SharePoll;
