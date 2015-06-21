const githubBaseURL = 'https://api.github.com';

let getUserReposListURL = (username) => {
  return `${githubBaseURL}/users/${username}/repos`;
};

let getUserRepoURL = (username, reponame) => {
  return `${githubBaseURL}/repos/${username}/${reponame}`;
};

module.exports = {
  getUserReposListURL: getUserReposListURL,
  getUserRepoURL: getUserRepoURL
};
