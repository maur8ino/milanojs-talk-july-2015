const githubBaseURL = 'https://api.github.com';

let getUserReposListURL = (username) => {
  return `${githubBaseURL}/users/${encodeURIComponent(username)}/repos`;
};

let getUserRepoURL = (username, reponame) => {
  return `${githubBaseURL}/repos/${encodeURIComponent(username)}/${encodeURIComponent(reponame)}`;
};

module.exports = {
  getUserReposListURL: getUserReposListURL,
  getUserRepoURL: getUserRepoURL
};
