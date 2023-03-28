import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { signIn } from 'next-auth/client';
  
  const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
  
      if (!result.error) {
        toast({
          title: 'Inicio de sesión exitoso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error en el inicio de sesión',
          description: result.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Box>
        <Heading>Iniciar sesión</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Iniciar sesión
            </Button>
          </VStack>
        </form>
      </Box>
    );
  };
  
  export default SignIn;
  
  