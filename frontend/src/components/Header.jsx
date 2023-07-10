/* eslint-disable no-unused-vars */

import { Outlet, Link as ReachLink } from "react-router-dom";
import Logo from "../assets/LogoPossible.png";
import { MenuIcon } from "../assets/icons";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from "react";
import CustomLink from "./CustomLink";
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
      minW={{base:"100vw",lg:"container.xl"}}      
      
    >
      <Box as="nav" bg="bg-surface" minW="100%">
        
          <Flex gap={{base:"8", md:"180" }}
          
          justifyContent={{ base: 'center', md: "flex-start" }} 
          alignItems={{ base: 'center', md: "space-between" }}
          direction={{
            base: 'column',
            md: 'row',
          }}
          >
          
            <Box w={{ base: '100%', md: "10%" }} h="70px" display="flex" flexDirection="row" alignItems="space-between" justifyContent="space-between">
              
              <Box as="a" href="/" w="100px">

              <Image src={Logo} fit ='contain'
          w="100%"
          h="100%"
          />
              </Box>
              <Box display="flex" alignItems="center">

            <Button   _hover={{ bg: 'teal.600' }}
hideFrom="md" as="a" href='https://possible-africa.notion.site/POSSIBLE-AFRICA-ddb414537adf439f9f06c5e63914d1be?pvs=4' target='_blank'>En savoir plus</Button>

</Box>
          </Box>

            <Flex w={{ base: '100%', md: "70%" }}  alignItems="center" justifyContent="center" alignContent="center">

          
                   <Searchbar zIndex={100}/>
        
              
            </Flex>
         
              <Flex justifyContent="space-between" alignItems="center">
              <Button   _hover={{ bg: 'teal.600' }}
hideBelow="md"
as="a" href='https://possible-africa.notion.site/POSSIBLE-AFRICA-ddb414537adf439f9f06c5e63914d1be?pvs=4'
target='_blank'
>En savoir plus</Button>
               
              </Flex>

                 {/* {isDesktop ? (
            ) : (
              
              <>
              <IconButton
                variant="ghost"
                icon={<MenuIcon fontSize="1.25rem" />}
                aria-label="Open Menu"
                onClick={onOpen}
                order={2}

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
            )} */}
          </Flex>

         
      </Box>
      </Container>
      <Outlet/>
    </>  
  )
}
