import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import "./Search.css";



function Search() {
    const [input, setInput] = useState("");
  return (
    <div className="search__input">
    <SearchIcon className="search__inputIcon" />
    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Rechercher une organisation'/>
   
  </div>
  )
}

export default Search