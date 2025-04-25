import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, Payload } from '../Utils/jwtUtils'

//extend the express request type to include user and token
export interface CustomRequest extends Request {
  user?: string;
  token?: string;
}

const authenticationMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {

    //extract token from authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ error: 'Authentication failed. Token missing.' });
    }

    //verify token and extract payload
    const decoded: Payload = verifyAccessToken(token);

    //attach the decoded user data to the request object
    req.user = decoded.username;
    req.token = token;

    next();
  } catch (error) {
    console.error('❌ Authentication error:', error);

    // if token expired
    if (error instanceof Error && error.message.includes('expired')) {
      return res.status(401).send({ error: 'Token expired. Please refresh your token.' });
    }

    return res.status(401).send({ error: 'Authentication failed. Invalid token.' });

  }
};

export default authenticationMiddleware;
