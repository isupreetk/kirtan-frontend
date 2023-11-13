import './App.scss';
import { useRef, useEffect, useState } from "react";
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import KirtanList from './components/KirtanList/KirtanList';
import kirtansData from "./assets/data/kirtans.json";

function App() {

  let inputRef = useRef(); 
  let [searchTerm, setSearchTerm] = useState("");
  let [kirtans, setKirtans] = useState([]);

useEffect(() => {
   setKirtans(kirtansData);
},[searchTerm])

const handleSearch = () => {
  setSearchTerm(inputRef.current.value);
}

  return (
    <div className="App">
      
      <Header />
      <SearchBar inputRef={inputRef} handleSearch={handleSearch}/>
      <KirtanList searchTerm={searchTerm} kirtans={kirtans}/>

    </div>
  );
}

export default App;
