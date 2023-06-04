import { HStack, Select } from '@chakra-ui/react'
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
  } from '@chakra-ui/react'


function FilterComponent() {
  return (

    <HStack spacing={4}>
    {['lg', 'lg', 'lg', 'lg', 'lg', 'lg', 'lg', 'lg', 'lg', 'lg', 'lg'].map((size) => (
      <Tag
        size={size}
        key={size}
        borderRadius='full'
        variant='outline'
        colorScheme='teal'
      >
        <TagLabel>Categories</TagLabel>
      </Tag>
    ))}
  </HStack>
  
  )
}

export default FilterComponent