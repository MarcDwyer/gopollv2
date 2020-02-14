import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
import { cardYellow } from "./card-styles";

export const PollInput = styled(TextField)`
  margin: 10px 0 10px 0 !important;
`;

type PMyButton = {
  width?: string;
  margin?: string;
};
export const MyButton = styled(Button)<PMyButton>`
  width: ${p => p.width || ""};
  margin: ${p => p.margin || ""};
`;

type PMyHeader = {
  fontSize?: string;
  fontWeight?: string;
};
export const MyHeader = styled.span<PMyHeader>`
  font-size: ${p => p.fontSize || "27px"};
  font-weight: ${p => p.fontWeight || ""};
`;

export const Notification = styled.div`
  background-color: ${cardYellow};
  width: 250px;
  min-height: 150px;
  border-top-left-radius: 15px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  animation-name: notif;
  animation-duration: 1s;
  z-index: 1000;
`;
