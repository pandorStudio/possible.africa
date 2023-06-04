import { Outlet, Link as ReachLink } from "react-router-dom";
// import Logo from "../assets/logopossibleafrica.png"
import {CalendarIcon, LawIcon, MenuIcon, NewspaperIcon, OrganisationsIcon, PodcastIcon, WorkIcon} from "../assets/icons"

import {
  Box,
  Container,
  Flex,
  IconButton,
  useBreakpointValue,
  Divider,
  Text,
} from '@chakra-ui/react'
import CustomLink from "./CustomLink";


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
          px={0}
          maxW={{ base: '100%', md: "container.xl" }}
          

        >
          
            
            {isDesktop ? (
              <Flex justify="center" gap="8">

                  {[{name:'Organisations', link:"/organisations", icons: <OrganisationsIcon/> },
                  {name:'Podcast/Interview', link:"/interviews", icons: <PodcastIcon/> },
                  {name:'Actualités', link:"/actualites", icons: <NewspaperIcon/> },
                  {name:'Agenda', link:"/agenda", icons: <CalendarIcon/> },
                  {name:'Opportunités de financement', link:"/opportunites", icons: <LawIcon/> },
                  {name:'Emplois', link:"/emplois", icons: <WorkIcon/> }].map((item) => (

                    <CustomLink  key={item.name} as={ReachLink} to={item.link}>
                        <Flex flexDir="row" gap={1}>
                            {item.icons}
                            <Text fontWeight="400" fontSize="md">{item.name}</Text>
                        </Flex>
                        </CustomLink>
                  ))}


              </Flex>
            
            ) : (
              <Flex justify="flex-start" gap="8" overflow="scroll" className="scrollContainer" px={8}>

                  {[{name:'Organisations', link:"/organisations"},
                  {name:'Podcast/Interview', link:"/interviews"},
                  {name:'Actualités', link:"/actualites" },
                  {name:'Agenda', link:"/agenda" },
                  {name:'Opportunités', link:"/opportunites" },
                  {name:'Emplois', link:"/emplois" }].map((item) => (

                    <CustomLink  key={item.name} as={ReachLink} to={item.link}>
                        <Flex flexDir="row" gap={1}>
                            {item.icons}
                            <Text fontWeight="400" fontSize="md">{item.name}</Text>
                        </Flex>
                        </CustomLink>
                  ))}


              </Flex>
            )}
        </Container>
        <Divider/>
      </Box>
      
      </Box>
      
      <Outlet/>
    </>  
  )
}
