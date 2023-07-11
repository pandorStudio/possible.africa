import { defineStyleConfig } from '@chakra-ui/react'

export default  defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: '500',

    borderRadius: '10px', // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      size: '14px',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 5, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      size: '16px',
      px: 6, // <-- these values are tokens from the design system
      py: 6, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'teal.500',
      color: 'teal.500',
    },
    solid: {
      bg: 'teal.500',
      color: 'white',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
})
