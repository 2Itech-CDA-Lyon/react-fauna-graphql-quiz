import styled, { css } from "styled-components";

interface FlexProps {
  justifyContent: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'start' | 'end' | 'center';
  gap?: string;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ gap }) => typeof gap !== 'undefined' && css`gap: ${gap};`}
  ${({ alignItems }) => typeof alignItems !== 'undefined' && css`align-items: ${alignItems};`}
  justify-content: ${(props) => props.justifyContent};
`;

export default Flex;
