import React from 'react';
import styled, { keyframes } from 'styled-components';

const stretch = keyframes`
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
`;

const SpinnerWrapper = styled.div`
  width: 65px;
  height: 60px;
  margin: 1em auto;
  text-align: center;

  & > div {
    display: inline-block;
    width: 10px;
    height: 100%;
    margin-right: 3px;
    background-color: rgba(255, 255, 255, 0.8);

    -webkit-animation: ${stretch} 1.2s infinite ease-in-out;
    animation: ${stretch} 1.2s infinite ease-in-out;
  }
`;

const SpinnerRect = styled.div`
  -webkit-animation-delay: ${props =>
    props.delay ? props.delay : '-1s'} !important;
  animation-delay: ${props => (props.delay ? props.delay : '-1s')} !important;
`;

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <SpinnerRect delay="-1.2s" />
      <SpinnerRect delay="-1.1s" />
      <SpinnerRect delay="-1.0s" />
      <SpinnerRect delay="-0.9s" />
      <SpinnerRect delay="-0.8s" />
    </SpinnerWrapper>
  );
};

export default Spinner;
