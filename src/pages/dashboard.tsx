import { Box, SimpleGrid, VStack, Heading, Text } from '@chakra-ui/react';

// Simula datos de CV para mostrar en el Dashboard
const cvData = [
  {
    id: 1,
    title: 'CV versión 1',
  },
  {
    id: 2,
    title: 'CV versión 2',
  },
  // Agrega más datos aquí si es necesario
];

const Dashboard = () => {
  return (
    <Box p={4}>
      <Heading size="lg">Dashboard</Heading>
      <SimpleGrid columns={3} spacing={4} mt={4}>
        {cvData.map((cv) => (
          <Box key={cv.id} bg="white" borderRadius="md" p={4} boxShadow="md">
            <VStack align="start" spacing={2}>
              <Heading size="sm">{cv.title}</Heading>
              <Text>
                Descripción o detalles adicionales del CV.
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
