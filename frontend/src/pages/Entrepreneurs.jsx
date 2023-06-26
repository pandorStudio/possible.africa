import { Alert, Container, Heading, Text, VStack } from "@chakra-ui/react"

function Entrepreneurs() {
  return (
<Container maxW="container.lg" p={0}>
    <VStack w="full" h="full" py={10} px={{ base: "30px", md: '' }}  gap={20} alignItems="flex-start">
    <Alert status="success" flexDirection="column">
        <Heading size="xl">Entrepreneurs ?</Heading>
        <Text textAlign="center">{`Cette page n'est pas encore terminée. Nous sommes en train de mettre en place le programme qui peut vous aider à faire décoller votre business en Afrique. Restez connectés.`}</Text>
    </Alert>  
    </VStack>
</Container>
  )
}

export default Entrepreneurs

