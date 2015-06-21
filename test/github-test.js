let expect = require('chai').expect;

let github = require('../src/github');

describe('github module', () => {
  it('should generate the correct user\'s list of repositories endpoint url', () => {
    expect(github.getUserReposListURL('maur8ino')).to.equal('https://api.github.com/users/maur8ino/repos');
  });

  it('should generate the correct specific user\'s repository endpoint url', () => {
    expect(github.getUserRepoURL('maur8ino', 'react-bem-mixin')).to.equal('https://api.github.com/repos/maur8ino/react-bem-mixin');
  });
});
