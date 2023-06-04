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
          <Flex gap="10"  justifyContent={{ base: 'center', md: "space-between" }} alignItems={{ base: 'center', md: "space-between" }}>
            <Box w={{ base: '20%', md: "10%" }} h="70px" as="a" href="/"><Image src={Logo} fit ='contain'
          w="100%"
          h="100%"/></Box>
          <Flex w="45%" alignItems="center">
              <Searchbar hideMeBellow="md"/>
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
              
              <>
              <IconButton
                variant="ghost"
                icon={<MenuIcon fontSize="1.25rem" />}
                aria-label="Open Menu"
                onClick={onOpen}
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

          <Flex w="100%" alignItems="center" px={5} py={5} hideFrom="md"> 
          <Searchbar/>
          </Flex>
        </Container>
      </Box>
      </Box>
      <Outlet/>
    </>  
  )
}
