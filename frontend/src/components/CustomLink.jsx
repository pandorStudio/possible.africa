import { Link } from "@chakra-ui/react"

function CustomLink({...rest}) {


  return (
    <Link
    textDecoration="none"
    color="teal.500"
    _hover={{ textDecoration: "underline" }}
    _focus={{ textDecoration: "underline" }}
    _active={{ textDecoration: "underline" }}
    {...rest}
    />

  )
}

export default CustomLink