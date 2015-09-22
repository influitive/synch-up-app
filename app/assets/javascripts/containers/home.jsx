var React = require('react'),
    Router = require('react-router'),
    Reflux = require('reflux');

var Alert = require('patternity/infl-components/alert.jsx');
var SelectDropdown = require('patternity/infl-components/select_dropdown.jsx');
var Button = require('patternity/infl-components/button.jsx');
var TextInput = require("patternity/infl-components/text_input.jsx");

var ScheduleStore = require('stores/schedule_store');

var Actions = require('actions');
require('./home.scss');

var SubmitDate = React.createClass({
  render: function() {
    return(
      <div className="submit_date">
        <SelectDropdown key="key" name="select_month" value={this.props.month} onChange={this._handleDropDownChange}>
            <option value="1">January </option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </SelectDropdown>
      </div>
    );
  },

  _handleDropDownChange: function(e) {
    Actions.setScheduleParams("month", e.target.value);

    //TODO: Change to dynamically set year
    Actions.setScheduleParams("year", "2015");
  }

});

var Home = React.createClass({
  mixins: [ Router.Navigation, Reflux.connect(ScheduleStore) ],

  getInitialState: function () {
    return {
      schedule: {
        month: "2",
        year:  "2015"
      }
    };
  },

  componentWillMount: function () {
      Actions.fetchScheduleParams();
  },

  render: function () {
   return (
      <div className="main">
        <h1 align="center" ref="header" id="header">Synch App!</h1>
        <Alert closeable={true} title="Choose a month" >
        </Alert>
        <br></br>
        <br></br>
        <br></br>
        <SubmitDate month={this.state.schedule.month} year={this.state.schedule.year}/>
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
