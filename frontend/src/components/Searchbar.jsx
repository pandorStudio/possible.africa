import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { SearchIcon } from '../assets/icons'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGetOrganisationsQuery } from '../features/api/apiSlice';
import { Divider } from '@chakra-ui/react'


function Searchbar({hideMeBellow}) {

  const [query, setQuery] = useState('');
  let navigate = useNavigate();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetOrganisationsQuery();
  let content;

 
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false)

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
      result.name.toLowerCase().includes(query.toLowerCase())
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
      } else {
        setSearchResults([]);
      }
    }

    const onKeyUp = (e) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        event.preventDefault();
        navigate(`search?q=${query}`)
      }
    };

    const handleClick = (event) => {
      const divText = event.target.textContent;
        setQuery(divText)
        navigate(`search?q=${divText}`)
      console.log(divText)

    };
  

  return (
    <>
 
    <InputGroup as="div" hideBelow={hideMeBellow} w="full" className='search' display="flex" gap={10}>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input borderRadius={16} className='input' type='text'  placeholder="L'univers des possibles de l'#AfricaTech"
     value={query}
     onChange={handleInputChange}
     onKeyUp={onKeyUp}
     outline="none"
     _focus={{borderBottomLeftRadius:"0", borderBottomRightRadius:"0", outline:"none", borderStyle:"none", borderColor:"gray.100", borderWidth:"0"}}
     />


  {(
        <Box className='search-results-container' p={2} zIndex={100} overflow="scroll" minH="50vh">
          <Flex  borderStyle="solid" borderColor="gray.100" borderBottomWidth={1} >

          <Heading fontSize={16} py={5} px={2}>Resultats</Heading>

          </Flex>
          {query && searchResults.map((result, index) => (
           <>
            <Text noOfLines={[1,2]} key={index} className="search-result" onClick={handleClick} >
            {highlightMatch(result.name)}
      </Text>
            <Text noOfLines={[1,5]} key={index} className="search-result" onClick={handleClick} >
            {highlightMatch(result.description)}
      </Text>
           
           </> 
          ))}
          {/* {searchResults.map((result, index) => (

      result.map((item) => (
 
     <Flex key={index} bg="green">
              {item}
    </Flex>
  
))
           
          ))} */}

          
        </Box>
      )}
  </InputGroup>

     </>
  )
}

export default Searchbar