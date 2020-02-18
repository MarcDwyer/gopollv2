import styled from "styled-components";
import { cardYellow } from "./card-styles";

type PMyButton = {
  width?: string;
  bgColor?: string;
  margin?: string;
  color?: string;
};
export const MyButton = styled.button<PMyButton>`
  background-color: ${p => p.bgColor || "#BADA55"};
  width: ${p => p.width || ""};
  margin: ${p => p.margin || ""};
  border: none;
  padding: 15px 15px;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  color: ${p => p.color || "inherit"};
`;

type PMyHeader = {
  fontSize?: string;
  margin?: string;
  fontWeight?: string;
};
export const MyHeader = styled.span<PMyHeader>`
  margin: ${p => p.margin || ""};
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
