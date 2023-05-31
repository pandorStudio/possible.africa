import { defineStyleConfig } from '@chakra-ui/react'

export default  defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    textDecoration: 'none',
   
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      // fontSize: 'sm',
      // px: 4, // <-- px is short for paddingLeft and paddingRight
      // py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      // fontSize: 'md',
      // px: 6, // <-- these values are tokens from the design system
      // py: 6, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      // border: '2px solid',
      // borderColor: 'teal.500',
      // color: 'teal.500',
    },
    solid: {
      // bg: 'teal.500',
      // color: 'white',
    },
  },
  // The default size and variant values
  defaultProps: {
    // size: 'md',
    // variant: 'solid',
  },
})
