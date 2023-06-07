import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { SearchIcon } from '../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useGetEventsQuery, useGetJobsQuery, useGetOpportunitiesQuery, useGetOrganisationsQuery, useGetPostCategoriesQuery, useGetPostsQuery } from '../features/api/apiSlice';

function Searchbar({ hideMeBellow }) {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParamValue = urlParams.get('q');

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const suggestionPaneRef = useRef(null);
  const searchElementRef = useRef(null);

  const [query, setQuery] = useState(queryParamValue);
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  const {
    data: newsCategories = [],
} = useGetPostCategoriesQuery({limit: 10, page: 1, fields: [], eq: [{field: "slug", value: "/actualites"}]});

const {
  data: interviewCategories = [],
} = useGetPostCategoriesQuery({limit: 10, page: 1, fields: [], eq: [{field: "slug", value: "/podcast"}]});
  

  const { data: organisations } = useGetOrganisationsQuery();
  const { data: jobs } = useGetJobsQuery();
  const { data: opportunities } = useGetOpportunitiesQuery();
  const { data: events } = useGetEventsQuery();
  const { data: news_posts } = useGetPostsQuery({limit: 10, page: 1, fields: [], eq: [{field: "categorie", value: `${newsCategories[0]?._id}`}]});
  const { data: interview_posts } = useGetPostsQuery({limit: 10, page: 1, fields: [], eq: [{field: "categorie", value: `${interviewCategories[0]?._id}`}]});


  useEffect(() => {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSuggestions(searchHistory);
  }, []);
  

  const jobTitles = jobs?.map((job) => job.title) || [];
  const opportunityTitles = opportunities?.map((opportunity) => opportunity.title) || [];
  const eventsTitles = events?.map((event) => event.title) || [];
  const newsTitles = news_posts?.map((post) => post?.title) || [];
  const interviewTitles = interview_posts?.map((post) => post?.title) || [];




  const searchContainerRef = useRef(null);
  
  useEffect(() => {
    const handleClick = (event) => {
      if (
        suggestionPaneRef.current &&
        suggestionPaneRef.current.contains(event.target)
      ) {
        // Clicked inside the suggestion pane, don't hide it
        return;
      }
  
      if (
        searchContainerRef.current &&
        searchContainerRef.current.contains(event.target)
      ) {
        // Clicked inside the search container, show suggestions
        setShowSuggestions(true);
      } else {
        // Clicked outside the search container, hide suggestions
        setShowSuggestions(false);
      }
    };
  
    document.addEventListener('click', handleClick);
  
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  
  const performSearch = (query) => {
    let results = [];
    if (organisations) {
      results = organisations.filter((org) =>
        org?.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return results;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      const results = performSearch(value);
      setSearchResults(results);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };



  const handleSearchResultClick = (suggestion) => {
    const formattedQuery = suggestion.replace(/ /g, '+');
    navigate(`search?q=${formattedQuery.replace('#', "%23" )}`);
    setQuery(suggestion);
    addSearchToLocalstorage(suggestion);
    setShowSuggestions(false);
  };

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

  const addSearchToLocalstorage = (query) => {
    if (query.trim() !== '') {
      const updatedSuggestions = [query, ...suggestions.filter((s) => s !== query)].slice(0, 5);
      setSuggestions(updatedSuggestions);
      localStorage.setItem('searchHistory', JSON.stringify(updatedSuggestions));
    }
  };


  const combinedSuggestions = new Set();

  if (query === '') {
    suggestions.forEach((suggestion) => combinedSuggestions.add(suggestion.toLowerCase()));
  } else {
    suggestions
      .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      .forEach((suggestion) => combinedSuggestions.add(suggestion.toLowerCase()));
  }
  
  if (query && !suggestions.includes(query)) {
    performSearch(query).forEach((result) => combinedSuggestions.add(result.name.toLowerCase()));
  }


  jobTitles.forEach((title) => combinedSuggestions.add(title.toLowerCase()));
  opportunityTitles.forEach((title) => combinedSuggestions.add(title.toLowerCase()));
  eventsTitles.forEach((title) => combinedSuggestions.add(title.toLowerCase()));
  newsTitles.forEach((title) => combinedSuggestions.add(title.toLowerCase()));
  interviewTitles.forEach((title) => combinedSuggestions.add(title.toLowerCase()));


  
  return (
    <InputGroup as="div" hideBelow={hideMeBellow} w="full" className="search" display="flex" gap={10} ref={searchContainerRef}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        borderRadius={16}
        className="input"
        type="text"
        placeholder="L'univers des possibles de l'#AfricaTech"
        value={query}
        onChange={handleInputChange}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {

            e.preventDefault();
            const formattedQuery = query.replace(/ /g, '+');
            navigate(`search?q=${formattedQuery}`);
            addSearchToLocalstorage(query);
            setShowSuggestions(false);
            inputRef.current.blur();
          }
        }}
        outline="none"
        ref={inputRef}
        onFocus={() => setShowSuggestions(true)}
        _focus={{
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          outline: 'none',
          borderStyle: 'none',
          borderColor: 'gray.100',
          borderWidth: '0',
        }}
      />

      {(showSuggestions || query === '') && (
        <Box className="search-results-container" p={2} zIndex={100} overflow="scroll" minH="50vh" ref={suggestionPaneRef}>
          {Array.from(combinedSuggestions).filter((suggestion) => (typeof suggestion === 'string' ? suggestion : suggestion.name).toLowerCase().includes(query.toLowerCase()))
  .map((suggestion)  => (
            <Text
              noOfLines={[1, 2]}
              key={suggestion}
              className="search-result"
              onClick={() => handleSearchResultClick(suggestion)}
              ref={searchElementRef}
            >
            { highlightMatch(typeof suggestion === 'string' ? suggestion : suggestion.name)}
            </Text>
          ))}
        </Box>
      )}
    </InputGroup>
  );
}

export default Searchbar;
