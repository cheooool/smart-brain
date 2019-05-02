import React from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner/Spinner';

const DetectWrapper = styled.div`
  padding: 1em;
`;
const DetectText = styled.p`
  margin: 0;
  font-size: 1.5em;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1em;
`;
const CounterText = styled.strong`
  font-size: 2.5em;
  line-height: 1.3em;
`;

const DetectCounter = ({ counter }) => {
  if (!counter) {
    return <Spinner />;
  }
  return (
    <DetectWrapper>
      <DetectText>
        <CounterText>{counter}</CounterText> 명의
        <br />
        얼굴을 인식했습니다.
      </DetectText>
    </DetectWrapper>
  );
};

export default DetectCounter;
