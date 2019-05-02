import React from 'react';
import styled from 'styled-components';
import brain from './icons8-brain-52.png';

const LogoBox = styled.div`
  width: 52px;
  height: 52px;
  margin: 1em;
`;

const Logo = () => {
  return (
    <LogoBox>
      <img src={brain} alt="logo" />
    </LogoBox>
  );
};

export default Logo;
