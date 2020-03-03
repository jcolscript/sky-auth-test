import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_KEY);

    req.userId = decoded._id;

    return next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({ message: 'Sessão inválida' });
    }
    return res.status(401).json({ message: 'Não autorizado' });
  }
};
