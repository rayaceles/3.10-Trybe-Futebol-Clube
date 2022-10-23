import ILogin from '../interfaces/ILogin';
import User from '../database/models/userModel';
import { compareSync } from 'bcryptjs';
import jwtToken from '../middlewares/jwtToken';

export default class LoginService {
  public login = async ({ email, password }: ILogin) => {
    if (!email || !password) {
      const err = new Error('All fields must be filled');
      err.name = 'ValidationError';
      throw err;
    }
    const user = await User.findOne({ where: { email } });
    if (user === null || !(compareSync(password, user.password))) {
      const err = new Error('Incorrect email or password');
      err.name = 'Unauthorized';
      throw err;
    }
    const token = jwtToken.createToken(email);
    return token;
  };
  public validate = async (authorization: string) => {
    if (!authorization) {
      const err = new Error('Token must be a valid token');
      err.name = 'Unauthorized';
      throw err; 
    }
    const validateToken = jwtToken.validateToken(authorization);
    const user = await User.findOne({ where: { email: validateToken } });
    if (!user) {
      const err = new Error('Token must be a valid token');
      err.name = 'Unauthorized';
      throw err;
    }
    return user.role;
  };
};
