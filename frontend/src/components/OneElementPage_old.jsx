import {Box, Container, Flex, Grid, GridItem, Heading, HStack, Image, Link, Text} from "@chakra-ui/react"
import ArrowLeftSolidCustomIcon from "./icons/ArrowLeftSolidCustomIcon.jsx";
import TwitterCustomIcon from "./icons/TwitterCustomIcon.jsx";
import FacebookCustomIcon from "./icons/FacebookCustomIcon.jsx";
import LinkedinCustomIcon from "./icons/LinkedinCustomIcon.jsx";
import LinkSolidCustomIcon from "./icons/LinkSolidCustomIcon.jsx";
import BookmarkRegularCustomIcon from "./icons/BookmarkRegularCustomIcon.jsx";

function OneElementPage({iconSx, backUrl, news}) {

  const date = new Date(news?.createdAt);
  const jour = date.getDate();
  const mois = date.toLocaleString('default', { month: 'long' });
  
  return (
      <Container maxW="container.lg" p={0}>
        <Grid templateColumns="repeat(6, 1fr)" gap={20}>
          <GridItem colSpan={4} p={0}>
            <Flex ml={10}><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl} mr="1"/></Flex>
            <Flex>
              <HStack w="full" h="full" py={5} px={10} spacing={5} alignItems="flex-start" bg="red">
                <Box width={100} height={100} overflow="hidden">
                  <Image src={news?.user?.avatar} w="100%" fit="cover" borderRadius="full" alt="image" />
                </Box>
                <Box w="full">
                  <Flex direction="column" justify="space-around">
                  <Heading size="sm">{news?.user?.firstname} {news?.user?.lastname}</Heading>
                    <Flex justify="flex-start" color="gray.500">
                      <Box fontSize={15} mr={4}>{jour} {mois}</Box>
                      <Box fontSize={15}>5 min de lecture</Box>
                    </Flex>
                  </Flex>
                </Box>
                <HStack>
                  <TwitterCustomIcon sx={iconSx}/>
                  <FacebookCustomIcon sx={iconSx}/>
                  <LinkedinCustomIcon sx={iconSx}/>
                  <LinkSolidCustomIcon sx={iconSx}/>
                  {/*<BookmarkSolidCustomIcon sx={iconSx}/>*/}
                  <BookmarkRegularCustomIcon sx={iconSx}/>
                  {/*<PlusSolidCustomIcon sx={iconSx}/>*/}
                </HStack>
              </HStack>
            </Flex>
            <Box as="main" py={5} px={10}>
              Allons-nous vers une nouvelle crise financière ?
            </Box>
          </GridItem>
          <GridItem colSpan={2} p={5} borderLeft="1px solid rgba(0,0,0,0.1)" h="100vh">
            <Heading size="sm">Plus sur possible</Heading>
            <Flex spacing={3} mt={5}>
              <Box w="70%" h="100px">
                <Flex direction="column" justify="space-around">
                  <HStack spacing={3}>
                    <Image src="https://via.placeholder.com/35x35" borderRadius="100%" alt="image" />
                    <Text fontSize={15} color="gray.500" fontWeight="bold">Yann Marie J.</Text>
                  </HStack>
                  <Box>
                    <Text fontSize={13} color="gray.700" fontWeight="bold">Lorem ipsum dolor sit amet, adipisicing elit.</Text>
                  </Box>
                </Flex>
              </Box>
              <Box w="30%" h="100px">
                <Flex direction="column" justify="center">
                  <Image src="https://via.placeholder.com/100x100" borderRadius="10%" alt="image" />
                </Flex>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
  )
}

export default OneElementPage;