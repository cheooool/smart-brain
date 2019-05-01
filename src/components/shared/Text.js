import styled from 'styled-components';

const Text = styled.p.attrs(({ size }) => ({
  // or we can define dynamic ones
  fontSize: size || '1em'
}))`
  font-size: ${props => props.fontSize};
  color: rgba(255, 255, 255, 0.8);
`;

export default Text;
