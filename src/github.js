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

let get = (url) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();

    req.open('GET', url);

    req.onload = () => {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(Error(req.responseText));
      }
    };

    req.onerror = () => {
      reject(Error("Network Error"));
    };

    req.send();
  });
};

let getUserReposList = (username) => {
  try {
    return get(getUserReposListURL(username)).then(JSON.parse);
  }
  catch(error) {
    return Promise.reject(error);
  }
};

let getUserRepo = (username, reponame) => {
  try {
    return get(getUserRepoURL(username, reponame)).then(JSON.parse);
  }
  catch(error) {
    return Promise.reject(error);
  }
};

module.exports = {
  getUserReposListURL: getUserReposListURL,
  getUserRepoURL: getUserRepoURL,
  getUserReposList: getUserReposList,
  getUserRepo: getUserRepo
};
