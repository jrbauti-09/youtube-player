import Search from "./components/Search";

function App() {
  const key = process.env.REACT_APP_UTUBE_API;
  console.log(key);
  return (
    <>
      <Search />
    </>
  );
}

export default App;
