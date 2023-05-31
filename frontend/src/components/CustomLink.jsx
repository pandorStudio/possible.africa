import { Link } from "@chakra-ui/react"

function CustomLink({...rest}) {


  return (
    <Link
    textDecoration="none"
    _hover={{ color: 'teal.500' }}
    _focus={{ color: 'teal.500' }}
    _active={{ color: 'teal.500' }}
    {...rest}
    />

  )
}

export default CustomLink