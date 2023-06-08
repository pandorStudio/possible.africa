import { Alert, Container, Heading, Text, VStack } from "@chakra-ui/react";

function TimeForAfrica() {
  return (
<Container maxW="container.lg" p={0}>
    <VStack w="full" h="full" py={20} px={10} spacing={10} alignItems="flex-start">
    <Alert status="success" flexDirection="column">
        <Heading size="xl">This is Time for Africa</Heading>
        <Text textAlign="center">{`Nous sommes en train de fédérer une communauté d'investisseurs pour soutenir l'amorçage en Afrique. Cette page sera bientôt en ligne.`}</Text>
    </Alert>  
          </VStack>
</Container>  )
}

export default TimeForAfrica