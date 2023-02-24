import { fill } from '@cloudinary/url-gen/actions/resize';
import { AccordionMenu, AccordionItem } from '../../../components/Accordion';
import TailButton from '../../../components/Buttons';
import sizes from '../../../assets/resolutions.json';
import useImagesStore from '../../../store/ImagesStore';
import cld from '../../../cloudinary';

function MenuOptions(): JSX.Element {
  console.log(sizes);
  const [publicUrl, setEditUrl] = useImagesStore((state) => [
    state.publicUrl,
    state.setEditUrl,
  ]);
  return (
    <AccordionMenu>
      <AccordionItem title="Sizes">
        {sizes.sizes.map((size) => (
          <TailButton
            title={size.name}
            onClick={() =>
              setEditUrl(
                cld
                  .image(publicUrl)
                  .resize(
                    fill().width(size.formats[0].w).height(size.formats[0].h),
                  ),
              )
            }
          />
        ))}
      </AccordionItem>
    </AccordionMenu>
  );
}
export default MenuOptions;
