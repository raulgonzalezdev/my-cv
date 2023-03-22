import React, { useRef, useState } from 'react'
import { Box, VStack, StackDivider } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/react'
import Header from '../components/Header'
import ProfileSection from '../components/ProfileSection'

interface IndexPageProps {
  lang: string
 
}

const IndexPage: React.FC<CVPageProps> = ({ lang, editable }) => {
  const [currentLang, setLang] = useState(lang)
  const [currentEditable, setEditable] = useState(editable)
  const { colorMode, toggleColorMode } = useColorMode()
  const editorRef = useRef(null);
  return (
    <>
      <Box>
        <Header
          lang={currentLang}
          setLang={setLang}
          toggleColorMode={toggleColorMode}
          setEditable={setEditable}
          editable={currentEditable}
        />
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <ProfileSection lang={currentLang} editable={currentEditable} />
        </VStack>
      </Box>
    </>
  )
}

IndexPage.getInitialProps = async ctx => {
  const lang = ctx.query.lang || 'es'
  return { lang }
}

export default IndexPage
