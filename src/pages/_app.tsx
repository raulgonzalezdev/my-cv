// Importaciones de librerías necesarias
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Box, ChakraProvider, extendTheme, Flex } from '@chakra-ui/react'
import * as React from 'react'
import '../styles/editable.css'
import { EditorProvider } from './EditorContext'
import Sidebar from '../components/Sidebar'

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

if (typeof window === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
}

// Componente MyApp
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <EditorProvider>
        <Flex>
          <Sidebar />
          <Box flex="1">
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta charSet="utf-8" />
              <meta name="description" content="Aplicacion para crear CV" />
              <meta name="author" content="SoyraulDev" />
              <meta
                name="keywords"
                content="Proyectos, React, Crear Cv, Aplicacion, Desarrollador, software, Programacion"
              />
            </Head>

            <Component {...pageProps} />
          </Box>
        </Flex>
      </EditorProvider>
    </ChakraProvider>
  )
}

export default MyApp
