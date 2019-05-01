import styled from 'styled-components';

const Button = styled.button`
  margin: 1em 0;
  padding: 0.75em 2em;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export default Button;
