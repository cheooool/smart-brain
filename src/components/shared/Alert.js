import styled from 'styled-components';

const Alert = styled.div`
  position: relative;
  min-height: 38px;
  padding: 0.75em 1em;
  border-radius: 4px;
  border: 1px solid #fff;
  box-sizing: border-box;
  font-size: 0.875em;
  color: #fff;
  background: rgba(255, 255, 255, 0.3);

  &.error {
    color: #86181d;
    background: #ffdce0;
    border-color: #f5c6cb;
  }
`;
export default Alert;
