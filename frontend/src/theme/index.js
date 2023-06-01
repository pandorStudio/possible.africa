// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Global style overrides
import styles from './styles'

// Foundational style overrides
import borders from './foundations/borders'

// Component style overrides
import Button from './components/button'
import Link from './components/link'



const overrides = {
  styles,
  borders,
  // Other foundational style overrides go here
  components: {
    Button,
    Link
    // Other components go here
  },
}

export default extendTheme(overrides)