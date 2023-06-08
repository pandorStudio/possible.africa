/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '../assets/icons';
import { useGetOrganisationsQuery } from '../features/api/apiSlice';


function Searchbar({hideMeBellow}) {

  const [query, setQuery] = useState('');
  let navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);

  

  const {
    data,
    
  } = useGetOrganisationsQuery();

 
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false)
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionPaneRef = useRef(null);
  const searchElementRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false); // New state variable





  function showResults(query) {
    // Perform search and set the results in the state
    const results = performSearch(query);
    setSearchResults(results);
  }

  function performSearch(query) {
    // Simulate search by returning sample results
    let Results = [];
    if (data) {
      Results = data;
    }
    // Filter results based on query
    const filteredResults = Results.filter(result =>
      result.toLowerCase().includes(query.toLowerCase())
    );

    return filteredResults;
  }


  const highlightMatch = (resultName) => {
    const index = resultName.toLowerCase().indexOf(query.toLowerCase());
    if (index >= 0) {
      const before = resultName.substring(0, index);
      const match = resultName.substring(index, index + query.length);
      const after = resultName.substring(index + query.length);
      return (
        <>  
          {before}
          <span className="highlight">{match}</span>
          {after}
        </>
      );
    }
    return resultName;
  };

   function handleInputChange(event) {
      setQuery(event.target.value);

      if (event.target.value) {
        const results = performSearch(event.target.value);
        setSearchResults(results);
        setShowSuggestions(true);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);

      }
    }

    const onKeyUp = (e) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        event.preventDefault();
        navigate(`search?q=${query}`)
        addSearchToLocalstorage()
        setShowSuggestions(false);
        inputRef.current.blur();


      }
    };

    const handleClick = (event) => {
      const divText = event.target.textContent;
      if(inputRef.current.value === divText) {

        setQuery(divText)
        navigate(`search?q=${divText}`)
        addSearchToLocalstorage()
        setShowSuggestions(false);
      } 
    };

    const handleInputFocus = () => {
      setShowSuggestions(true);
    };
  
    const handleInputBlur = () => {
      // setShowSuggestions(false);
      setTimeout(() => {
      setShowSuggestions(true);
    }, 200);
    };
  

    const handleClickOutside = (event) => {
      if (searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        suggestionPaneRef.current &&
        !suggestionPaneRef.current.contains(event.target) && searchElementRef.current &&
        !searchElementRef.current.contains(event.target)) {
        // Clicked outside of the search container, hide it
        setShowSuggestions(false);

      }
    };

  
    useEffect(() => {
      const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      setSuggestions(searchHistory);
    }, []);

 const addSearchToLocalstorage = () => {
  if (query.trim() !== '') {
    const updatedSuggestions = [query, ...suggestions.filter((s) => s !== query)];
    setSuggestions(updatedSuggestions.slice(0, 5)); // Limit the number of suggestions to show
    localStorage.setItem('searchHistory', JSON.stringify(updatedSuggestions));
  }
 }

    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

  return (
    <>
 
    <InputGroup as="div" hideBelow={hideMeBellow} w="full" className='search' display="flex" gap={10} ref={searchContainerRef}>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input borderRadius={16} className='input' type='text'  placeholder="L'univers des possibles de l'#AfricaTech"
     value={query}
     onChange={handleInputChange}
     onKeyUp={onKeyUp}
     outline="none"
     ref={inputRef}
     onFocus={handleInputFocus}
    //  onBlur={handleInputBlur}
     _focus={{borderBottomLeftRadius:"0", borderBottomRightRadius:"0", outline:"none", borderStyle:"none", borderColor:"gray.100", borderWidth:"0"}}
     />


    
  { showSuggestions && suggestions.length > 0 && (
    <Box className='search-results-container' p={2} zIndex={100} overflow="scroll" minH="50vh" ref={suggestionPaneRef}>
          <Flex  borderStyle="solid" borderColor="gray.100" borderBottomWidth={1} >

          <Heading fontSize={14} py={5} px={2}>Recherches recentes</Heading>

          </Flex>
          
        <>
        {  (
          <>
          {query && suggestions.map((suggestion) => (
            <Text noOfLines={[1,2]} key={suggestion} className="search-result" onClick={handleClick} ref={searchElementRef}>
            {highlightMatch(suggestion )}
      </Text>
          ))}
          </>
        )}
          
        </>
      

     
{/* 
<Flex  borderStyle="solid" borderColor="gray.100" borderBottomWidth={1} >

<Heading fontSize={14} py={5} px={2}>Organisations</Heading>

</Flex>      
{query && results.map((result, index) => (
           <>
            <Text noOfLines={[1,2]} key={index} className="search-result" onClick={handleClick} >
            {highlightMatch(result.name)}
      </Text>
        
    
           
           </> 
          ))} */}
        </Box>
      )}
  </InputGroup>

     </>
  )
}

export default Searchbar