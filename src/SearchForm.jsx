let React = require('react');

let SearchForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.refs.input.getDOMNode().value);
  },

  render() {
    return (
      <form className="username" onSubmit={this.handleSubmit}>
        <input type="text" ref="input" defaultValue={this.props.value} disabled={this.props.disabled}/>
        <button type="submit" disabled={this.props.disabled}>Search</button>
      </form>
    );
  }
});

module.exports = SearchForm
