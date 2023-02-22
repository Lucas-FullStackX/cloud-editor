/* eslint-disable react/jsx-props-no-spreading */
import { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import API_KEY from '../../../constants';

function DropzoneContend(): JSX.Element {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: async (acceptedFiles) => {
      const formData = new FormData();
      console.log(acceptedFiles);

      formData.append('file', acceptedFiles[0]);
      formData.append('api_key', API_KEY);
      formData.append('public_id', 'sample_image');
      formData.append('upload_preset', 'nxrlsnnt');
      formData.append('timestamp', `${Date.now()}`);
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dwtba7bmh/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );
      console.log((await response).json());
      setFiles(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
  });
  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
  };
  const style = useMemo(() => {
    const baseStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
    };

    const focusedStyle = {
      borderColor: '#2196f3',
    };

    const acceptStyle = {
      borderColor: '#00e676',
    };

    const rejectStyle = {
      borderColor: '#ff1744',
    };

    return {
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    };
  }, [isFocused, isDragAccept, isDragReject]);
  const thumbs = files.map((file) => (
    <div style={thumb} key={file}>
      <div style={thumbInner}>
        <img src={file} style={img} alt="test" />
      </div>
    </div>
  ));
  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag drop some files here, or click to select files</p>
        )}
      </div>
      <div style={thumbsContainer}>{thumbs}</div>
    </section>
  );
}
export default DropzoneContend;
