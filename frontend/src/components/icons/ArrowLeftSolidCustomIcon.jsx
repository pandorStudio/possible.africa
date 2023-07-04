import {Box, Flex} from "@chakra-ui/react";
import {Link} from "react-router-dom";

function ArrowLeftSolidCustomIcon(props) {
  return (
      <Link to={props.backUrl}>
          <Flex justify="flex-start" alignItems="center" as="span" size="sm" {...props}>
              <Box as="span" mr={1}>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#868686"
                      width="15"
                      height="15"
                      viewBox="0 0 512 512"
                  ><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
              </Box>
              <Box color="#868686">Retour</Box>
          </Flex>
      </Link>
  );
}
export default ArrowLeftSolidCustomIcon;
