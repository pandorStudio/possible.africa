import { Text } from "@chakra-ui/react";

export const NoMoreDataToLoad = () => {
    return (
      <Text
        textAlign="center"
        border="2px solid #2bb19c"
        borderTopLeftRadius="2rem"
        borderRightRadius="2rem"
        py="1rem"
        mt="2rem"
      >
        Plus rien à charger pour le moment !
      </Text>
    );
}