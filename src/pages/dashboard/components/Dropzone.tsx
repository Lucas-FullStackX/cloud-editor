/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { AdvancedImage } from '@cloudinary/react';
// import { backgroundRemoval } from '@cloudinary/url-gen/actions/effect';
import { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import cld from '../../../cloudinary';
import { API_KEY, CLOUD_NAME } from '../../../constants';

function DropzoneContend(): JSX.Element {
  const [file, setFile] = useState<string>('');
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
      formData.append('upload_preset', 'ml_default');
      formData.append('timestamp', `${Date.now()}`);
      formData.append('background_removal', 'cloudinary_ai');
      const sendImg = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const response = await sendImg.json();
      console.log(response);
      setFile(response.public_id);
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
        {file.length ? (
          <span className="text-black font-black text-2xl text-center">
            Select New Image
          </span>
        ) : (
          <span className="text-black font-black text-2xl text-center">
            Click Here
          </span>
        )}
      </div>
      {file.length && (
        <div className="max-h-full max-w-3xl">
          <AdvancedImage cldImg={cld.image(file)} alt="test" />
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          console.log('hola');
        }}
      >
        Remove Background
      </button>
    </section>
  );
}
export default DropzoneContend;
