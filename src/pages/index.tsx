import React, { useState } from 'react';
import { Box, VStack, StackDivider } from "@chakra-ui/react";
import { useColorMode } from '@chakra-ui/react';
import Header from "@/components/Header";
import ProfileSection from "@/components/ProfileSection";

interface CVPageProps {
  lang: string;
}

const CVPage: React.FC<CVPageProps> = ({ lang }) => {
  const [currentLang, setLang] = useState(lang);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
    <Box>
      <Header lang={currentLang} setLang={setLang} toggleColorMode={toggleColorMode} />
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <ProfileSection lang={currentLang} toggleColorMode={toggleColorMode} />
      </VStack>
    </Box>
    </>
  );
};

CVPage.getInitialProps = async (ctx) => {
  const lang = ctx.query.lang || "es";
  return { lang };
};

export default CVPage;
