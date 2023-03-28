import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import options from '../../../next-auth.config';

export default (req, res) => NextAuth(req, res, options);
