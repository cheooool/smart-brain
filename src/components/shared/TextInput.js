import styled from 'styled-components';

const TextInput = styled.input`
  position: relative;
  width: 100%;
  height: 56px;
  padding: 0px 1em;
  box-sizing: border-box;
  border: none;
  font-size: 1em;
  line-height: 1em;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.3);
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  ::-moz-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  :-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  :-moz-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export default TextInput;
