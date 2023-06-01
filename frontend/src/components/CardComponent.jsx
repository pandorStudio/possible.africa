import { Card, CardBody, Heading, Stack, Image, Text, Skeleton, SkeletonText, Box } from '@chakra-ui/react'
import {Link} from "react-router-dom";


// eslint-disable-next-line react/prop-types
function CardComponent({title, description, imgUrl, isLoaded, link}) {

  return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        maxW={{ base: '3xl', sm: '100%' }}
        minW={{ base: '2xl', sm: '70%' }}
        height={{ base: '130px', sm: '70%' }}
        boxShadow="none"
        _hover={{ cursor: "pointer" }}
        borderRadius={0}
        p={3}
        alignItems="center"
      >
    <Skeleton isLoaded={isLoaded} >

      <Box  w={100} h="100px">

        <Image
          fit ='cover'
        w="100%"
        h="100px"
          src={imgUrl}
          alt={imgUrl}
          borderRadius={8}
        />
      </Box>
      </Skeleton>

        <Stack>
          <CardBody>

            {link ? (
                <Link to={link}><Heading paddingBottom={2} fontSize='xl' color='teal.500' _hover={{ textDecoration: "underline" }}>{title}</Heading></Link>
            ) : (<Heading paddingBottom={2} fontSize='xl' color='teal.500' _hover={{ textDecoration: "underline" }}>{title}</Heading>)}

            <Text noOfLines={[1,2]}>
              {description}
            </Text>
          </CardBody>

        </Stack>
      </Card>)
}

export default CardComponent;