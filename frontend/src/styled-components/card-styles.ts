import styled from "styled-components";

export const cardYellow = "#ffd756";

export const Card = styled.div`
  background-color: ${cardYellow};
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
