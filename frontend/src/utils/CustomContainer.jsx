import { Container, Text, VStack } from '@chakra-ui/react'

function CustomContainer({content, title}) {
  return (
    <Container maxW="container.lg" p={0} >

    <VStack w="full" h="full" py={4} px={{ base: "30px", md: '' }} spacing={{ base: "25px", md: '10px' }} alignItems="flex-start">
       <Text fontSize={14} color="gray.500" mb={3}>{title}</Text>
              {content}
          </VStack>
</Container>

  )
}

export default CustomContainer