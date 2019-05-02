import React from 'react';
import styled from 'styled-components';
import Logo from '../Logo/Logo';
import Button from '../shared/Button';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1em;
  box-shadow: -2px 3px 10px 2px rgba(0, 0, 0, 0.5);
`;

const SignoutButton = styled(Button)`
  font-size: 0.75em;
`;

const Header = ({ onSignOut }) => {
  return (
    <HeaderWrapper>
      <Logo />
      <SignoutButton type="button" onClick={onSignOut}>
        Sign Out
      </SignoutButton>
    </HeaderWrapper>
  );
};

export default Header;
