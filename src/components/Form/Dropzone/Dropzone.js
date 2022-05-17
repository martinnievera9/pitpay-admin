import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import Icon from 'components/Icon';
import SingleUpload from './gql/upload-file';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 4px;
  border-color: #fc7d43;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 300px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
  position: relative;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const ImgThumb = styled.img`
  display: block;
  width: 100%;
`;

const ErrorText = styled.div`
  margin-top: 5px;
  font-size: ${(props) => props.fontSize || 14}px;
  color: ${(props) => props.theme.colors.error};
`;

const RemoveButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  transform: rotate(135deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const InputLabel = styled.label.attrs((props) => ({
  style: props.inlineStyle,
}))`
  color: black;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 16px;
  display: block;
`;

export const Dropzone = SingleUpload((props) => {
  const { id, onChange, singleUpload, setError, error, label } = props;
  const [files, setFiles] = useState(props.files);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles) => {
      const images = await Promise.all(
        acceptedFiles.map(async (file) => {
          const response = await singleUpload(file);

          if (!response || response.errors) {
            setError(id, 'Error uploading image.');
          }
          const image = {
            name: response.data.singleUpload.id,
            preview: response.data.singleUpload.url,
          };
          onChange(id, image.name);
          onChange(id.replace('_id', ''), image.preview);
          return image;
        })
      );
      setFiles(images);
    },
  });

  const thumbs = files.map((file) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ImgThumb src={file.preview} />
        <RemoveButton
          type="button"
          onClick={() => {
            onChange(id, null);
          }}
        >
          <Icon icon="plus" color={'#fff'} size={12} />
        </RemoveButton>
      </ThumbInner>
    </Thumb>
  ));

  useEffect(() => {
    if (!props.files) return;
    setFiles(props.files);

    // Make sure to revoke the data uris to avoid memory leaks
    props.files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [props.files]);

  return (
    <section className="container">
      {label && <InputLabel>{label}</InputLabel>}
      <Container {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drop files here, or click to select files</p>
      </Container>
      <ThumbsContainer>{thumbs}</ThumbsContainer>
      {error && <ErrorText fontSize={props.fontSize}>{error}</ErrorText>}
    </section>
  );
});
