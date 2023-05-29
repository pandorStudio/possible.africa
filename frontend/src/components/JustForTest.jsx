import { Container, Flex, Heading, VStack } from '@chakra-ui/react'

function JustForTest() {
  return (
    <Container maxW="container.xl" p={0}>
        <Flex h="100vh" py={20}>
            <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
                <Heading size="2xl">Your details</Heading>
            </VStack>
            <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start" bg="gray.50">

</VStack>
        </Flex>

    </Container>
  )
}

export default JustForTest