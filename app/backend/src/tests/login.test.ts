import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/userModel';
import ILogin from '../interfaces/ILogin';
import { validUser, validUserLogin } from './utils/mockData';

import { Response } from 'superagent';
import { hash } from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica as regras de negócio para efetuar o login', () => {
  sinon.restore();
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  });
  it('Será validado que é possível fazer login com sucesso enviando os dados corretos', async () => {
    const hashPass = await hash(validUser.password, 8);
    sinon.stub(User, "findOne").resolves({ ...validUser, password: hashPass } as User);
    chaiHttpResponse = await chai.request(app).post('/login').send(validUserLogin as ILogin);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.key('token');
  });
  it('Será validado que não é possível fazer login com sucesso enviando email incorreto', async () => {
    const invalidUserEmail = { ...validUserLogin, email: 'loginTestWrong@test.com' };
    sinon.stub(User, "findOne").resolves(null); // não encontra o e-mail
    chaiHttpResponse = await chai.request(app).post('/login').send( invalidUserEmail as ILogin);
    expect(chaiHttpResponse.status).to.be.equal(401);
  });
  it('Será validado que não é possível fazer login com sucesso enviando senha incorreto', async () => {
    const hashPass = await hash(validUser.password, 8);
    const invalidUserPassword = { ...validUserLogin, password: 'wrongPassword' };
    sinon.stub(User, "findOne").resolves({ ...validUser, password: hashPass } as User);
    chaiHttpResponse = await chai.request(app).post('/login').send(invalidUserPassword as ILogin);
    expect(chaiHttpResponse.body).to.property('message', 'Incorrect email or password');
  });
  it('Será validado que não é possível fazer login com sucesso sem enviar o email', async () => {
    const noUserEmail = { ...validUserLogin, email: '' };
    chaiHttpResponse = await chai.request(app).post('/login').send( noUserEmail as ILogin);
    expect(chaiHttpResponse.status).to.be.equal(400);
  });
  it('Será validado que não é possível fazer login com sucesso sem enviar a senha', async () => {
    const noUserPassword = { ...validUserLogin, password: '' };
    chaiHttpResponse = await chai.request(app).post('/login').send(noUserPassword as ILogin);
    expect(chaiHttpResponse.body).to.property('message', 'All fields must be filled');
  });
});
