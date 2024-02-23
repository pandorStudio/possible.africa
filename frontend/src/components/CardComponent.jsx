import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  CategoryIcon,
  CountryIcon,
  MapIcon,
  MoneyIcon,
  OrganisationsIcon,
  TargetIcon,
  TypeIcon,
  WorkIcon,
} from "../assets/icons";
import {
  AuthorIcon,
  BusinessIcon,
  EarthIcon,
  EditorIcon,
  ReturnIcon,
  SearchIcon,
  TagIcon,
} from "./CustomIcons/CustomIcons";

// eslint-disable-next-line react/prop-types
function CardComponent({
  key,
  title,
  description,
  imgUrl,
  isLoaded,
  link,
  postType,
  type,
  country,
  dateDebut,
  dateFin,
  company,
  location,
  hideMeBellow,
  organisations,
  labels,
  countries,
  createdAt,
  source,
  editors,
  authors,
  contacts,
  activity_areas,
  organisation_types,
  language,
  sitWebLink,
  airtableRegion,
  airtableHeadquarter,
  airtableOperationnalCountries,
  airtableSector,
  airtableRelaredArticles,
}) {
  let card = <></>;

  switch (postType) {
    case "Actualités":
      card = (
        <Card
          key={key}
          variant="outline"
          border="1px solid"
          borderColor="red.50"
          w={{ base: "85vw", md: "2xl" }}
          padding={{ base: "0px" }}
          paddingBottom={{ base: "0px", md: "5px" }}
          marginY={{ base: "10px" }}
          borderRadius="10px"
          overflow="hidden"
        >
          <CardHeader
            display="flex"
            justifyContent={{ base: "flex-start" }}
            position="relative"
            paddingY={{ base: 2 }}
            h={{ base: "40%" }}
          >
            {/* Badge */}
            {/* {editors?.length > 1 ? (
              <Box
                as="span"
                zIndex={1}
                position="absolute"
                top="22.5px"
                left="50px"
                w="20px"
                h="17px"
                rounded="full"
                backgroundColor="#50625F"
              >
                <Text
                  fontSize="10px"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  +{editors?.length - 1}
                </Text>
              </Box>
            ) : null} */}
            <Box
              as="div"
              mt={editors?.length > 1 ? { base: "5px" } : { base: "5px" }}
              mr={editors?.length > 1 ? { base: "18px" } : { base: "13px" }}
              h={{ base: "35px" }}
              w={{ base: "35px" }}
              border="1px solid rgba(217, 217, 217, 0.5)"
              backgroundColor="rgba(217, 217, 217, 0.5)"
              rounded="full"
              overflow="hidden"
            >
              <Image
                key={editors?.length > 0 ? editors[0]._id : ""}
                src={imgUrl}
                // src={editors?.length > 0 ? editors[0].logo : ""}
                alt={editors?.length > 0 ? editors[0].logo : ""}
                // fallbackSrc="/placeholder_org.jpeg"
                fit="contain"
                w={{ base: "35px" }}
                h={{ base: "35px" }}
                rounded="full"
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDir="column"
              color="#50625F"
            >
              <Box
                m={{ base: "0px 0px 0px 0px" }}
                p={{ base: "0 0 0 0" }}
                fontSize="105%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Box>
                  {/* {editors?.length > 0 ? editors[0].name : "Possible.Africa"} */}
                  {editors || "Possible.Africa"}
                </Box>
                {source ? (
                  <Link target="_blank" to={source}>
                    <ReturnIcon boxSize="18px" ml="5px" />
                  </Link>
                ) : null}
              </Box>
              <Box
                m={{ base: "0 0 0 0" }}
                p={{ base: "0 0 0 0" }}
                fontSize="70%"
                fontStyle="italic"
              >
                En ligne depuis le {createdAt}, language d&apos; origine :{" "}
                <Box as="span" color="#2BB19C">
                  {language}
                </Box>
              </Box>
            </Box>
          </CardHeader>
          <CardBody paddingY={{ base: "0" }}>
            <Text
              as="h1"
              fontWeight="bold"
              color="#2BB19C"
              lineHeight={{ base: "25px", md: "20px" }}
              fontSize="xl"
              paddingBottom={{ base: 1 }}
            >
              {/* {link ? <Link to={link}>{title}</Link> : { title }} */}
              {source ? (
                <Link target="_blank" to={source}>
                  {title}
                </Link>
              ) : (
                <Link to={link}>{title}</Link>
              )}
            </Text>
            {/* {description ? (
              <Text
                fontSize="90%"
                fontWeight="400"
                noOfLines={[2]}
                color="#0B4138"
                // lineHeight="15px"
              >
                {description}
              </Text>
            ) : null} */}
          </CardBody>
          {labels?.length > 0 ||
          countries?.length > 0 ||
          editors?.length > 0 ||
          authors?.length > 0 ? (
            <CardFooter
              className="cardFooter"
              paddingY={{ base: 2 }}
              color="#50625F"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              overflowX="scroll"
              overflowY="hidden"
            >
              {countries?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{countries?.length - 1}
                  </Box>
                </Box>
              ) : countries?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                </Box>
              ) : null}

              {labels?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <TagIcon boxSize="18px" mr="5px" />
                    <Box as="div">{labels[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{labels?.length - 1}
                  </Box>
                </Box>
              ) : labels?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <TagIcon boxSize="18px" mr="5px" />
                    <Box as="div">{labels[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {organisations?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <OrganisationsIcon boxSize="18px" mr="5px" />
                    <Box as="div">{organisations[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{organisations?.length - 1}
                  </Box>
                </Box>
              ) : organisations?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <OrganisationsIcon boxSize="18px" mr="5px" />
                    <Box as="div">{organisations[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {authors?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{authors[0]?.complete_name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{authors?.length - 1}
                  </Box>
                </Box>
              ) : authors?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{authors[0]?.complete_name}</Box>
                  </Box>
                </Box>
              ) : null}
            </CardFooter>
          ) : null}
        </Card>
      );
      break;
    case "Interview":
      card = (
        <Card
          key={key}
          variant="outline"
          border="1px solid"
          borderColor="red.50"
          w={{ base: "85vw", md: "2xl" }}
          padding={{ base: "0px" }}
          paddingBottom={{ base: "0px", md: "5px" }}
          marginY={{ base: "10px" }}
          borderRadius="10px"
          overflow="hidden"
        >
          <CardHeader
            display="flex"
            justifyContent={{ base: "flex-start" }}
            position="relative"
            paddingY={{ base: 2 }}
            h={{ base: "40%" }}
          >
            {/* Badge */}
            {editors?.length > 1 ? (
              <Box
                as="span"
                zIndex={1}
                position="absolute"
                top="22.5px"
                left="50px"
                w="20px"
                h="17px"
                rounded="full"
                backgroundColor="#50625F"
              >
                <Text
                  fontSize="10px"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  +{editors?.length - 1}
                </Text>
              </Box>
            ) : null}
            <Box
              as="div"
              mt={editors?.length > 1 ? { base: "5px" } : { base: "5px" }}
              mr={editors?.length > 1 ? { base: "18px" } : { base: "13px" }}
              h={{ base: "35px" }}
              w={{ base: "35px" }}
              border="1px solid rgba(217, 217, 217, 0.5)"
              backgroundColor="rgba(217, 217, 217, 0.5)"
              rounded="full"
              overflow="hidden"
            >
              <Image
                key={editors?.length > 0 ? editors[0]._id : ""}
                src={editors?.length > 0 ? editors[0].logo : ""}
                alt={editors?.length > 0 ? editors[0].logo : ""}
                fallbackSrc="/placeholder_org.jpeg"
                fit="contain"
                w={{ base: "35px" }}
                h={{ base: "35px" }}
                rounded="full"
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDir="column"
              color="#50625F"
            >
              <Box
                m={{ base: "0px 0px 0px 0px" }}
                p={{ base: "0 0 0 0" }}
                fontSize="105%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Box>
                  {editors?.length > 0 ? editors[0].name : "Possible.Africa"}
                </Box>
                {source ? (
                  <Link target="_blank" to={source}>
                    <ReturnIcon boxSize="18px" ml="5px" />
                  </Link>
                ) : null}
              </Box>
              <Box
                m={{ base: "0 0 0 0" }}
                p={{ base: "0 0 0 0" }}
                fontSize="70%"
                fontStyle="italic"
              >
                En ligne depuis le {createdAt}, langue :{" "}
                <Box as="span" color="#2BB19C">
                  {language}
                </Box>
              </Box>
            </Box>
          </CardHeader>
          <CardBody paddingY={{ base: "0" }}>
            <Text
              as="h1"
              fontWeight="bold"
              color="#2BB19C"
              lineHeight={{ base: "25px", md: "20px" }}
              fontSize="xl"
              paddingBottom={{ base: 1 }}
            >
              {/* {link ? <Link to={link}>{title}</Link> : { title }} */}
              {source ? (
                <Link target="_blank" to={source}>
                  {title}
                </Link>
              ) : (
                <Link to={link}>{title}</Link>
              )}
            </Text>
            {/* {description ? (
              <Text
                fontSize="90%"
                fontWeight="400"
                noOfLines={[2]}
                color="#0B4138"
                // lineHeight="15px"
              >
                {description}
              </Text>
            ) : null} */}
          </CardBody>
          {labels?.length > 0 ||
          countries?.length > 0 ||
          organisations?.length > 0 ||
          authors?.length > 0 ? (
            <CardFooter
              className="cardFooter"
              paddingY={{ base: 2 }}
              color="#50625F"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              overflowX="scroll"
              overflowY="hidden"
            >
              {countries?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{countries?.length - 1}
                  </Box>
                </Box>
              ) : countries?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                </Box>
              ) : null}

              {labels?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <TagIcon boxSize="18px" mr="5px" />
                    <Box as="div">{labels[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{labels?.length - 1}
                  </Box>
                </Box>
              ) : labels?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <TagIcon boxSize="18px" mr="5px" />
                    <Box as="div">{labels[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {organisations?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <OrganisationsIcon boxSize="18px" mr="5px" />
                    <Box as="div">{organisations[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{organisations?.length - 1}
                  </Box>
                </Box>
              ) : organisations?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <OrganisationsIcon boxSize="18px" mr="5px" />
                    <Box as="div">{organisations[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {authors?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{authors[0]?.complete_name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{authors?.length - 1}
                  </Box>
                </Box>
              ) : authors?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{authors[0]?.complete_name}</Box>
                  </Box>
                </Box>
              ) : null}
            </CardFooter>
          ) : null}
        </Card>
      );
      break;
    case "Agenda":
      card = (
        <Card
          variant="outline"
          border="1px solid"
          borderColor="red.50"
          w={{ base: "85vw", md: "2xl" }}
          padding={{ base: "0px" }}
          paddingBottom={{ base: "0px", md: "5px" }}
          marginY={{ base: "10px" }}
          borderRadius="10px"
          overflow="hidden"
        >
          <CardHeader
            display="flex"
            justifyContent={{ base: "flex-start" }}
            position="relative"
            paddingY={{ base: 2 }}
            h={{ base: "40%" }}
          >
            {/* Badge */}
            {organisations?.length > 1 ? (
              <Box
                as="span"
                zIndex={1}
                position="absolute"
                top="22.5px"
                left="50px"
                w="20px"
                h="17px"
                rounded="full"
                backgroundColor="#50625F"
              >
                <Text
                  fontSize="10px"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  +{organisations?.length - 1}
                </Text>
              </Box>
            ) : null}
            <Box
              as="div"
              mt={organisations?.length > 1 ? { base: "5px" } : { base: "5px" }}
              mr={
                organisations?.length > 1 ? { base: "18px" } : { base: "13px" }
              }
              h={{ base: "35px" }}
              w={{ base: "35px" }}
              border="1px solid rgba(217, 217, 217, 0.5)"
              backgroundColor="rgba(217, 217, 217, 0.5)"
              rounded="full"
              overflow="hidden"
            >
              <Image
                key={organisations?.length > 0 ? organisations[0]._id : ""}
                src={organisations?.length > 0 ? organisations[0].logo : ""}
                alt={organisations?.length > 0 ? organisations[0].logo : ""}
                fallbackSrc="/placeholder_org.jpeg"
                fit="contain"
                w={{ base: "35px" }}
                h={{ base: "35px" }}
                rounded="full"
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDir="column"
              color="#50625F"
            >
              <Box
                m={{ base: "0px 0px 0px 0px" }}
                p={{ base: "0 0 0 0" }}
                fontSize="105%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Box>
                  {organisations?.length > 0
                    ? organisations[0].name
                    : "Possible.Africa"}
                </Box>
                {source ? (
                  <Link target="_blank" to={source}>
                    <ReturnIcon boxSize="18px" ml="5px" />
                  </Link>
                ) : null}
              </Box>
              <Box
                m={{ base: "0 0 0 0" }}
                p={{ base: "0 0 0 0" }}
                fontSize="70%"
                fontStyle="italic"
              >
                En ligne depuis le {createdAt}
              </Box>
            </Box>
          </CardHeader>
          <CardBody paddingY={{ base: "0" }}>
            <Text
              as="h1"
              fontWeight="bold"
              color="#2BB19C"
              lineHeight={{ base: "25px", md: "20px" }}
              fontSize="xl"
              paddingBottom={{ base: 1 }}
            >
              {source ? (
                <Link target="_blank" to={source}>
                  {title}
                </Link>
              ) : (
                <Link to={link}>{title}</Link>
              )}
            </Text>
            {description ? (
              <Text
                fontSize="90%"
                fontWeight="400"
                noOfLines={[2]}
                color="#0B4138"
                // lineHeight="15px"
              >
                {description}
              </Text>
            ) : null}
          </CardBody>

          {labels?.length > 0 ||
          type ||
          countries?.length > 0 ||
          contacts?.length > 0 ||
          activity_areas?.length > 0 ? (
            <CardFooter
              className="cardFooter"
              paddingY={{ base: 2 }}
              color="#50625F"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              overflowX="scroll"
              overflowY="hidden"
            >
              {type ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <CalendarIcon boxSize="18px" mr="5px" />
                    <Box as="div">{type}</Box>
                  </Box>
                </Box>
              ) : null}

              {countries?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {/* {countries[0]?.translations?.fra?.common} */}
                      {countries[0]}
                    </Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{countries?.length - 1}
                  </Box>
                </Box>
              ) : countries?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {/* {countries[0]?.translations?.fra?.common} */}
                      {countries[0]}
                    </Box>
                  </Box>
                </Box>
              ) : null}

              {contacts?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{contacts?.length - 1}
                  </Box>
                </Box>
              ) : contacts?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                </Box>
              ) : null}

              {activity_areas?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{activity_areas?.length - 1}
                  </Box>
                </Box>
              ) : activity_areas?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}
            </CardFooter>
          ) : null}
        </Card>
      );
      break;
    case "Opportunités":
      card = (
        <Card
          variant="outline"
          border="1px solid"
          borderColor="red.50"
          w={{ base: "85vw", md: "2xl" }}
          padding={{ base: "0px" }}
          paddingBottom={{ base: "0px", md: "5px" }}
          marginY={{ base: "10px" }}
          borderRadius="10px"
          overflow="hidden"
        >
          <CardHeader
            display="flex"
            justifyContent={{ base: "flex-start" }}
            position="relative"
            paddingY={{ base: 2 }}
            h={{ base: "40%" }}
          >
            {/* Badge */}
            {organisations?.length > 1 ? (
              <Box
                as="span"
                zIndex={1}
                position="absolute"
                top="22.5px"
                left="50px"
                w="20px"
                h="17px"
                rounded="full"
                backgroundColor="#50625F"
              >
                <Text
                  fontSize="10px"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                >
                  +{organisations?.length - 1}
                </Text>
              </Box>
            ) : null}
            <Box
              as="div"
              mt={organisations?.length > 1 ? { base: "5px" } : { base: "5px" }}
              mr={
                organisations?.length > 1 ? { base: "18px" } : { base: "13px" }
              }
              h={{ base: "35px" }}
              w={{ base: "35px" }}
              border="1px solid rgba(217, 217, 217, 0.5)"
              backgroundColor="rgba(217, 217, 217, 0.5)"
              rounded="full"
              overflow="hidden"
            >
              <Image
                key={organisations?.length > 0 ? organisations[0]._id : ""}
                src={organisations?.length > 0 ? organisations[0].logo : ""}
                alt={organisations?.length > 0 ? organisations[0].logo : ""}
                fallbackSrc="/placeholder_org.jpeg"
                fit="contain"
                w={{ base: "35px" }}
                h={{ base: "35px" }}
                rounded="full"
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDir="column"
              color="#50625F"
            >
              <Box
                m={{ base: "0px 0px 0px 0px" }}
                p={{ base: "0 0 0 0" }}
                fontSize="105%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Box>
                  {organisations?.length > 0
                    ? organisations[0].name
                    : "Possible.Africa"}
                </Box>
                {source ? (
                  <Link target="_blank" to={source}>
                    <ReturnIcon boxSize="18px" ml="5px" />
                  </Link>
                ) : null}
              </Box>
              <Box
                m={{ base: "0 0 0 0" }}
                p={{ base: "0 0 0 0" }}
                fontSize="70%"
                fontStyle="italic"
              >
                En ligne depuis le {createdAt}
              </Box>
            </Box>
          </CardHeader>
          <CardBody paddingY={{ base: "0" }}>
            <Text
              as="h1"
              fontWeight="bold"
              color="#2BB19C"
              lineHeight={{ base: "25px", md: "20px" }}
              fontSize="xl"
              paddingBottom={{ base: 1 }}
            >
              {source ? (
                <Link target="_blank" to={source}>
                  {title}
                </Link>
              ) : (
                <Link to={link}>{title}</Link>
              )}
            </Text>
            {description ? (
              <Text
                fontSize="90%"
                fontWeight="400"
                noOfLines={[2]}
                color="#0B4138"
                // lineHeight="15px"
              >
                {description}
              </Text>
            ) : null}
          </CardBody>
          {labels?.length > 0 ||
          contacts?.length > 0 ||
          activity_areas?.length > 0 ||
          countries?.length > 0 ||
          type ? (
            <CardFooter
              className="cardFooter"
              paddingY={{ base: 2 }}
              color="#50625F"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              overflowX="scroll"
              overflowY="hidden"
            >
              {type ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <CalendarIcon boxSize="18px" mr="5px" />
                    <Box as="div">{type}</Box>
                  </Box>
                </Box>
              ) : null}

              {countries?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{countries?.length - 1}
                  </Box>
                </Box>
              ) : countries?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                </Box>
              ) : null}

              {contacts?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{contacts?.length - 1}
                  </Box>
                </Box>
              ) : contacts?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                </Box>
              ) : null}

              {activity_areas?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{activity_areas?.length - 1}
                  </Box>
                </Box>
              ) : activity_areas?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}
            </CardFooter>
          ) : null}
        </Card>
      );
      break;
    case "Emplois":
      card = (
        <Card
          variant="outline"
          border="1px solid"
          borderColor="red.50"
          w={{ base: "85vw", md: "2xl" }}
          padding={{ base: "0px" }}
          paddingBottom={{ base: "0px", md: "5px" }}
          marginY={{ base: "10px" }}
          borderRadius="10px"
          overflow="hidden"
        >
          <CardHeader
            display="flex"
            justifyContent={{ base: "flex-start" }}
            position="relative"
            paddingY={{ base: 2 }}
            h={{ base: "40%" }}
          >
            <Box
              as="div"
              mt={organisations?.length > 1 ? { base: "5px" } : { base: "5px" }}
              mr={
                organisations?.length > 1 ? { base: "18px" } : { base: "13px" }
              }
              h={{ base: "35px" }}
              w={{ base: "35px" }}
              border="1px solid rgba(217, 217, 217, 0.5)"
              backgroundColor="rgba(217, 217, 217, 0.5)"
              rounded="full"
              overflow="hidden"
            >
              <Image
                key={company ? company._id : ""}
                src={company ? company.logo : ""}
                alt={company ? company.logo : ""}
                fallbackSrc="/placeholder_org.jpeg"
                fit="contain"
                w={{ base: "35px" }}
                h={{ base: "35px" }}
                rounded="full"
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDir="column"
              color="#50625F"
            >
              <Box
                m={{ base: "0px 0px 0px 0px" }}
                p={{ base: "0 0 0 0" }}
                fontSize="105%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Box>{company?.name ? company?.name : "Possible.Africa"}</Box>
                {source ? (
                  <Link target="_blank" to={source}>
                    <ReturnIcon boxSize="18px" ml="5px" />
                  </Link>
                ) : null}
              </Box>
              <Box
                m={{ base: "0 0 0 0" }}
                p={{ base: "0 0 0 0" }}
                fontSize="70%"
                fontStyle="italic"
              >
                En ligne depuis le {createdAt}
              </Box>
            </Box>
          </CardHeader>
          <CardBody paddingY={{ base: "0" }}>
            <Text
              as="h1"
              fontWeight="bold"
              color="#2BB19C"
              lineHeight={{ base: "25px", md: "20px" }}
              fontSize="xl"
              paddingBottom={{ base: 1 }}
            >
              {source ? (
                <Link target="_blank" to={source}>
                  {title}
                </Link>
              ) : (
                <Link to={link}>{title}</Link>
              )}
            </Text>
            {description ? (
              <Text
                fontSize="90%"
                fontWeight="400"
                noOfLines={[2]}
                color="#0B4138"
                // lineHeight="15px"
              >
                {description}
              </Text>
            ) : null}
          </CardBody>
          {labels?.length > 0 ||
          contacts?.length > 0 ||
          activity_areas?.length > 0 ||
          countries?.length > 0 ||
          type ? (
            <CardFooter
              className="cardFooter"
              paddingY={{ base: 2 }}
              color="#50625F"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              overflowX="scroll"
              overflowY="hidden"
            >
              {type ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <CalendarIcon boxSize="18px" mr="5px" />
                    <Box as="div">{type}</Box>
                  </Box>
                </Box>
              ) : null}

              {countries?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{countries?.length - 1}
                  </Box>
                </Box>
              ) : countries?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                </Box>
              ) : null}

              {contacts?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{contacts?.length - 1}
                  </Box>
                </Box>
              ) : contacts?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                </Box>
              ) : null}

              {activity_areas?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{activity_areas?.length - 1}
                  </Box>
                </Box>
              ) : activity_areas?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}
            </CardFooter>
          ) : null}
        </Card>
      );
      break;
    case "Organisation":
      card = (
        <Card
          variant="outline"
          border="1px solid"
          borderColor="red.50"
          w={{ base: "85vw", md: "2xl" }}
          padding={{ base: "0px" }}
          paddingBottom={{ base: "0px", md: "5px" }}
          marginY={{ base: "10px" }}
          borderRadius="10px"
          overflow="hidden"
        >
          <CardHeader
            display="flex"
            justifyContent={{ base: "flex-start" }}
            position="relative"
            paddingY={{ base: 2 }}
            h={{ base: "40%" }}
          >
            <Box
              as="div"
              // mt={organisations?.length > 1 ? { base: "5px" } : { base: "5px" }}
              // mr={
              //   organisations?.length > 1 ? { base: "18px" } : { base: "13px" }
              // }
              h={{ base: "35px" }}
              w={{ base: "35px" }}
              border="1px solid rgba(217, 217, 217, 0.5)"
              backgroundColor="rgba(217, 217, 217, 0.5)"
              rounded="full"
              overflow="hidden"
            >
              <Image
                src={imgUrl ? imgUrl : ""}
                alt={imgUrl ? imgUrl : ""}
                fallbackSrc="/placeholder_org.jpeg"
                fit="contain"
                w={{ base: "35px" }}
                h={{ base: "35px" }}
                rounded="full"
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              flexDir="column"
              color="#50625F"
            >
              <Box
                m={{ base: "0px 0px 0px 0px" }}
                p={{ base: "0 0 0 0" }}
                fontSize="105%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Box>
                  <Text
                    as="h1"
                    fontWeight="bold"
                    color="#2BB19C"
                    lineHeight={{ base: "25px", md: "20px" }}
                    fontSize="xl"
                    paddingBottom={{ base: 1 }}
                    className="px-3"
                  >
                    {link ? <Link to={link}>{title}</Link> : <p>{title}</p>}
                  </Text>
                </Box>
                {source || sitWebLink ? (
                  <Link target="_blank" to={source || sitWebLink}>
                    <ReturnIcon boxSize="18px" ml="5px" />
                  </Link>
                ) : null}
              </Box>
              <Box
                fontSize="70%"
                fontStyle="italic"
                className="px-3"
              >
                En ligne depuis le {createdAt}
              </Box>
            </Box>
          </CardHeader>
          <CardBody paddingY={{ base: "0" }}>
            {/* <Text
              as="h1"
              fontWeight="bold"
              color="#2BB19C"
              lineHeight={{ base: "25px", md: "20px" }}
              fontSize="xl"
              paddingBottom={{ base: 1 }}
            >
              {link ? <Link to={link}>{title}</Link> : { title }}
            </Text> */}
            {description ? (
              <Text
                fontSize="90%"
                fontWeight="400"
                noOfLines={[2]}
                color="#0B4138"
                // lineHeight="15px"
              >
                {description}
              </Text>
            ) : null}
          </CardBody>
          {labels?.length > 0 ||
          countries?.length > 0 ||
          countries?.length > 0 ||
          editors?.length > 0 ||
          contacts?.length > 0 ||
          activity_areas?.length > 0 ||
          organisation_types?.length > 0 ? (
            <CardFooter
              className="cardFooter"
              paddingY={{ base: 2 }}
              color="#50625F"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              overflowX="scroll"
              overflowY="hidden"
            >
              {countries?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{countries?.length - 1}
                  </Box>
                </Box>
              ) : countries?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">
                      {countries[0]?.translations?.fra?.common}
                    </Box>
                  </Box>
                </Box>
              ) : null}

              {contacts?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{contacts?.length - 1}
                  </Box>
                </Box>
              ) : contacts?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                </Box>
              ) : null}
              {organisation_types?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <BusinessIcon boxSize="18px" mr="5px" />
                    <Box as="div">{organisation_types[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{organisation_types?.length - 1}
                  </Box>
                </Box>
              ) : organisation_types?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <BusinessIcon boxSize="18px" mr="5px" />
                    <Box as="div">{organisation_types[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {activity_areas?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{activity_areas?.length - 1}
                  </Box>
                </Box>
              ) : activity_areas?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {editors?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <EditorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{editors[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{editors?.length - 1}
                  </Box>
                </Box>
              ) : editors?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <EditorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{editors[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {authors?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{authors[0]?.complete_name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{authors?.length - 1}
                  </Box>
                </Box>
              ) : authors?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{authors[0]?.complete_name}</Box>
                  </Box>
                </Box>
              ) : null}
            </CardFooter>
          ) : null}
          {airtableRegion?.length > 0 ||
          airtableHeadquarter?.length > 0 ||
          airtableOperationnalCountries?.length > 0 ||
          airtableSector?.length > 0 ||
          airtableRelaredArticles?.length > 0 ? (
            <CardFooter
              className="cardFooter"
              paddingY={{ base: 2 }}
              color="#50625F"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              overflowX="scroll"
              overflowY="hidden"
            >
              {airtableRegion?.length > 0 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <EarthIcon boxSize="18px" mr="5px" />
                    <Box as="div">{airtableRegion}</Box>
                  </Box>
                </Box>
              ) : null}

              {airtableSector?.length > 0 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{airtableSector}</Box>
                  </Box>
                </Box>
              ) : null}

              {contacts?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{contacts?.length - 1}
                  </Box>
                </Box>
              ) : contacts?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{contacts[0]?.complete_name}</Box>
                  </Box>
                </Box>
              ) : null}
              {organisation_types?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <BusinessIcon boxSize="18px" mr="5px" />
                    <Box as="div">{organisation_types[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{organisation_types?.length - 1}
                  </Box>
                </Box>
              ) : organisation_types?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <BusinessIcon boxSize="18px" mr="5px" />
                    <Box as="div">{organisation_types[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {activity_areas?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{activity_areas?.length - 1}
                  </Box>
                </Box>
              ) : activity_areas?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <SearchIcon boxSize="18px" mr="5px" />
                    <Box as="div">{activity_areas[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {editors?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <EditorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{editors[0]?.name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{editors?.length - 1}
                  </Box>
                </Box>
              ) : editors?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <EditorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{editors[0]?.name}</Box>
                  </Box>
                </Box>
              ) : null}

              {authors?.length > 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderLeftRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{authors[0]?.complete_name}</Box>
                  </Box>
                  <Box
                    as="div"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    transform="translate(-1px, 0px)"
                    borderRightRadius="10px"
                    px="3px"
                  >
                    +{authors?.length - 1}
                  </Box>
                </Box>
              ) : authors?.length === 1 ? (
                <Box
                  as="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  paddingX={{ base: 1 }}
                  paddingY={{ base: 0.5 }}
                  rounded="full"
                >
                  <Box
                    as="div"
                    display="flex"
                    alignItems="center"
                    border="1px solid rgba(217, 217, 217, 0.5)"
                    borderRadius="10px"
                    px="5px"
                  >
                    <AuthorIcon boxSize="18px" mr="5px" />
                    <Box as="div">{authors[0]?.complete_name}</Box>
                  </Box>
                </Box>
              ) : null}
            </CardFooter>
          ) : null}
        </Card>
      );
      break;
    default:
      card = (
        <Card
          direction="row"
          spacing={{ base: "5", md: "1" }}
          overflow="hidden"
          w={{ base: "100%", md: "2xl" }}
          height={{ base: "100%", md: "130px" }}
          boxShadow="none"
          _hover={{ cursor: "pointer" }}
          borderRadius={0}
          alignItems={{ base: "center", md: "center" }}
          justifyContent={{ base: "flex-start", md: "flex-start" }}
          zIndex={-1}
        >
          <Skeleton isLoaded={isLoaded}>
            <Box
              hideBelow={hideMeBellow}
              w={{ base: 70, md: 100 }}
              h={{ base: "60px", md: "100%" }}
              alignItems="center"
              justifyContent="center"
              alignSelf="center"
            >
              <Image
                fit="cover"
                w={{ base: "60px", md: "80px" }}
                h={{ base: "60px", md: "80px" }}
                src={imgUrl}
                alt={imgUrl}
                borderRadius={8}
                fallbackSrc="/placeholder_org.jpeg"
                borderStyle="solid"
                borderColor="gray.100"
                borderWidth={1}
              />
            </Box>
          </Skeleton>

          <Stack>
            <CardBody
              display="flex"
              flexDir="column"
              px={{ base: "0", md: "0" }}
              py="5px"
              alignItems="flex-start"
              justifyContent="flex-start"
              h={{ base: "100%", md: "100%" }}
              gap={1}
            >
              <Text
                as="h2"
                fontSize="md"
                fontWeight="600"
                color="gray.700"
                _hover={{ textDecoration: "underline" }}
                noOfLines={[2]}
              >
                {title}
              </Text>

              <Text noOfLines={[1, 2]} color="gray.500">
                {description}
              </Text>

              {postType === "Organisation" && (
                <>
                  <Flex gap={5} marginTop={1.5} marginLeft={-1}>
                    {country ? (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <CountryIcon /> <Text fontSize="xs">{country}</Text>
                      </Flex>
                    ) : null}
                    {type && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <CategoryIcon /> <Text fontSize="xs">{type}</Text>
                      </Flex>
                    )}
                  </Flex>
                </>
              )}
              {postType === "Interview" && (
                <>
                  <Flex gap={5} marginTop={1.5} marginLeft={-1}>
                    {country && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <CountryIcon /> <Text fontSize="xs">{country}</Text>
                      </Flex>
                    )}
                  </Flex>
                </>
              )}
              {postType === "Actualités" && (
                <>
                  <Flex gap={5} marginTop={1.5} marginLeft={-1}>
                    {country && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <CountryIcon /> <Text fontSize="xs">{country}</Text>
                      </Flex>
                    )}
                  </Flex>
                </>
              )}
              {postType === "Agenda" && (
                <>
                  <Flex gap={5} marginTop={1.5} marginLeft={-1} hideBelow="md">
                    {dateDebut ||
                      (dateFin && (
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          gap={1}
                          color="gray.600"
                        >
                          <CalendarIcon />
                          <Text>{dateDebut}</Text> - <Text>{dateFin}</Text>
                        </Flex>
                      ))}
                    {country && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <MapIcon /> <Text fontSize="xs">{country}</Text>
                      </Flex>
                    )}
                    {type && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <TypeIcon /> <Text fontSize="xs">{type}</Text>
                      </Flex>
                    )}
                  </Flex>
                </>
              )}
              {postType === "Opportunités" && (
                <>
                  <Flex gap={5} marginTop={1.5} marginLeft={-1}>
                    {country && (
                      <>
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          gap={1}
                          color="gray.600"
                        >
                          <TargetIcon /> <Text fontSize="xs">{country}</Text>
                        </Flex>
                      </>
                    )}
                    {type && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <MoneyIcon /> <Text fontSize="xs">{type}</Text>
                      </Flex>
                    )}
                  </Flex>
                </>
              )}
              {postType === "Emplois" && (
                <>
                  <Flex gap={5} marginTop={1.5} marginLeft={-1}>
                    {company && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <OrganisationsIcon />{" "}
                        <Text fontSize="xs">{company}</Text>
                      </Flex>
                    )}
                    {type && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <WorkIcon /> <Text fontSize="xs">{type}</Text>
                      </Flex>
                    )}
                    {location && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        color="gray.600"
                      >
                        <MapIcon /> <Text fontSize="xs">{location}</Text>
                      </Flex>
                    )}
                  </Flex>
                </>
              )}
            </CardBody>
          </Stack>
        </Card>
      );
  }

  return card;
}

export default CardComponent;

// const card =
//   postType === "Actualités" ? (
//     <Card
//       variant="outline"
//       border="1px solid"
//       borderColor="red.50"
//       // backgroundColor="red.300"
//       w={{ base: "85vw", md: "2xl" }}
//       h={{ base: "150px" }}
//       padding={{ base: "0px" }}
//       marginY={{ base: "10px" }}
//       borderRadius="10px"
//       overflow="hidden"
//     >
//       <CardHeader
//         display="flex"
//         justifyContent={{ base: "flex-start" }}
//         // backgroundColor="red.200"
//         position="relative"
//         paddingY={{ base: 2 }}
//         h={{ base: "40%" }}
//       >
//         {/* Badge */}
//         {organisations?.length > 1 ? (
//           <Box
//             as="span"
//             zIndex={1}
//             position="absolute"
//             top="22.5px"
//             left="50px"
//             w="20px"
//             h="17px"
//             rounded="full"
//             backgroundColor="#50625F"
//           >
//             <Text
//               fontSize="10px"
//               fontWeight="bold"
//               color="white"
//               textAlign="center"
//             >
//               +{organisations?.length - 1}
//             </Text>
//           </Box>
//         ) : null}
//         <Box
//           as="div"
//           mr={{ base: "15px" }}
//           h={{ base: "40px" }}
//           w={{ base: "40px" }}
//           border="1px solid rgba(217, 217, 217, 0.5)"
//           backgroundColor="rgba(217, 217, 217, 0.5)"
//           rounded="full"
//           overflow="hidden"
//         >
//           <Image
//             key={organisations?.length > 0 ? organisations[0]._id : ""}
//             src={organisations?.length > 0 ? organisations[0].logo : ""}
//             alt={organisations?.length > 0 ? organisations[0].logo : ""}
//             fallbackSrc="/placeholder_org.jpeg"
//             fit="contain"
//             w={{ base: "40px" }}
//             h={{ base: "40px" }}
//             rounded="full"
//           />
//         </Box>
//         <Box
//           display="flex"
//           justifyContent="flex-start"
//           flexDir="column"
//           color="#50625F"
//         >
//           <Box
//             m={{ base: "0px 0px 0px 0px" }}
//             p={{ base: "0 0 0 0" }}
//             fontSize="105%"
//             display="flex"
//             alignItems="center"
//             justifyContent="flex-start"
//           >
//             <Box>
//               {organisations?.length > 0
//                 ? organisations[0].name
//                 : "Possible.Africa"}
//             </Box>
//             {organisations?.length > 0 ? (
//               <Link to={source}>
//                 <ReturnIcon boxSize="18px" ml="5px" />
//               </Link>
//             ) : null}
//           </Box>
//           <Box
//             m={{ base: "0 0 0 0" }}
//             p={{ base: "0 0 0 0" }}
//             fontSize="70%"
//             fontStyle="italic"
//           >
//             En ligne depuis le {createdAt}
//           </Box>
//         </Box>
//       </CardHeader>
//       <CardBody paddingY={{ base: "0" }}>
//         <Text
//           as="h1"
//           fontWeight="bold"
//           color="#2BB19C"
//           lineHeight="15px"
//           paddingBottom={{ base: 1 }}
//           display={{ base: "block" }}
//         >
//           {link ? (
//             <Link to={link}>
//               {title.length >= 30 ? title.slice(0, 30) + "..." : title}
//             </Link>
//           ) : title.length >= 30 ? (
//             title.slice(0, 30) + "..."
//           ) : (
//             title
//           )}
//         </Text>
//         <Text
//           fontSize="90%"
//           fontWeight="400"
//           noOfLines={[2]}
//           color="#0B4138"
//           // lineHeight="15px"
//         >
//           {description}
//         </Text>
//       </CardBody>
//       {labels?.length > 0 || countries?.length > 0 ? (
//         <CardFooter className="cardFooter"
//           paddingY={{ base: 2 }}
//           color="#50625F"
//           display="flex"
//           justifyContent="flex-start"
//           alignItems="center"
//           overflowX="scroll"
//           overflowY="hidden"
//         >
//           {countries?.length > 1 ? (
//             <Box
//               as="div"
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               paddingX={{ base: 1 }}
//               paddingY={{ base: 0.5 }}
//               rounded="full"
//             >
//               <Box
//                 as="div"
//                 display="flex"
//                 alignItems="center"
//                 border="1px solid rgba(217, 217, 217, 0.5)"
//                 borderLeftRadius="10px"
//                 px="5px"
//               >
//                 <EarthIcon boxSize="18px" mr="5px" />
//                 <Box as="div">{countries[0]?.translations?.fra?.common}</Box>
//               </Box>
//               <Box
//                 as="div"
//                 border="1px solid rgba(217, 217, 217, 0.5)"
//                 transform="translate(-1px, 0px)"
//                 borderRightRadius="10px"
//                 px="3px"
//               >
//                 +{countries?.length - 1}
//               </Box>
//             </Box>
//           ) : countries?.length === 1 ? (
//             <Box
//               as="div"
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               paddingX={{ base: 1 }}
//               paddingY={{ base: 0.5 }}
//               rounded="full"
//             >
//               <Box
//                 as="div"
//                 display="flex"
//                 alignItems="center"
//                 border="1px solid rgba(217, 217, 217, 0.5)"
//                 borderRadius="10px"
//                 px="5px"
//               >
//                 <EarthIcon boxSize="18px" mr="5px" />
//                 <Box as="div">{countries[0]?.translations?.fra?.common}</Box>
//               </Box>
//             </Box>
//           ) : null}

//           {labels?.length > 1 ? (
//             <Box
//               as="div"
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               paddingX={{ base: 1 }}
//               paddingY={{ base: 0.5 }}
//               rounded="full"
//             >
//               <Box
//                 as="div"
//                 display="flex"
//                 alignItems="center"
//                 border="1px solid rgba(217, 217, 217, 0.5)"
//                 borderLeftRadius="10px"
//                 px="5px"
//               >
//                 <TagIcon boxSize="18px" mr="5px" />
//                 <Box as="div">{labels[0]?.name}</Box>
//               </Box>
//               <Box
//                 as="div"
//                 border="1px solid rgba(217, 217, 217, 0.5)"
//                 transform="translate(-1px, 0px)"
//                 borderRightRadius="10px"
//                 px="3px"
//               >
//                 +{labels?.length - 1}
//               </Box>
//             </Box>
//           ) : labels?.length === 1 ? (
//             <Box
//               as="div"
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               paddingX={{ base: 1 }}
//               paddingY={{ base: 0.5 }}
//               rounded="full"
//             >
//               <Box
//                 as="div"
//                 display="flex"
//                 alignItems="center"
//                 border="1px solid rgba(217, 217, 217, 0.5)"
//                 borderRadius="10px"
//                 px="5px"
//               >
//                 <TagIcon boxSize="18px" mr="5px" />
//                 <Box as="div">{labels[0]?.name}</Box>
//               </Box>
//             </Box>
//           ) : null}
//         </CardFooter>
//       ) : null}
//     </Card>
//   ) : postType === "Organisation" ? (
//     <Card
//       direction="row"
//       spacing={{ base: "5", md: "1" }}
//       overflow="hidden"
//       w={{ base: "100%", md: "2xl" }}
//       height={{ base: "100%", md: "130px" }}
//       boxShadow="none"
//       _hover={{ cursor: "pointer" }}
//       borderRadius={0}
//       alignItems={{ base: "center", md: "center" }}
//       justifyContent={{ base: "flex-start", md: "flex-start" }}
//       zIndex={-1}
//     >
//       <Skeleton isLoaded={isLoaded}>
//         <Box
//           hideBelow={hideMeBellow}
//           w={{ base: 70, md: 100 }}
//           h={{ base: "60px", md: "100%" }}
//           alignItems="center"
//           justifyContent="center"
//           alignSelf="center"
//         >
//           <Image
//             fit="cover"
//             w={{ base: "60px", md: "80px" }}
//             h={{ base: "60px", md: "80px" }}
//             src={imgUrl}
//             alt={imgUrl}
//             borderRadius={8}
//             fallbackSrc="/placeholder_org.jpeg"
//             borderStyle="solid"
//             borderColor="gray.100"
//             borderWidth={1}
//           />
//         </Box>
//       </Skeleton>

//       <Stack>
//         <CardBody
//           display="flex"
//           flexDir="column"
//           px={{ base: "0", md: "0" }}
//           py="5px"
//           alignItems="flex-start"
//           justifyContent="flex-start"
//           h={{ base: "100%", md: "100%" }}
//           gap={1}
//         >
//           <Text
//             as="h2"
//             fontSize="md"
//             fontWeight="600"
//             color="gray.700"
//             _hover={{ textDecoration: "underline" }}
//             noOfLines={[2]}
//           >
//             {title}
//           </Text>

//           <Text noOfLines={[1, 2]} color="gray.500">
//             {description}
//           </Text>

//           {postType === "Organisation" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {country && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <CountryIcon /> <Text fontSize="xs">{country}</Text>
//                   </Flex>
//                 )}
//                 {type && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <CategoryIcon /> <Text fontSize="xs">{type}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Interview" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {country && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <CountryIcon /> <Text fontSize="xs">{country}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Actualités" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {country && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <CountryIcon /> <Text fontSize="xs">{country}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Agenda" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1} hideBelow="md">
//                 {dateDebut ||
//                   (dateFin && (
//                     <Flex
//                       alignItems="center"
//                       justifyContent="center"
//                       gap={1}
//                       color="gray.600"
//                     >
//                       <CalendarIcon />
//                       <Text>{dateDebut}</Text> - <Text>{dateFin}</Text>
//                     </Flex>
//                   ))}
//                 {country && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <MapIcon /> <Text fontSize="xs">{country}</Text>
//                   </Flex>
//                 )}
//                 {type && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <TypeIcon /> <Text fontSize="xs">{type}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Opportunités" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {country && (
//                   <>
//                     <Flex
//                       alignItems="center"
//                       justifyContent="center"
//                       gap={1}
//                       color="gray.600"
//                     >
//                       <TargetIcon /> <Text fontSize="xs">{country}</Text>
//                     </Flex>
//                   </>
//                 )}
//                 {type && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <MoneyIcon /> <Text fontSize="xs">{type}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Emplois" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {company && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <OrganisationsIcon /> <Text fontSize="xs">{company}</Text>
//                   </Flex>
//                 )}
//                 {type && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <WorkIcon /> <Text fontSize="xs">{type}</Text>
//                   </Flex>
//                 )}
//                 {location && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <MapIcon /> <Text fontSize="xs">{location}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//         </CardBody>
//       </Stack>
//     </Card>
//   ) : (
//     <Card
//       direction="row"
//       spacing={{ base: "5", md: "1" }}
//       overflow="hidden"
//       w={{ base: "100%", md: "2xl" }}
//       height={{ base: "100%", md: "130px" }}
//       boxShadow="none"
//       _hover={{ cursor: "pointer" }}
//       borderRadius={0}
//       alignItems={{ base: "center", md: "center" }}
//       justifyContent={{ base: "flex-start", md: "flex-start" }}
//       zIndex={-1}
//     >
//       <Skeleton isLoaded={isLoaded}>
//         <Box
//           hideBelow={hideMeBellow}
//           w={{ base: 70, md: 100 }}
//           h={{ base: "60px", md: "100%" }}
//           alignItems="center"
//           justifyContent="center"
//           alignSelf="center"
//         >
//           <Image
//             fit="cover"
//             w={{ base: "60px", md: "80px" }}
//             h={{ base: "60px", md: "80px" }}
//             src={imgUrl}
//             alt={imgUrl}
//             borderRadius={8}
//             fallbackSrc="/placeholder_org.jpeg"
//             borderStyle="solid"
//             borderColor="gray.100"
//             borderWidth={1}
//           />
//         </Box>
//       </Skeleton>

//       <Stack>
//         <CardBody
//           display="flex"
//           flexDir="column"
//           px={{ base: "0", md: "0" }}
//           py="5px"
//           alignItems="flex-start"
//           justifyContent="flex-start"
//           h={{ base: "100%", md: "100%" }}
//           gap={1}
//         >
//           <Text
//             as="h2"
//             fontSize="md"
//             fontWeight="600"
//             color="gray.700"
//             _hover={{ textDecoration: "underline" }}
//             noOfLines={[2]}
//           >
//             {title}
//           </Text>

//           <Text noOfLines={[1, 2]} color="gray.500">
//             {description}
//           </Text>

//           {postType === "Organisation" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {country && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <CountryIcon /> <Text fontSize="xs">{country}</Text>
//                   </Flex>
//                 )}
//                 {type && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <CategoryIcon /> <Text fontSize="xs">{type}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Interview" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {country && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <CountryIcon /> <Text fontSize="xs">{country}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Actualités" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {country && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <CountryIcon /> <Text fontSize="xs">{country}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Agenda" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1} hideBelow="md">
//                 {dateDebut ||
//                   (dateFin && (
//                     <Flex
//                       alignItems="center"
//                       justifyContent="center"
//                       gap={1}
//                       color="gray.600"
//                     >
//                       <CalendarIcon />
//                       <Text>{dateDebut}</Text> - <Text>{dateFin}</Text>
//                     </Flex>
//                   ))}
//                 {country && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <MapIcon /> <Text fontSize="xs">{country}</Text>
//                   </Flex>
//                 )}
//                 {type && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <TypeIcon /> <Text fontSize="xs">{type}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Opportunités" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {country && (
//                   <>
//                     <Flex
//                       alignItems="center"
//                       justifyContent="center"
//                       gap={1}
//                       color="gray.600"
//                     >
//                       <TargetIcon /> <Text fontSize="xs">{country}</Text>
//                     </Flex>
//                   </>
//                 )}
//                 {type && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <MoneyIcon /> <Text fontSize="xs">{type}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//           {postType === "Emplois" && (
//             <>
//               <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//                 {company && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <OrganisationsIcon /> <Text fontSize="xs">{company}</Text>
//                   </Flex>
//                 )}
//                 {type && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <WorkIcon /> <Text fontSize="xs">{type}</Text>
//                   </Flex>
//                 )}
//                 {location && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <MapIcon /> <Text fontSize="xs">{location}</Text>
//                   </Flex>
//                 )}
//               </Flex>
//             </>
//           )}
//         </CardBody>
//       </Stack>
//     </Card>
//   );

// const card = (
//   <Card
//     direction="row"
//     spacing={{ base: "5", md: "1" }}
//     overflow="hidden"
//     w={{ base: "100%", md: "2xl" }}
//     height={{ base: "100%", md: "130px" }}
//     boxShadow="none"
//     _hover={{ cursor: "pointer" }}
//     borderRadius={0}
//     alignItems={{ base: "center", md: "center" }}
//     justifyContent={{ base: "flex-start", md: "flex-start" }}
//     zIndex={-1}
//   >
//     <Skeleton isLoaded={isLoaded}>
//       <Box
//         hideBelow={hideMeBellow}
//         w={{ base: 70, md: 100 }}
//         h={{ base: "60px", md: "100%" }}
//         alignItems="center"
//         justifyContent="center"
//         alignSelf="center"
//       >
//         <Image
//           fit="cover"
//           w={{ base: "60px", md: "80px" }}
//           h={{ base: "60px", md: "80px" }}
//           src={imgUrl}
//           alt={imgUrl}
//           borderRadius={8}
//           fallbackSrc="/placeholder_org.jpeg"
//           borderStyle="solid"
//           borderColor="gray.100"
//           borderWidth={1}
//         />
//       </Box>
//     </Skeleton>

//     <Stack>
//       <CardBody
//         display="flex"
//         flexDir="column"
//         px={{ base: "0", md: "0" }}
//         py="5px"
//         alignItems="flex-start"
//         justifyContent="flex-start"
//         h={{ base: "100%", md: "100%" }}
//         gap={1}
//       >
//         <Text
//           as="h2"
//           fontSize="md"
//           fontWeight="600"
//           color="gray.700"
//           _hover={{ textDecoration: "underline" }}
//           noOfLines={[2]}
//         >
//           {title}
//         </Text>

//         <Text noOfLines={[1, 2]} color="gray.500">
//           {description}
//         </Text>

//         {postType === "Organisation" && (
//           <>
//             <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//               {country && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <CountryIcon /> <Text fontSize="xs">{country}</Text>
//                 </Flex>
//               )}
//               {type && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <CategoryIcon /> <Text fontSize="xs">{type}</Text>
//                 </Flex>
//               )}
//             </Flex>
//           </>
//         )}
//         {postType === "Interview" && (
//           <>
//             <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//               {country && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <CountryIcon /> <Text fontSize="xs">{country}</Text>
//                 </Flex>
//               )}
//             </Flex>
//           </>
//         )}
//         {postType === "Actualités" && (
//           <>
//             <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//               {country && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <CountryIcon /> <Text fontSize="xs">{country}</Text>
//                 </Flex>
//               )}
//             </Flex>
//           </>
//         )}
//         {postType === "Agenda" && (
//           <>
//             <Flex gap={5} marginTop={1.5} marginLeft={-1} hideBelow="md">
//               {dateDebut ||
//                 (dateFin && (
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <CalendarIcon />
//                     <Text>{dateDebut}</Text> - <Text>{dateFin}</Text>
//                   </Flex>
//                 ))}
//               {country && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <MapIcon /> <Text fontSize="xs">{country}</Text>
//                 </Flex>
//               )}
//               {type && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <TypeIcon /> <Text fontSize="xs">{type}</Text>
//                 </Flex>
//               )}
//             </Flex>
//           </>
//         )}
//         {postType === "Opportunités" && (
//           <>
//             <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//               {country && (
//                 <>
//                   <Flex
//                     alignItems="center"
//                     justifyContent="center"
//                     gap={1}
//                     color="gray.600"
//                   >
//                     <TargetIcon /> <Text fontSize="xs">{country}</Text>
//                   </Flex>
//                 </>
//               )}
//               {type && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <MoneyIcon /> <Text fontSize="xs">{type}</Text>
//                 </Flex>
//               )}
//             </Flex>
//           </>
//         )}
//         {postType === "Emplois" && (
//           <>
//             <Flex gap={5} marginTop={1.5} marginLeft={-1}>
//               {company && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <OrganisationsIcon /> <Text fontSize="xs">{company}</Text>
//                 </Flex>
//               )}
//               {type && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <WorkIcon /> <Text fontSize="xs">{type}</Text>
//                 </Flex>
//               )}
//               {location && (
//                 <Flex
//                   alignItems="center"
//                   justifyContent="center"
//                   gap={1}
//                   color="gray.600"
//                 >
//                   <MapIcon /> <Text fontSize="xs">{location}</Text>
//                 </Flex>
//               )}
//             </Flex>
//           </>
//         )}
//       </CardBody>
//     </Stack>
//   </Card>
// );

// const card = (
//   <Card
//     variant="outline"
//     border="1px solid"
//     borderColor="red.50"
//     // backgroundColor="red.300"
//     w={{ base: "85vw" }}
//     h={{ base: "150px" }}
//     padding={{ base: "0px" }}
//     marginY={{ base: "10px" }}
//     borderRadius="10px"
//     overflow="hidden"
//   >
//     <CardHeader
//       display="flex"
//       justifyContent={{ base: "flex-start" }}
//       // backgroundColor="red.200"
//       position="relative"
//       paddingY={{ base: 2 }}
//       h={{ base: "40%" }}
//     >
//       {/* Badge */}
//       {organisations?.length > 1 ? (
//         <Box
//           as="span"
//           zIndex={1}
//           position="absolute"
//           top="22.5px"
//           left="50px"
//           w="20px"
//           h="17px"
//           rounded="full"
//           backgroundColor="#50625F"
//         >
//           <Text
//             fontSize="10px"
//             fontWeight="bold"
//             color="white"
//             textAlign="center"
//           >
//             +{organisations?.length - 1}
//           </Text>
//         </Box>
//       ) : null}
//       <Box
//         as="div"
//         mr={{ base: "15px" }}
//         h={{ base: "40px" }}
//         w={{ base: "40px" }}
//         border="1px solid rgba(217, 217, 217, 0.5)"
//         backgroundColor="rgba(217, 217, 217, 0.5)"
//         rounded="full"
//         overflow="hidden"
//       >
//         <Image
//           key={organisations?.length > 0 ? organisations[0]._id : ""}
//           src={organisations?.length > 0 ? organisations[0].logo : ""}
//           alt={organisations?.length > 0 ? organisations[0].logo : ""}
//           fallbackSrc="/placeholder_org.jpeg"
//           fit="contain"
//           w={{ base: "40px" }}
//           h={{ base: "40px" }}
//           rounded="full"
//         />
//       </Box>
//       <Box
//         display="flex"
//         justifyContent="flex-start"
//         flexDir="column"
//         color="#50625F"
//       >
//         <Box
//           m={{ base: "0px 0px 0px 0px" }}
//           p={{ base: "0 0 0 0" }}
//           fontSize="105%"
//           display="flex"
//           alignItems="center"
//           justifyContent="flex-start"
//         >
//           <Box>
//             {organisations?.length > 0
//               ? organisations[0].name
//               : "Possible.Africa"}
//           </Box>
//           {organisations?.length > 0 ? (
//             <Link to={source}>
//               <ReturnIcon boxSize="18px" ml="5px" />
//             </Link>
//           ) : null}
//         </Box>
//         <Box
//           m={{ base: "0 0 0 0" }}
//           p={{ base: "0 0 0 0" }}
//           fontSize="70%"
//           fontStyle="italic"
//         >
//           En ligne depuis le 19/01/2023
//         </Box>
//       </Box>
//     </CardHeader>
//     <CardBody paddingY={{ base: 1 }}>
//       <Box
//         as="h1"
//         fontWeight="bold"
//         color="#2BB19C"
//         lineHeight="20px"
//         display={{ base: "block" }}
//       >
//         {link ? (
//           <Link to={link}>
//             {title.length >= 30 ? title.slice(0, 30) + "..." : title}
//           </Link>
//         ) : title.length >= 30 ? (
//           title.slice(0, 30) + "..."
//         ) : (
//           title
//         )}
//       </Box>
//     </CardBody>
//     {labels?.length > 0 || countries?.length > 0 ? (
//       <CardFooter className="cardFooter"
//         paddingY={{ base: 2 }}
//         color="#50625F"
//         display="flex"
//         justifyContent="flex-start"
//         alignItems="center"
//         overflowX="scroll"
//         overflowY="hidden"
//       >
//         {countries?.length > 1 ? (
//           <Box
//             as="div"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             paddingX={{ base: 1 }}
//             paddingY={{ base: 0.5 }}
//             rounded="full"
//           >
//             <Box
//               as="div"
//               display="flex"
//               alignItems="center"
//               border="1px solid rgba(217, 217, 217, 0.5)"
//               borderLeftRadius="10px"
//               px="5px"
//             >
//               <EarthIcon boxSize="18px" mr="5px" />
//               <Box as="div">{countries[0]?.translations?.fra?.common}</Box>
//             </Box>
//             <Box
//               as="div"
//               border="1px solid rgba(217, 217, 217, 0.5)"
//               transform="translate(-1px, 0px)"
//               borderRightRadius="10px"
//               px="3px"
//             >
//               +{countries?.length - 1}
//             </Box>
//           </Box>
//         ) : countries?.length === 1 ? (
//           <Box
//             as="div"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             paddingX={{ base: 1 }}
//             paddingY={{ base: 0.5 }}
//             rounded="full"
//           >
//             <Box
//               as="div"
//               display="flex"
//               alignItems="center"
//               border="1px solid rgba(217, 217, 217, 0.5)"
//               borderRadius="10px"
//               px="5px"
//             >
//               <EarthIcon boxSize="18px" mr="5px" />
//               <Box as="div">{countries[0]?.translations?.fra?.common}</Box>
//             </Box>
//           </Box>
//         ) : null}

//         {labels?.length > 1 ? (
//           <Box
//             as="div"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             paddingX={{ base: 1 }}
//             paddingY={{ base: 0.5 }}
//             rounded="full"
//           >
//             <Box
//               as="div"
//               display="flex"
//               alignItems="center"
//               border="1px solid rgba(217, 217, 217, 0.5)"
//               borderLeftRadius="10px"
//               px="5px"
//             >
//               <TagIcon boxSize="18px" mr="5px" />
//               <Box as="div">{labels[0]?.name}</Box>
//             </Box>
//             <Box
//               as="div"
//               border="1px solid rgba(217, 217, 217, 0.5)"
//               transform="translate(-1px, 0px)"
//               borderRightRadius="10px"
//               px="3px"
//             >
//               +{labels?.length - 1}
//             </Box>
//           </Box>
//         ) : labels?.length === 1 ? (
//           <Box
//             as="div"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             paddingX={{ base: 1 }}
//             paddingY={{ base: 0.5 }}
//             rounded="full"
//           >
//             <Box
//               as="div"
//               display="flex"
//               alignItems="center"
//               border="1px solid rgba(217, 217, 217, 0.5)"
//               borderRadius="10px"
//               px="5px"
//             >
//               <TagIcon boxSize="18px" mr="5px" />
//               <Box as="div">{labels[0]?.name}</Box>
//             </Box>
//           </Box>
//         ) : null}
//       </CardFooter>
//     ) : null}
//   </Card>
// );

// console.log({ organisations });
// if (link) {
//   return <Link to={link}>{card}</Link>;
// }
