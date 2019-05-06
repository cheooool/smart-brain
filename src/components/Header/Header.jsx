import React from 'react';
import styled from 'styled-components';
import Logo from '../Logo/Logo';
import Button from '../shared/Button';
import Profile from '../Profile/Profile';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1em;
  box-shadow: -2px 3px 10px 2px rgba(0, 0, 0, 0.5);
`;

const Header = ({ user, onSignOut }) => {
  return (
    <HeaderWrapper>
      <Logo />
      <Profile user={user} onSignOut={onSignOut} />
    </HeaderWrapper>
  );
};

export default Header;
