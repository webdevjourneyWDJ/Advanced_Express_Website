const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);
const helper = require('../../../helper');

const { config } = helper;
const app = require('../../../../server/app')(config);

describe('The /users/account route', () => {
  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());
  it('should return an error 401 if a user isn\'t logged in', async () => {
    const res = await chai.request(app)
      .get('/users/account');
    expect(res.status).to.equal(401);
  });

  it('should return a status 200 for a logged in user', async () => {
    const agent = chai.request.agent(app);
    await helper.createUser(agent, helper.validUser);
    await helper.loginUser(agent, helper.validUser.email, helper.validUser.password);
    const res = await agent.get('/users/account');
    expect(res).to.have.status(200);
  });
});
