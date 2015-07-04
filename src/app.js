let React = require('react');
let GithubSearch = require('./GithubSearch.jsx');

window.React = React

React.render(<GithubSearch/>, document.getElementById('content'));
