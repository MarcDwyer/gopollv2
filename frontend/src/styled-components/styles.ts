import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

export const Card = styled.div`
  background-color: #ffd756;
  display: flex;
  margin: auto;
`;

type PInnerCard = {
  width?: string;
};
export const InnerCard = styled.div<PInnerCard>`
  padding: 15px 15px;
  width: 95%;
  height: 95%;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: ${p => p.width || ""};
`;

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
};
export const MyHeader = styled.span<PMyHeader>`
  font-size: ${p => p.fontSize || "27px"};
`;
