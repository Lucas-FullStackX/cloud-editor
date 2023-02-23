import Dashboard from './pages/dashboard/Dashboard';

function App(): JSX.Element {
  return (
    <div className="w-screen grid justify-center justify-items-center content-center items-center">
      <h1>WELCOME TO CLOUD EDITOR</h1>
      <h1 className=" text-sky-400 text-3xl font-bold underline">
        Hello world!
      </h1>
      <Dashboard />
    </div>
  );
}

export default App;
