import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { connectToDatabase } from './src/lib/db';

export default NextAuth({
  providers: [
    Providers.Credentials({
      // La función de autorización maneja la autenticación
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        // Aquí puedes agregar tu lógica de autenticación y búsqueda de usuario
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No se encontró el usuario');
        }

        // Comprueba la contraseña (puedes usar bcrypt para comparar contraseñas hasheadas)
        if (user.password !== credentials.password) {
          throw new Error('Contraseña incorrecta');
        }

        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  adapter: MongoDBAdapter({
    dbName: 'CVApp',
    clientPromise: connectToDatabase().then((client) => client.client),
  }),
  callbacks: {
    async jwt(token, user) {
      // Agrega el id del usuario al token si es un nuevo inicio de sesión
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      // Agrega el id del usuario a la sesión
      session.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  secret: 'tu_secreto_jwt', // Asegúrate de usar una cadena de caracteres segura
});
