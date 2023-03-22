// Importaciones de librerías necesarias
import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as React from 'react'
import '../styles/editable.css'
import { EditorProvider } from './EditorContext';

// Creación del tema personalizado
const theme = extendTheme({
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em'
  }
})

// Componente MyApp
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
       <EditorProvider>
      <Component {...pageProps} />
      </EditorProvider>
    </ChakraProvider>
  )
}

export default MyApp
