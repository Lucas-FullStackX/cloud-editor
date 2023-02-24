import Dropzone from './components/Dropzone';
import MenuOptions from './components/MenuOptions';

function Dashboard(): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-x-0.5 justify-items-stretch w-screen">
      <MenuOptions />
      <Dropzone />
    </div>
  );
}

export default Dashboard;
