import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/teamModel';
import Match from '../database/models/matchModel';
import { teamList, matchesFinishedList } from './utils/mockData';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica informações da tabela de classificação dos times', () => {
  let chaiHttpResponse: Response;
  afterEach(()=>{
    sinon.restore();
  });
  it('Será validado sucesso ao buscar a classificação de times da casa', async () => {
    sinon.stub(Team, "findAll").resolves(teamList);
    sinon.stub(Match, "findAll").resolves(matchesFinishedList);
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home').send();
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  it('Será validado sucesso ao buscar a classificação de times da visitantes', async () => {
    sinon.stub(Team, "findAll").resolves(teamList);
    sinon.stub(Match, "findAll").resolves(matchesFinishedList);
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away').send();
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
  it('Será validado sucesso ao buscar a classificação geral dos times', async () => {
    sinon.stub(Team, "findAll").resolves(teamList);
    sinon.stub(Match, "findAll").resolves(matchesFinishedList);
    chaiHttpResponse = await chai.request(app).get('/leaderboard').send();
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});