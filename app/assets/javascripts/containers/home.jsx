var React = require('react'),
    Router = require('react-router');

var Alert = require('patternity/infl-components/alert.jsx');
var SelectDropdown = require('patternity/infl-components/select_dropdown.jsx');
var Button = require('patternity/infl-components/button.jsx');

require('./home.scss');

var SubmitDate = React.createClass({
  render: function() {
    return(
      <div className="submit_date">
        <SelectDropdown key="key" name="select_month" value="value 1">
          <optgroup label="Months">
              <option value="value 1">August 2015</option>
              <option value="value 2">September 2015</option>
              <option value="value 3">October 2015</option>
          </optgroup>
        </SelectDropdown>
      </div>
    );
  }
})

var Home = React.createClass({
  mixins: [ Router.Navigation ],
  render: function () {
    return (
      <div className="main">
        <h1 align="center" ref="header" id="header">Synch App!</h1>
        <Alert closeable={true} title="Choose a month" >
        </Alert>
        <br></br>
        <br></br>
        <br></br>
        <SubmitDate />
      <Button onClick={this._goToSchedule}>
          See schedule
      </Button>
      </div>
    );
  },

  _goToSchedule: function() {
    this.transitionTo('schedule')
  }
});

module.exports = Home;
