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
  min-width: 350px;
  display: flex;
  margin: auto;
  flex-direction: column;
`;
