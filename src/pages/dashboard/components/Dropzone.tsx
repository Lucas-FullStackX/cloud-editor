/* eslint-disable react/jsx-props-no-spreading */
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import cld from '../../../cloudinary';
// import cld from '../../../cloudinary';
import TailButton from '../../../components/Buttons';
// import { CLOUD_NAME } from '../../../constants';
import useUploadImg from '../../../hooks/useUploadImg';
import useImagesStore from '../../../store/ImagesStore';

function DropzoneContend(): JSX.Element {
  const [publicUrl, editUrl, setEditUrl] = useImagesStore((state) => [
    state.publicUrl,
    state.editUrl,
    state.setEditUrl,
  ]);
  const { style, getRootProps, getInputProps } = useUploadImg();
  console.log(publicUrl);
  return (
    <section className="px-4 py-8">
      <div {...getRootProps({ className: style })}>
        <input {...getInputProps()} />
        {publicUrl?.length ? (
          <span className="text-black font-black text-2xl text-center">
            Select New Image
          </span>
        ) : (
          <span className="text-black font-black text-2xl text-center">
            Click Here
          </span>
        )}
      </div>
      {publicUrl?.length && (
        <div className="max-h-full max-w-3xl">
          <AdvancedImage cldImg={cld.image(publicUrl)} alt="test" />
        </div>
      )}
      {editUrl && (
        <div className="max-h-full max-w-3xl">
          <AdvancedImage cldImg={editUrl} alt="test" />
        </div>
      )}
      <TailButton
        type="button"
        title="text"
        onClick={() => {
          setEditUrl(
            cld.image(publicUrl).resize(fill().width(700).height(530)),
          );
        }}
      />
    </section>
  );
}
export default DropzoneContend;
