import { Card, CardBody, Heading, Stack, Image, Text } from '@chakra-ui/react'


// eslint-disable-next-line react/prop-types
function CardComponent({title, description, imgUrl}) {
  return (  
<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={imgUrl}
    alt={imgUrl}
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{title}</Heading>

      <Text py='2'>
      {description}
      </Text>
    </CardBody>

   </Stack> 
</Card>
  )
}

export default CardComponent;