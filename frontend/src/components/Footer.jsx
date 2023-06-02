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

    <Container  maxW="container.lg" my={20} >
    <Flex maxW="100%" alignItems="center">
            <Image src="/Au-service-de.jpeg" minW="100%" fit="cover" alt="image" fallbackSrc='/placeholder_org_couverture.jpeg' />
        </Flex>
    </Container>
    <Box
      as="section"
     
    >

      <Box as="footer" bg="bg-surface" borderStyle="solid" borderColor="gray.100" borderTopWidth={1}>
        <Container
          py={{
            base: '2',
            lg: '3',
          }}
          maxW="container.xl"
          alignItems="center"
          justifyContent="center"
        >
          <Flex gap="10"  justifyContent="space-between">
            <Box w="10%" h="70px"><Image src={Logo} fit ='contain'
          w="100%"
          h="100%"/></Box>
          <Flex w="40%" alignItems="center">
          
          </Flex>
            {isDesktop ? (
              <Flex justifyContent="space-between" alignItems="center">
                <ButtonGroup variant="link" spacing="5">
                  {[{name:'Contributions', link:"/" }, {name:'A propos', link:"/" },{name:'Mentions Légales', link:"/" }].map((item) => (

                    <CustomLink  key={item.name} as={ReachLink} to={item.link}><Heading size="sm" fontWeight="400">
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
    </>  
  )
}
