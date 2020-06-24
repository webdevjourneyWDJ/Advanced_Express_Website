/* eslint-disable no-unused-expressions */
const chai = require('chai');
chai.use(require('chai-as-promised'));
const helper = require('../../helper');

const { UserModel } = helper;
const should = chai.should();
const { expect } = chai;

describe('The mongoose schema', async () => {
  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());

  it('should let you create a new user with valid data', async () => {
    const user = new UserModel(helper.validUser);
    const savedUser = await user.save();
    expect(savedUser.id).to.exist;
  });

  it('should reject a too short username', async () => {
    const user = new UserModel({ username: 'ab', password: 'verysecret', email: 'foo@bar.com' });
    await expect(user.save()).to.be.rejectedWith(Error);
  });

  it('should reject a too short password', async () => {
    const user = new UserModel({ username: 'abc', password: '1234567', email: 'foo@bar.com' });
    await expect(user.save()).to.be.rejectedWith(Error);
  });

  it('should reject an invalid email format', async () => {
    const user = new UserModel({ username: 'abc', password: '12345678', email: 'foobar' });
    await expect(user.save()).to.be.rejectedWith(Error);
  });

  it('should find a user', async () => {
    const user = new UserModel(helper.validUser);
    await user.save();
    const foundUser = await UserModel.findOne({ email: helper.validUser.email }).exec();
    expect(foundUser.username).to.equal('Frank');
  });
});
