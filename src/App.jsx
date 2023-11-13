// import logo from './logo.svg';
import './App.scss';
import { useRef } from "react";
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import KirtanList from './components/KirtanList/KirtanList';

function App() {

  const formRef = useRef();
  let searchTerm = "";
  
  const handleSearch = (event) => {
    event.preventDefault();
    searchTerm = event.target.searchInput.value;
    console.log(searchTerm);
    formRef.current.reset();
}
// if ()
// console.log("searchTerm", searchTerm);

  return (
    <div className="App">
      
      <Header />
      <SearchBar formRef={formRef} handleSearch={handleSearch}/>
      <KirtanList searchTerm={searchTerm} />

    </div>
  );
}

export default App;
