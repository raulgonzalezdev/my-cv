// src/pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Método no permitido' });
    return;
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(422).json({ message: 'Faltan datos' });
    return;
  }

  const { db } = await connectToDatabase();

  // Aquí puedes agregar la lógica para verificar si el correo electrónico ya está registrado
  const existingUser = await db.collection('users').findOne({ email });

  if (existingUser) {
    res.status(409).json({ message: 'El correo electrónico ya está registrado' });
    return;
  }

  // Aquí puedes agregar la lógica para hashear la contraseña antes de guardarla en la base de datos
  // (por ejemplo, usando bcrypt)

  const result = await db.collection('users').insertOne({ name, email, password });

  if (result.insertedCount > 0) {
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } else {
    res.status(500).json({ message: 'Error al registrar al usuario' });
  }
}
