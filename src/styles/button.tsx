import styled from "styled-components";

const Button = styled.button`
  background-color: #29298d;
  color: white;
  border: none;
  padding: .5em 1em;
  border-radius: .25em;
  box-shadow: hsla(0, 0%, 0%, 0.5) 0px 10px 16px -10px;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: hsla(0, 0%, 0%, 0.25) 0px 10px 16px -10px;
  }
`;

export default Button;
