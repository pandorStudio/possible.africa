import { Card, CardBody, Heading, Stack, Image, Text, Skeleton, SkeletonText } from '@chakra-ui/react'


// eslint-disable-next-line react/prop-types
function CardComponent({title, description, imgUrl, isLoaded}) {

  return (
   
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        maxW="4xl"
        minW="4xl"
        boxShadow="none"
        _hover={{ cursor: "pointer" }}
        borderRadius={0}

      >
    <Skeleton isLoaded={isLoaded} w={{ base: '100%', sm: '20%' }}  objectFit='cover'>
      
        <Image
          objectFit='cover'
         minW={{ base: '100%', sm: '20%' }}
         maxW={{ base: '100%', sm: '100%' }}
          src={imgUrl}
          alt={imgUrl}
          borderRadius={0}
        />
      </Skeleton> 

        <Stack>
          <CardBody>
          <Skeleton isLoaded={isLoaded}>
            <Heading fontSize='xl' color='teal.500' _hover={{ textDecoration: "underline" }}>{title}</Heading>
           </Skeleton>
           <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='5' isLoaded={isLoaded}> 
            <Text noOfLines={[1,2]}>
              {description}
            </Text>
            </SkeletonText>
          </CardBody>

        </Stack> 
      </Card>
  )
}

export default CardComponent;