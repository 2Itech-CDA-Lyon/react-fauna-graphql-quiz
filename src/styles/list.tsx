import styled, { css } from "styled-components";

interface ListProps {
  columnSize?: string
}

const List = styled.ul<ListProps>`
  padding-left: inherit;
  ${(props) => typeof props.columnSize !== undefined && css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${props.columnSize}, 1fr));
  `}

  & > li {
    list-style: none;
  }
`;

export default List;
