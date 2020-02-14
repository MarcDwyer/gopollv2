import { Link } from "react-router-dom";
import styled from "styled-components";

type PBorderLink = {
  margin: string;
};
export const BorderLink = styled(Link)<PBorderLink>`
  font-size: 32px;
  margin: ${p => p.margin};

  border-right: 1px solid black;

  span {
    margin: auto 10px auto 10px;
  }
`;
