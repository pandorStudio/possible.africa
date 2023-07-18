import { Alert, Container, Heading, Text, VStack } from "@chakra-ui/react";

function Maintenance() {
  return (
    <Container maxW="container.lg" p={0}>
      <VStack
        w="full"
        h="full"
        py={20}
        px={10}
        spacing={10}
        alignItems="flex-start"
      >
        <Alert status="success" flexDirection="column">
          <Heading size="xl">Bienvenue sur Possible.Africa</Heading>
          <Text textAlign="center">{`Ce site est actuellement en maintenance, il sera bientôt remis en ligne.`}</Text>
        </Alert>
      </VStack>
    </Container>
  );
}

export default Maintenance;
