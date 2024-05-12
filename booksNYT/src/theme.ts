import { extendTheme } from '@chakra-ui/react';
import '@fontsource/cardo';

const theme = extendTheme({
  fonts: {
    body: `'Cardo', sans-serif`,
  },
  textStyles: {
    h1: {
      fontSize: ['36px', '42px'],
      fontWeight: 'bold',
    },
    h2: {
      fontSize: ['28px', '34px'],
      fontWeight: 'normal'
    },
  },
  colors: {
    grayLight: '#f7f7f7',
    gray: '#615f5f',
    grayHov: '#4d4d4d',
  },
  variant: {

  }
})

export default theme