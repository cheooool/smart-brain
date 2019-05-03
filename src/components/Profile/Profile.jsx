import React, { Component } from 'react';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  position: relative;
  width: 3em;
  height: 3em;

  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transition: border 0.3s;

  .info {
    transition: opacity, 0.3s;
    opacity: 0;
  }
  .close {
    display: none;
  }

  &.open {
    border: 0;
  }
  &.open .inner {
    width: 10em;
    height: auto;
    padding: 1em;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.8);
    overflow: auto;
  }
  &.open .icon {
    width: 6em;
    height: 6em;
  }
  &.open .info {
    transition-delay: 0.3s;
    opacity: 1;
  }
  &.open .close {
    display: block;
  }
`;
const ProfileInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s;
  z-index: 10;
  overflow: hidden;
`;
const ProfileInfo = styled.div`
  font-size: 0.875em;
  word-break: break-all;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 1em 0;
  }
`;
const ProfileIcon = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3em;
  height: 3em;
  margin: 0 auto;
  padding: 0.375em;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  transition: all 0.3s;
  z-index: 10;

  & > img {
    width: 100%;
    border-radius: 50%;
    background: #fff;
  }

  &:hover {
    padding: 0;
  }
  &:active {
    transform: scale(1.2);
  }
`;

const CountNumber = styled.div`
  margin-top: 0.5em;
  font-size: 2em;
  line-height: 1em;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  width: 2em;
  height: 2em;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  background: transparent;
  outline: none;
  cursor: pointer;
`;

class Profile extends Component {
  profile = React.createRef();

  onOpen = () => {
    this.profile.current.classList.add('open');
    // this.profile.classList.add('open');
  };
  onClose = () => {
    this.profile.current.classList.remove('open');
  };
  render() {
    return (
      <ProfileWrapper ref={this.profile}>
        <ProfileInner className="inner">
          <ProfileIcon className="icon" onClick={this.onOpen}>
            <img src={`https://robohash.org/1`} />
          </ProfileIcon>

          <ProfileInfo className="info">
            <ul>
              <li>TEST</li>
              <li>TESTTESTTEST@email.com</li>
              <li>
                검색 횟수<CountNumber>0</CountNumber>
              </li>
            </ul>
          </ProfileInfo>
          <CloseButton className="close" onClick={this.onClose}>
            X
          </CloseButton>
        </ProfileInner>
      </ProfileWrapper>
    );
  }
}

export default Profile;
