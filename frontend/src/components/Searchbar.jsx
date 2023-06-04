import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '../assets/icons'
import { useSearchOrganisationsQuery } from '../features/api/apiSlice';
import { useState } from 'react';

function Searchbar({hideMeBellow}) {

    const [searchTerm, setSearchTerm] = useState('');
    const { data: organisations, isLoading } = useSearchOrganisationsQuery(searchTerm);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };

  return (
    <>
 
    <InputGroup hideBelow={hideMeBellow} >
    <InputLeftElement pointerEvents='none'>
      <SearchIcon color='gray.300' />
    </InputLeftElement>
    <Input type='text' focusBorderColor="teal.500" borderRadius={20}  placeholder="L'univers des possibles de l'#AfricaTech" value={searchTerm} onChange={handleInputChange}/>
  </InputGroup>

{isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {organisations && organisations.map((organisation) => <div key={organisation.id}>{organisation.title}</div>)}
    </div>
  )}
     </>
  )
}

export default Searchbar