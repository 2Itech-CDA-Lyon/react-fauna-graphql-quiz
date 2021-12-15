import styled, { css } from "styled-components";

const Button = styled.button`
  position: relative;
  background-color: #29298d;
  color: white;
  border: none;
  padding: .5em 1em;
  border-radius: .25em;
  box-shadow: hsla(0, 0%, 0%, 0.5) 0px 10px 16px -10px;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:after {
    content: '';
    background-color: rgba(255, 255, 255, 0.2);
    opacity: ${({ disabled }) => disabled ? '1' : '0'};
    width: ${({ disabled }) => disabled ? '100%' : '50%'};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity .3s ease, width .3s ease;
  }

  &:hover {
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  }

  &:hover:after {
    width: 100%;
    opacity: 1;
  }

  &:active {
    ${({ disabled }) => !disabled && css`
      transform: translateY(2px);
      box-shadow: hsla(0, 0%, 0%, 0.25) 0px 10px 16px -10px;
    `}
  }
`;

export default Button;
