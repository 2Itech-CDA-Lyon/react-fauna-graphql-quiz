import styled, { css } from 'styled-components';

interface CardProps {
  clickable?: boolean
}

const Card = styled.div<CardProps>`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: .5rem 1rem;
  margin: 1rem .5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transition: background-color .15s ease;

  &:hover {
    ${({ clickable }) => clickable && css`
      background-color: #f8f8f8;
      cursor: pointer;
    `}
  }
`;

export default Card;
