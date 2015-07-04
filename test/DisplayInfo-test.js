let expect = require('chai').expect;

let React = require('react/addons');
let TestUtils = React.addons.TestUtils;

let DisplayInfo = require('../src/DisplayInfo.jsx');

describe('DisplayInfo component', () => {
  it('should display the correct info', () => {
    let value = {
      name: 'quill',
      description: 'A cross browser rich text editor with an API',
      homepage: 'http://quilljs.com',
      language: 'CoffeeScript',
      stargazers_count: 5280,
    };

    let displayInfo = TestUtils.renderIntoDocument(<DisplayInfo value={value} />);

    let lis = TestUtils.scryRenderedDOMComponentsWithTag(displayInfo, 'li');

    expect(lis.length).to.equal(5);
    expect(lis[0].getDOMNode().textContent).to.contain('quill');
    expect(lis[1].getDOMNode().textContent).to.contain('cross browser');
    expect(lis[2].getDOMNode().textContent).to.contain('quilljs.com');
    expect(lis[3].getDOMNode().textContent).to.contain('CoffeeScript');
    expect(lis[4].getDOMNode().textContent).to.contain('5280');
  });
});
