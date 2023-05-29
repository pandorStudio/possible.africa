import { Outlet, Link as ReachLink } from "react-router-dom";
// import Logo from "../assets/logopossibleafrica.png"
import {MenuIcon} from "../assets/icons"

import {
  Box,
  Link,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  Heading,
  Spacer,
} from '@chakra-ui/react'


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
        >
          <Flex spacing="10">
            <Box>Logo</Box>
          <Spacer/>
            {isDesktop ? (
              <Flex justify="space-between">
                <ButtonGroup variant="link" spacing="8">
                  {[{name:'Possible', link:"/" }, {name:'Entrepreneurs', link:"/entrepreneurs" },{name:'Time For Africa', link:"/timeforafrica" }].map((item) => (

                    <Link  key={item.name} as={ReachLink} to={item.link}><Heading size="md">
                      {item.name}
                      </Heading></Link>
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
