import { AccordionMenu, AccordionItem } from '../../../components/Accordion';
import TailButton from '../../../components/Buttons';

function MenuOptions(): JSX.Element {
  return (
    <AccordionMenu>
      <AccordionItem title="Width">
        <TailButton title="Test" />
      </AccordionItem>
    </AccordionMenu>
  );
}
export default MenuOptions;
