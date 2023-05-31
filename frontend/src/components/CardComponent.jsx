import { Card, CardBody, Heading, Stack, Image, Text } from '@chakra-ui/react'


// eslint-disable-next-line react/prop-types
function CardComponent({title, description, imgUrl}) {
  return (  
<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  w="2xl"
  boxShadow="none"
  _hover={{ cursor: "pointer" }}
>
  <Image
    objectFit='cover'
    w={{ base: '100%', sm: '25%' }}
    src={imgUrl}
    alt={imgUrl}
  />

  <Stack>
    <CardBody>
      <Heading size='md' paddingBottom={2} color='teal.500' _hover={{ textDecoration: "underline" }}>{title}</Heading>
      <Text noOfLines={[1,2]}>
        {description}
      </Text>
    </CardBody>

   </Stack> 
</Card>
  )
}

export default CardComponent;