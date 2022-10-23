import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

export default class JwtToken {
  public static createToken = (email: string) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'jwt_secret'
      // {
      // expiresIn: '7d', // '7d' = 7 dias. '8h' = 8 horas.
      // algorithm: 'HS256',
      // }
    );
    return token;
  };
  static validateToken = (token: string): object | string => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret') as jwt.JwtPayload;
      const { email } = data;
      return email;
    } catch(error) {
      console.log('Erro: ', error);
      const err = new Error('Token must be a valid token');
      err.name = 'Unauthorized';
      throw err;
    }
  };
}
