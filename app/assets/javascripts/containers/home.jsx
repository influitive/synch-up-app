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
          {this._getOptions()}
        </SelectDropdown>
      </div>
    );
  },

  _getOptions: function () {
    return this.props.monthNames.map(function(month, i){
      return (<option value={i+1}>{month}</option>);
    });
  },

  _handleDropDownChange: function(e) {
    Actions.setScheduleParams("month", e.target.value);

    //TODO: Change to dynamically set year
    Actions.setScheduleParams("year", "2016");
  }

});

var Home = React.createClass({
  mixins: [ Router.Navigation, Reflux.connect(ScheduleStore) ],

  getInitialState: function () {
    return {
      monthNames:  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'],
      schedule: {
        month: "1",
        year:  "2016"
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
        <SubmitDate month={this.state.schedule.month} year={this.state.schedule.year} monthNames={this.state.monthNames}/>
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
