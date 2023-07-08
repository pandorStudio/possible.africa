import { Button, Container, Heading, SlideFade, VStack, useDisclosure } from '@chakra-ui/react'

function CenteredContainer(children) {
    const { isOpen, onToggle } = useDisclosure()

  return (
    <SlideFade in={onToggle}>

    <Container display="flex" maxW="container.lg" minH="45vh" p={0} alignItems="center" justifyContent="center">

      {children}

      </Container>
    </SlideFade>
  )
}

export default CenteredContainer