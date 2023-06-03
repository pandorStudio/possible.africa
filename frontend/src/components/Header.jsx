import { Outlet, Link as ReachLink } from "react-router-dom";
import Logo from "../assets/LogoPossible.png"
import {MenuIcon, SearchIcon} from "../assets/icons"

import {
  Box,
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  useBreakpointValue,
  Heading,
  Spacer,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react'
import CustomLink from "./CustomLink";


export const Header = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  })
  return (
    <>
    <Box
      as="section"
      pb={{
        base: '1',
        md: '5',
      }}
    >
      <Box as="nav" bg="bg-surface">
        <Container
          py={{
            base: '4',
            lg: '6',
          }}
          maxW="container.xl"
          alignItems="center"
          justifyContent="center"
        >
          <Flex gap="10"  justifyContent="space-between">
            <Box w="10%" h="70px" as="a" href="/"><Image src={Logo} fit ='contain'
          w="100%"
          h="100%"/></Box>
          <Flex w="40%" alignItems="center">
          <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <SearchIcon color='gray.300' />
    </InputLeftElement>
    <Input type='text' focusBorderColor="teal.500" borderRadius={20}  placeholder='Rechercher une organisation'/>
  </InputGroup>
          </Flex>
            {isDesktop ? (
              <Flex justifyContent="space-between" alignItems="center">
                <ButtonGroup variant="link" spacing="5">
                  {[{name:'Possible', link:"/" }, {name:'Entrepreneurs', link:"/entrepreneurs" },{name:'Time For Africa', link:"/timeforafrica" }].map((item) => (

                    <CustomLink  key={item.name} as={ReachLink} to={item.link}><Heading size="md">
                      {item.name}
                      </Heading></CustomLink>
                  ))}
                </ButtonGroup>
               
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<MenuIcon fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </Flex>
        </Container>
      </Box>
      </Box>
      <Outlet/>
    </>  
  )
}
