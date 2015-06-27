const githubBaseURL = 'https://api.github.com';

let getUserReposListURL = (username) => {
  if (!username) {
    throw new Error('Username is undefined, null or an empty string');
  }
  return `${githubBaseURL}/users/${encodeURIComponent(username)}/repos`;
};

let getUserRepoURL = (username, reponame) => {
  if (!username || !reponame) {
    throw new Error('Username or repository name is undefined, null or an empty string');
  }
  return `${githubBaseURL}/repos/${encodeURIComponent(username)}/${encodeURIComponent(reponame)}`;
};

module.exports = {
  getUserReposListURL: getUserReposListURL,
  getUserRepoURL: getUserRepoURL
};
