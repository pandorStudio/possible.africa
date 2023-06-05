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
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Stack,
} from '@chakra-ui/react'
import CustomLink from "./CustomLink";
import { useState } from "react";
import Searchbar from "./Searchbar";


export const Header = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = useState('right')
  return (
    <>
    <Container
      as="section"
      pb={{
        base: '1',
        md: '5',
      }}
      

      py={{
        base: '4',
        lg: '6',
      }}
      maxW="container.xl"      
    >
      <Box as="nav" bg="bg-surface">
        
          <Flex gap="8" 
          
          justifyContent={{ base: 'center', md: "space-between" }} 
          alignItems={{ base: 'center', md: "space-between" }}
          direction={{
            base: 'column',
            md: 'row',
          }}
          >
          
            <Box w={{ base: '50%', md: "10%" }} h="70px" as="a" href="/"><Image src={Logo} fit ='contain'
          w="100%"
          h="100%"/></Box>

            <Flex w={{ base: '100%', md: "45%" }}  alignItems="center" >

          
                   <Searchbar zIndex={100}/>
        
              
            </Flex>
            {isDesktop ? (
              <Flex justifyContent="space-between" alignItems="center" zIndex={-1}>
                <ButtonGroup variant="link" spacing="5">
                  {[{name:'Possible', link:"/" }, {name:'Entrepreneurs', link:"/entrepreneurs" },{name:'Time For Africa', link:"/timeforafrica" }].map((item) => (

                    <CustomLink  key={item.name} as={ReachLink} to={item.link}><Heading size="md">
                      {item.name}
                      </Heading></CustomLink>
                  ))}
                </ButtonGroup>
               
              </Flex>

              
            ) : (
              
              <>
              <IconButton
                variant="ghost"
                icon={<MenuIcon fontSize="1.25rem" />}
                aria-label="Open Menu"
                onClick={onOpen}
                order={2}
                zIndex={-1}
              />
                 <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
                <DrawerBody>
                <Stack spacing='24px'>

                  {[{name:'Possible', link:"/" }, {name:'Entrepreneurs', link:"/entrepreneurs" },{name:'Time For Africa', link:"/timeforafrica" }].map((item) => (

                    <CustomLink  key={item.name} as={ReachLink} to={item.link} onClick={onClose}><Heading size="sm">
                      {item.name}
                      </Heading></CustomLink>
                  
                  )
                  )
                }
                </Stack>
               
                </DrawerBody>
              </DrawerContent>
            </Drawer>
              </>
            )}
          </Flex>

         
      </Box>
      </Container>
      <Outlet/>
    </>  
  )
}
