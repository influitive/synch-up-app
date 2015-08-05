var React     = require('react/addons'),
    Main      = require('containers/main'),
    TestUtils = React.addons.TestUtils;

describe('Main', function () {
  var subject;

  it('loads without problems', function () {
    subject = TestUtils.renderIntoDocument(<Main />);

    expect(subject.refs.header).to.exist
  });
});
