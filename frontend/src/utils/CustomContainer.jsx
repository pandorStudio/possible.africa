import { Container, Heading, VStack } from '@chakra-ui/react'

function CustomContainer({content, title}) {
  return (
    <Container maxW="container.lg" p={0} >

    <VStack w="full" h="full" py={5} px={{ base: "30px", md: '' }} spacing={{ base: "25px", md: '' }} alignItems="flex-start">
       <Heading>{title}</Heading>
              {content}
          </VStack>
</Container>

  )
}

export default CustomContainer