/* eslint-disable no-nested-ternary */
import { useMemo } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { API_KEY, CLOUD_NAME } from '../constants';
import useImagesStore from '../store/ImagesStore';

export default function useUploadImg(): {
  style: string;
  getInputProps: DropzoneState['getInputProps'];
  getRootProps: DropzoneState['getRootProps'];
} {
  const [setPublicUrl] = useImagesStore((state) => [state.setPublicUrl]);
  const { getRootProps, getInputProps, isDragAccept, isFocused, isDragReject } =
    useDropzone({
      accept: { 'image/*': [] },
      onDrop: async (acceptedFiles) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        formData.append('api_key', API_KEY);
        formData.append('public_id', acceptedFiles[0].name.slice(0, -5));
        formData.append('upload_preset', 'ml_default');
        formData.append('timestamp', `${Date.now()}`);
        // formData.append('background_removal', 'cloudinary_ai');
        const sendImg = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );
        const response = await sendImg.json();
        console.log(response);
        setPublicUrl(response.public_id);
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

  return {
    style,
    getInputProps,
    getRootProps,
  };
}
