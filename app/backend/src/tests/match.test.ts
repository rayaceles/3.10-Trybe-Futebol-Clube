import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/matchModel';
import { matchesFinishedList, matchesInProgressList, matchesList } from './utils/mockData';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica informações das partidas', () => {
  let chaiHttpResponse: Response;
  afterEach(()=>{
    sinon.restore();
  });
  it('Será validado sucesso ao buscar a lista completa de partidas', async () => {
    sinon.stub(Match, "findAll").resolves(matchesList); // pra não precisar logar/permissão
    chaiHttpResponse = await chai.request(app).get('/matches').send();
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesList);
  });
  it('Será validado o filtro de todas as partidas em andamento', async () => {
    sinon.stub(Match, "findAll").resolves(matchesInProgressList);
    chaiHttpResponse = await chai.request(app).get('/matches').send('true');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(8);
  });
    it('Será validado o filtro de todas as partidas finalizadas', async () => {
    sinon.stub(Match, "findAll").resolves(matchesFinishedList);
    chaiHttpResponse = await chai.request(app).get('/matches').send('false');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(20);
  });
  it('Será validado sucesso ao finalizar uma partida em andamento', async () => {
    sinon.stub(Match, "update").resolves(matchesList[9]);
    chaiHttpResponse = await chai.request(app).patch('/matches/:id/finish').send('10');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.property('message', 'Finished');
  });
});
