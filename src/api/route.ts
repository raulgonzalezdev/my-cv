import { connectToDatabase } from '../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { db } = await connectToDatabase();

    try {
      await db.collection('users').insertOne(data);
      res.status(201).json({ message: 'CV creado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el CV' });
    }
  } else if (req.method === 'GET') {
    const { db } = await connectToDatabase();

    try {
      const cv = await db.collection('users').findOne({ _id: req.query.id });
      res.status(200).json(cv);
    } catch (error) {
      res.status(500).json({ message: 'Error al recuperar el CV' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
