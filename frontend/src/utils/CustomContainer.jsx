import { Container, Fade, SlideFade, Text, VStack, useDisclosure } from '@chakra-ui/react'

function CustomContainer({content, title}) {
  const { isOpen, onToggle } = useDisclosure()



  return (

    <SlideFade in={onToggle}>

    <Container maxW="container.lg" minH="45vh" p={0} >

      <VStack w="full" h="full" py={4} px={{ base: "30px", md: '' }} spacing={{ base: "25px", md: '10px' }} alignItems="flex-start">
        <Text fontSize={14} color="gray.500" mb={3}>{title}</Text>
                {content}
      </VStack>
      </Container>
    </SlideFade>

  )
}

export default CustomContainer