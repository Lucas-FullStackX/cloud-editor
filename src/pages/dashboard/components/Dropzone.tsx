/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import API_KEY from '../../../constants';

function DropzoneContend(): JSX.Element {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,

    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: async (acceptedFiles) => {
      const formData = new FormData();
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
  const style = useMemo(() => {
    return `flex flex-col p-8 rounded-2xl border-2 border-dashed border-stone-900 bg-slate-200 ${
      isFocused
        ? 'bg-blue-600'
        : isDragAccept
        ? 'bg-green-600'
        : isDragReject
        ? 'bg-red-600'
        : ''
    }`;
  }, [isFocused, isDragAccept, isDragReject]);
  return (
    <section>
      <div {...getRootProps({ className: style })}>
        <input {...getInputProps()} />
        {files.length ? (
          <span className="text-black font-black text-2xl text-center">
            Select New Image
          </span>
        ) : (
          <span className="text-black font-black text-2xl text-center">
            Click Here
          </span>
        )}
      </div>
      {files[0] && (
        <div className="max-h-full max-w-3xl">
          <img src={files[0]} alt="test" />
        </div>
      )}
    </section>
  );
}
export default DropzoneContend;
