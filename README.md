# Bem vindos ao repositório do Trybe Futebol Clube!

  O projeto `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  Foi desenvolvida uma API (utilizando o método `TDD`) e também integrada *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Foi construído **um back-end dockerizado utilizando modelagem de dados através do Sequelize**.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa usuária deverá estar logada para fazer as alterações. Existe um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

</details>

<details>
  <summary><strong> Testes de cobertura </strong></summary><br/>

  A construção de testes de cobertura no back-end foram feitas em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`.

  Os testes ainda em desenvolvimento devem cobrir todos os arquivos contidos em `app/backend/src`.

</details>

## SUMÁRIO

- [Habilidades](#habilidades)
  - [O que foi desenvolvido](#sobre)
- [Descrição](#descrição)

## Habilidades

* Utilizadas _Variáveis de Ambiente_ para controlar as portas das APIs.
* Utilizado _Docker_ para garantir a integridade dos versionamentos.
* Utilizado _Typescript_ na criação da API.

## Sobre

Um site retorna informações sobre as classificações dos times, de acordo com os filtros, dinamicamente com as alterações e inclusões de novas partidas pelos usuários administradores. Ao acessar o endereço sem o login, a tela inicial apresentada será o quadro de _Classificação_ de partidas. Ao logar com usuário e senha valído, o mesmo será automaticamente direcionado à tela de _Partidas_.

Esse projeto é composto de 4 seções principais:

Seção 1: Users e Login<br>
Seção 2: Times<br>
Seção 3: Partidas<br>
Seção 4: Leaderboards (placares)<br>

<details>
  <summary><strong> Regras de negócios: </strong></summary>

  - Os campos `email` e `password` serão validados no banco de dados quando:
    - O campo `email` deve receber um formato de email válido;
    - O Campo `password` deve ter mais de 6 caracteres;
    - O `email` e `password` devem constar no DB.

  - Ao acrescentar uma nova partida:
    - Os `times` da casa e visitante não podem ser o mesmo;
    - O `time` deve constar no DB;
    - O `usuário` deve ter permissão para adicionara a nova partida

  - O `Total de Pontos` é calculado da seguinte forma:
    - O time `vitorioso`: marca +3 pontos;
    - O time `perdedor`: marca 0 pontos;
    - Em caso de `empate`: ambos os times marcam +1 ponto.

  - `Aproveitamento do time (%)`: `P/(J*3)*100`, onde:
    - `P`: Total de Pontos;
    - `J`: Total de Jogos.

  - `Saldo de Gols`: `GP - GC`, onde:
    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos.

  - Critérios para desempate:

  **Ordem para desempate**

  1º Total de Vitórias;<br>
  2º Saldo de gols;<br>
  3º Gols a favor;<br>
  4º Gols sofridos.
  
</details>

## Descrição

1. (`TDD`) Teste de cobertura dos arquivos back-end (atualmente em 75%).
2. Carregamento inicial do DB com informações prévias dos usuários, times e jogos, utilizando sequelize.
3. O endpoint `/login` permite o acesso do usuário apenas com dados válidos no front-end, de acordo com as regras de negócio.
4. Os endpoints `/teams` e `/teams/:id` _no back-end_ retornam os times corretamente (para futuras implementações de funcionalidades como lista de times e detalhes de times no front-end).
5. O endpoint `/matches` mostra corretamente na tela de partidas no front-end, onde também é possível filtrar as partidadas em andamento e finalizadas.
6. Através do endpoint `/matches` o usuário com perfil de administrador poderá salvar uma partida com _Status_ `Em andamento`.
7. Ao acessar o endpoint `/matches/:id`, o usuário com perfil de administrador poderá alterar o _Status_ `Em andamento` para `Finalizado`.
8. O endpoint `/leaderboard` mostra no front-end a classificação geral dos times no campeonato, e também é possível filtrar as classificações dos times `da casa` e as classificações dos times quando visitantes.
