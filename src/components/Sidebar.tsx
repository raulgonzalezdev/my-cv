import { Box, VStack, Heading, Button } from '@chakra-ui/react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Box width="250px" bg="gray.200" h="100vh" p={4}>
      <VStack align="start" spacing={6}>
        <Heading size="md">Menú</Heading>
        <VStack align="start" spacing={4} width="100%">
          <Link href="/dashboard">
            <Button as="a" w="100%">
              Dashboard
            </Button>
          </Link>
          <Link href="/cv/create">
            <Button as="a" w="100%">
              Crear CV
            </Button>
          </Link>
          {/* Agrega más opciones aquí si es necesario */}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
