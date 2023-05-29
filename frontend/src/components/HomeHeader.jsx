import { Outlet, Link as ReachLink } from "react-router-dom";
// import Logo from "../assets/logopossibleafrica.png"
import {CalendarIcon, LawIcon, MenuIcon, NewspaperIcon, PodcastIcon, WorkIcon} from "../assets/icons"

import {
  Box,
  Link,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  Divider,
} from '@chakra-ui/react'


export const HomeHeader = () => {
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
            lg: '5',
          }}
          maxW="container.xl"
          

        >
          
            
            {isDesktop ? (
              <Flex justify="center" gap="5">

                  {[{name:'Podcast/Interview', link:"/", icons: <PodcastIcon/> },
                  {name:'Actualités', link:"/actualites", icons: <NewspaperIcon/> },
                  {name:'Agenda', link:"/agenda", icons: <CalendarIcon/> },
                  {name:'Opportunités de financement', link:"/opportunites", icons: <LawIcon/> },
                  {name:'Actualités', link:"/emplois", icons: <WorkIcon/> }].map((item) => (

                    <Link  key={item.name} as={ReachLink} to={item.link}>
                        <Flex flexDir="row">
                            {item.icons}
                            {item.name}
                        </Flex>
                        </Link>
                  ))}


              </Flex>
            
            ) : (
              <IconButton
                variant="ghost"
                icon={<MenuIcon fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
        </Container>
        <Divider/>
      </Box>
      
      </Box>
      
      <Outlet/>
    </>  
  )
}
