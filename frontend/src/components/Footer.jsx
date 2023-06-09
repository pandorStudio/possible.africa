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


export const Footer = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  })
  return (
    <>
    <Container
          py={{
            base: '4',
            lg: '6',
          }}
          maxW="container.xl"
          mt={20}
        >


          <Flex gap="10"  direction={{ base: 'column', md: "row" }} as="footer" bg="bg-surface" borderStyle="solid" borderColor="gray.100" borderTopWidth={1} 
  py={{
    base: '2',
    lg: '3',
  }}
  minW="full"
  alignItems="center"
  justifyContent={{ base: 'center', md: "space-between" }}>
            <Box w={{ base: '30%', md: "10%" }} h="70px" as="a" href="/">
              <Image src={Logo} fit ='contain'
          w="100%"
          h="100%"/>
          </Box>
       
            
              <Flex justifyContent={{ base: 'center', md: "flex-end" }} alignItems="center" w={{ base: '100%', md: "50%" }}>
                <ButtonGroup variant="link" spacing="5">
                  {[{name:'Contributions', link:"/" }, {name:'A propos', link:"/" },{name:'Mentions Légales', link:"/" }].map((item) => (

                    <CustomLink  key={item.name} as={ReachLink} to={item.link}><Heading size="sm" fontWeight="400">
                      {item.name}
                      </Heading></CustomLink>
                  ))}
                </ButtonGroup>
               
              </Flex>
          
          </Flex>
        </Container>

    </>  
  )
}
