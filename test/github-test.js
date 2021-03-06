let expect = require('chai').expect;
let sinon = require('sinon');

let github = require('../src/github');

describe('github module', () => {
  let server;

  before(() => {
    server = sinon.fakeServer.create();
  });

  after(() => {
    server.restore();
  });

  it('should generate the correct user\'s list of repositories endpoint url using encodeURIComponent', () => {
    expect(github.getUserReposListURL('maur8ino')).to.equal('https://api.github.com/users/maur8ino/repos');
    expect(github.getUserReposListURL('maur/8i&no')).to.equal('https://api.github.com/users/maur%2F8i%26no/repos');
  });

  it('should throw an error if the username is undefined, null or an empty string', () => {
    let fn = github.getUserReposListURL.bind(github.getUserReposListURL, undefined);
    expect(fn).to.throw(Error);
    expect(fn).to.throw(/empty string/);

    fn = github.getUserReposListURL.bind(github.getUserReposListURL, null);
    expect(fn).to.throw(Error);
    expect(fn).to.throw(/empty string/);

    fn = github.getUserReposListURL.bind(github.getUserReposListURL, '');
    expect(fn).to.throw(Error);
    expect(fn).to.throw(/empty string/);
  });

  it('should generate the correct specific user\'s repository endpoint url using encodeURIComponent', () => {
    expect(github.getUserRepoURL('maur8ino', 'react-bem-mixin')).to.equal('https://api.github.com/repos/maur8ino/react-bem-mixin');
    expect(github.getUserRepoURL('maur/8i&no', 'rea/ct-bem-\mixin')).to.equal('https://api.github.com/repos/maur%2F8i%26no/rea%2Fct-bem-mixin');
  });

  it('should throw an error if either the username or the repository name is undefined, null or an empty string', () => {
    let fn = github.getUserRepoURL.bind(github.getUserRepoURL, undefined, 'react-bem-mixin');
    expect(fn).to.throw(Error);
    expect(fn).to.throw(/empty string/);

    fn = github.getUserRepoURL.bind(github.getUserRepoURL, 'maur8ino', undefined);
    expect(fn).to.throw(Error);
    expect(fn).to.throw(/empty string/);

    fn = github.getUserRepoURL.bind(github.getUserRepoURL, undefined, undefined);
    expect(fn).to.throw(Error);
    expect(fn).to.throw(/empty string/);
  });

  it('should make an ajax request for user\'s repositories list and resolve it', (done) => {
    server.autoRespond = true;
    server.respondWith('GET', 'https://api.github.com/users/maur8ino/repos', [
      200,
      { 'Content-Type': 'application/json' },
      '[{ "id": 35957173, "name": "angular-post-message" }, { "id": 37024234, "name": "react-bem-mixin" }]'
    ]);

    github.getUserReposList('maur8ino').then((response) => {
      expect(response).to.deep.equal(
        [{
          id: 35957173,
          name: 'angular-post-message'
        }, {
          id: 37024234,
          name: 'react-bem-mixin'
        }]
      );

      done();
    });
  });

  it('should make an ajax request for user\'s repositories list and resolve it using cache', (done) => {
    // First request
    server.respondWith('GET', 'https://api.github.com/users/maur8ino/repos', [
      200,
      { 'Content-Type': 'application/json', 'ETag': '12345678abcd' },
      '[{ "id": 35957173, "name": "angular-post-message" }, { "id": 37024234, "name": "react-bem-mixin" }]'
    ]);
    github.getUserReposList('maur8ino');
    server.respond();

    // Second request same url
    server.respondWith('GET', 'https://api.github.com/users/maur8ino/repos', [
      304,
      { 'Content-Type': 'application/json', 'ETag': '12345678abcd' },
      ''
    ]);

    github.getUserReposList('maur8ino').then((response) => {
      expect(response).to.deep.equal(
        [{
          id: 35957173,
          name: 'angular-post-message'
        }, {
          id: 37024234,
          name: 'react-bem-mixin'
        }]
      );

      done();
    });
    server.respond();
  });

  it('should make an ajax request for user\'s repositories list and reject it', (done) => {
    server.autoRespond = true;
    server.respondWith('GET', 'https://api.github.com/users/maur8ino/repos', [
      500,
      { 'Content-Type': 'text/html' },
      'KO'
    ]);

    github.getUserReposList('maur8ino').catch(() => {
      done();
    });
  });

  it('should reject the promise if the user is undefined', (done) => {
    github.getUserReposList().catch(() => {
      done();
    });
  });

  it('should make an ajax request for specific user\'s repository and resolve it', (done) => {
    server.autoRespond = true;
    server.respondWith('GET', 'https://api.github.com/repos/maur8ino/react-bem-mixin', [
      200,
      { 'Content-Type': 'application/json' },
      '{ "id": 37024234, "name": "react-bem-mixin", "full_name": "maur8ino/react-bem-mixin", ' +
      '"html_url": "https://github.com/maur8ino/react-bem-mixin", ' +
      '"description": "A React.js mixin for generating BEM class names" }'
    ]);

    github.getUserRepo('maur8ino', 'react-bem-mixin').then((response) => {
      expect(response).to.deep.equal({
        id: 37024234,
        name: 'react-bem-mixin',
        full_name: 'maur8ino/react-bem-mixin',
        html_url: 'https://github.com/maur8ino/react-bem-mixin',
        description: 'A React.js mixin for generating BEM class names'
      });

      done();
    });
  });

  it('should make an ajax request for specific user\'s repository and resolve it using cache', (done) => {
    // First request
    server.respondWith('GET', 'https://api.github.com/repos/maur8ino/react-bem-mixin', [
      200,
      { 'Content-Type': 'application/json', 'ETag': '12345678abcd' },
      '{ "id": 37024234, "name": "react-bem-mixin", "full_name": "maur8ino/react-bem-mixin", ' +
      '"html_url": "https://github.com/maur8ino/react-bem-mixin", ' +
      '"description": "A React.js mixin for generating BEM class names" }'
    ]);
    github.getUserRepo('maur8ino', 'react-bem-mixin');
    server.respond();

    // Second request same url
    server.respondWith('GET', 'https://api.github.com/repos/maur8ino/react-bem-mixin', [
      304,
      { 'Content-Type': 'application/json', 'ETag': '12345678abcd' },
      ''
    ]);
    github.getUserRepo('maur8ino', 'react-bem-mixin').then((response) => {
      expect(response).to.deep.equal({
        id: 37024234,
        name: 'react-bem-mixin',
        full_name: 'maur8ino/react-bem-mixin',
        html_url: 'https://github.com/maur8ino/react-bem-mixin',
        description: 'A React.js mixin for generating BEM class names'
      });

      done();
    });
    server.respond();
  });

  it('should make an ajax request for specific user\'s repository and reject it', (done) => {
    server.autoRespond = true;
    server.respondWith('GET', 'https://api.github.com/repos/maur8ino/react-bem-mixin', [
      500,
      { 'Content-Type': 'text/html' },
      'KO'
    ]);

    github.getUserRepo('maur8ino', 'react-bem-mixin').catch(() => {
      done();
    });
  });

  it('should reject the promise if the user or repo are undefined', (done) => {
    github.getUserRepo().catch(() => {
      done();
    });
  });
});
