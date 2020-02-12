import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  Notification,
  MyHeader,
  MyButton
} from "../../styled-components/styles";
import { isDev } from "../Main/main";
import { useSpring, animated } from "react-spring";

import { ReduxStore } from "../../reducers/reducers";

import "./sharepoll.scss";

const SharePoll = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const poll = useSelector((state: ReduxStore) => state.poll);
  const notifAnim = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    transform: "translateY(0%)",
    opacity: 1,
    reverse: poll ? false : true
  });

  useEffect(() => {
    if (!poll) {
      setCopied(false);
    }
  }, [poll]);

  return createPortal(
    <animated.div style={notifAnim}>
      <Notification>
        <div className="inner-notif">
          {poll &&
            (() => {
              const url = isDev
                ? `http://${document.location.host}/vote/${poll.id}`
                : `https://${document.location.hostname}/vote/${poll.id}`;
              return (
                <React.Fragment>
                  <MyHeader fontSize="27px">Share your poll!</MyHeader>
                  <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
                    <MyButton variant="outlined" color="primary">
                      {!copied ? "Copy and share!" : "Copied!"}
                    </MyButton>
                  </CopyToClipboard>
                </React.Fragment>
              );
            })()}
        </div>
      </Notification>
    </animated.div>,
    //@ts-ignore
    document.querySelector("body")
  );
};

export default SharePoll;
