import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/teamModel';
import { teamList } from './utils/mockData';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica informações dos times', () => {
  let chaiHttpResponse: Response;
  afterEach(()=>{
    sinon.restore();
  });
  it('Será validado sucesso ao buscar a lista completa de times', async () => {
    sinon.stub(Team, "findAll").resolves(teamList);
    chaiHttpResponse = await chai.request(app).get('/teams').send();
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  it('Será validado se é possível buscar um time específico', async () => {
    sinon.stub(Team, "findOne").resolves(teamList[4]);
    chaiHttpResponse = await chai.request(app).get('/teams/:id').send('5');
    expect(chaiHttpResponse.body).to.property('team_name', 'Cruzeiro');
  });
  it('Será validado que não é possível retornar um time não cadastrado', async () => {
    sinon.stub(Team, "findOne").resolves(null);
    chaiHttpResponse = await chai.request(app).get('/teams/:id').send('100');
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.property('message', 'Team not found');
  });
});
