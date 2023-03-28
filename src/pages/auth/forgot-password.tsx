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
  
  const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const toast = useToast();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Aquí debes agregar tu lógica para enviar el correo electrónico de recuperación de contraseña
      // Puedes utilizar una API route para manejar la recuperación
  
      // Ejemplo de llamada a la API:
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
  
      // Si el correo electrónico se envía correctamente, muestra una notificación
     // ...
    toast({
        title: 'Correo enviado',
        description: 'Revisa tu correo electrónico para recuperar tu contraseña',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    };
  
    return (
      <Box>
        <Heading>Recuperar contraseña</Heading>
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
            <Button type="submit" colorScheme="blue">
              Enviar correo
            </Button>
          </VStack>
        </form>
      </Box>
    );
  };
  
  export default ForgotPassword;
  