require('es5-shim');
let React = require('react');

let SelectForm = React.createClass({
  getDefaultProps() {
    return {
      values: []
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.refs.select.getDOMNode().value);
  },

  render() {
    let options = this.props.values.map((value, i) => {
      return <option key={i} value={value.name}>{value.name}</option>
    });

    return (
      <form className="repos-list" onSubmit={this.handleSubmit}>
        <select ref="select" disabled={this.props.disabled}>
          {options}
        </select>
        <button type="submit" disabled={this.props.disabled}>Search</button>
      </form>
    );
  }
});

module.exports = SelectForm
