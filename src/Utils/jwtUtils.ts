import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

if (!accessSecret) {
  throw new Error('JWT_ACCESS_TOKEN_SECRET_KEY is not defined in environment variables');
}

export interface Payload extends JwtPayload {
  username:string
}

export const generateAccessToken = async (payload: Payload) => {
  return jwt.sign(payload, accessSecret, { expiresIn: '1h' });
}

export const verifyAccessToken = (token: string): Payload => {
  try {
    const decoded = jwt.verify(token, accessSecret) as Payload;
    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired access token');
  }
};
