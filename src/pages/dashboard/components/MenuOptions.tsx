import { AccordionMenu, AccordionItem } from '../../../components/Accordion';
import TailButton from '../../../components/Buttons';
import sizes from '../../../assets/resolutions.json';

function MenuOptions(): JSX.Element {
  console.log(sizes);
  return (
    <AccordionMenu>
      <AccordionItem title="Sizes">
        {sizes.sizes.map((size) => (
          <TailButton title={size.name} />
        ))}
      </AccordionItem>
    </AccordionMenu>
  );
}
export default MenuOptions;
