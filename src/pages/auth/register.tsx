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
  
  const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (response.ok) {
        toast({
          title: 'Registro exitoso',
          description: 'El usuario ha sido registrado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error en el registro',
          description: 'No se pudo registrar al usuario',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Box>
        <Heading>Registrarse</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
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
              Registrarse
            </Button>
          </VStack>
        </form>
      </Box>
    );
  };
  
  export default Register;
  