import React from 'react';
import styled from 'styled-components';
import { TextInput, Button } from '../shared';

const LinkWrapper = styled.div`
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
`;
const LinkForm = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LinkInput = styled(TextInput)`
  padding-right: 5.4em;
`;
const DetectButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  margin: 0;
  padding: 0.5em;
`;

const ImageLinkForm = ({ value, onDetectSubmit, onInputChange }) => {
  return (
    <LinkWrapper>
      <LinkForm onSubmit={onDetectSubmit}>
        <LinkInput
          type="text"
          name="linkInput"
          id="linkInput"
          placeholder="Image Url..."
          value={value}
          onChange={onInputChange}
        />
        <DetectButton type="submit">Detect</DetectButton>
      </LinkForm>
    </LinkWrapper>
  );
};

export default ImageLinkForm;
