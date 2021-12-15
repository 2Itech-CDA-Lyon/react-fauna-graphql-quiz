import styled from "styled-components";

interface FlexProps {
  justifyContent: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
}

const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

export default Flex;
