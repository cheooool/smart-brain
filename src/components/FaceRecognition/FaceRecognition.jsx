import React from 'react';
import styled from 'styled-components';

const FaceRecognitionWrapper = styled.div`
  padding: 0 1em;
`;
const ImageBox = styled.div`
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  border-radius: 4px;
`;
const BoundingBox = styled.div`
  position: absolute;
  box-shadow: 0 0 0 3px #149df2 inset;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;

  top: ${props => (props.top ? props.top + '%' : '')};
  right: ${props => (props.right ? props.right + '%' : '')};
  bottom: ${props => (props.bottom ? props.bottom + '%' : '')};
  left: ${props => (props.left ? props.left + '%' : '')};
`;
const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <FaceRecognitionWrapper>
      <ImageBox>
        <Image id="inputImage" src={imageUrl} alt="사진" />

        {boxes.map((box, index) => {
          return <BoundingBox key={index} {...box} />;
        })}
      </ImageBox>
    </FaceRecognitionWrapper>
  );
};

export default FaceRecognition;
