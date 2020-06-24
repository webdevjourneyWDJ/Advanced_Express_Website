const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);
const helper = require('../../../helper');

const { config, UserModel } = helper;

const app = require('../../../../server/app')(config);

describe('The /users/registration route', () => {
  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());
  it('should return an error 500 with empty request', async () => {
    const res = await chai.request(app)
      .post('/users/registration');
    res.should.have.status(500);
  });
  it('should show a success message after succesful registration', async () => {
    const agent = chai.request.agent(app);
    const res = await agent
      .post('/users/registration')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(helper.validUser);
    res.should.have.status(200);
    res.text.should.contain('Thank you for your registration!');
    const user = await UserModel.findOne({ email: helper.validUser.email });
    expect(user).to.be.instanceOf(UserModel);
  });
});
