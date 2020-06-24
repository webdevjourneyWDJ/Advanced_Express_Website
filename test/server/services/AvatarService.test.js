/* eslint-disable no-unused-expressions */
const chai = require('chai');
const path = require('path');
const fs = require('fs');
const util = require('util');

const fsReadFile = util.promisify(fs.readFile);
const fsExists = util.promisify(fs.exists);

chai.use(require('chai-as-promised'));
const helper = require('../../helper');

const should = chai.should();
const { expect } = chai;

const { AvatarService, config } = helper;

describe('The Avatar Service', async () => {
  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());

  it('should resize and store PNG images', async () => {
    const avatars = new AvatarService(config.data.avatars);
    const filepath = path.resolve(`${__dirname}/../../helper/valid_png.png`);
    const buffer = await fsReadFile(filepath);
    const filename = await avatars.store(buffer);
    expect(filename).to.be.not.empty;
    const storedPath = avatars.filepath(filename);
    const exists = await fsExists(storedPath);
    expect(exists).to.be.true;
  });

  it('should resize and store JPG images', async () => {
    const avatars = new AvatarService(config.data.avatars);
    const filepath = path.resolve(`${__dirname}/../../helper/valid_jpg.jpg`);
    const buffer = await fsReadFile(filepath);
    const filename = await avatars.store(buffer);
    expect(filename).to.be.not.empty;
    const storedPath = avatars.filepath(filename);
    const exists = await fsExists(storedPath);
    expect(exists).to.be.true;
  });

  it('should delete images', async () => {
    const avatars = new AvatarService(config.data.avatars);
    const filepath = path.resolve(`${__dirname}/../../helper/valid_png.png`);
    const buffer = await fsReadFile(filepath);
    const filename = await avatars.store(buffer);
    expect(filename).to.be.not.empty;
    const storedPath = avatars.filepath(filename);
    const exists = await fsExists(storedPath);
    expect(exists).to.be.true;
    await avatars.delete(filename);
    const existsDel = await fsExists(storedPath);
    expect(existsDel).to.be.false;
  });
});
