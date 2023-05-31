import { Alert, AlertIcon, Container, Heading, Text, VStack } from "@chakra-ui/react";

function TimeForAfrica() {
  return (
<Container maxW="container.lg" p={0}>
    <VStack w="full" h="full" py={10} px={10} spacing={10} alignItems="flex-start">
    <Alert status="success" flexDirection="column">
    <AlertIcon />
        <Heading size="xl">This is the Time for Africa</Heading>
        <Text>Nous arrivons avec des choses superbes</Text>
    </Alert>  
          </VStack>
</Container>  )
}

export default TimeForAfrica