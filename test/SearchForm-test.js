let expect = require('chai').expect;
let sinon = require('sinon');

let React = require('react/addons');
let TestUtils = React.addons.TestUtils;

let SearchForm = require('../src/SearchForm.jsx');

describe('SearchForm component', () => {
  it('should be initialized with a default value', () => {
    let searchForm = TestUtils.renderIntoDocument(<SearchForm value="maur8ino" />);
    let input = TestUtils.findRenderedDOMComponentWithTag(searchForm, 'input');

    expect(input.getDOMNode().value).to.equal('maur8ino');
  });

  it('should disable the form', () => {
    let searchForm = TestUtils.renderIntoDocument(<SearchForm disabled={true} />);
    let input = TestUtils.findRenderedDOMComponentWithTag(searchForm, 'input');
    let button = TestUtils.findRenderedDOMComponentWithTag(searchForm, 'button');

    expect(input.getDOMNode().disabled).to.be.ok;
    expect(button.getDOMNode().disabled).to.be.ok;
  });

  it('should handle the form submit', () => {
    let handleSubmit = sinon.spy();

    let searchForm = TestUtils.renderIntoDocument(<SearchForm handleSubmit={handleSubmit} value="maur8ino" />);

    TestUtils.Simulate.submit(searchForm.getDOMNode());

    expect(handleSubmit.calledOnce).to.be.ok;
    expect(handleSubmit.calledWith('maur8ino')).to.be.ok;
  });
});
