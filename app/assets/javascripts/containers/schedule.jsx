var React = require('react'),
  Router = require('react-router'),
  Reflux = require('reflux');

var Table = require('reactabular').Table;
var cells = require('reactabular').cells;
var editors = require('reactabular').editors;

var Button = require('patternity/infl-components/button.jsx');

var ScheduleStore = require('stores/schedule_store'),
  Actions = require('actions');

require('./schedule.scss');

var Schedule = React.createClass({
  mixins: [
    Router.Navigation,
    Reflux.connect(ScheduleStore)
  ],

  getInitialState: function () {

    var editable = cells.edit.bind(this, 'editedCell', (value, celldata, rowIndex, property) => {
      Actions.editSchedule(rowIndex, property, value);
    });

    var data = [];
    var columns = [
      {
        property: 'date',
        header: 'Date'
      },
      {
        property: 'department',
        header: 'Department',
        cell: [
          editable({
            editor: editors.input()
          })
        ]
      },
      {
        property: 'presenter',
        header: 'Presenter',
        cell: [
          editable({
            editor: editors.input()
          })
        ]
      }
    ];

    return {
      data: data,
      columns: columns,
      monthName: 'January'
    };
  },

  componentWillMount: function () {
    Actions.fetchSchedule();
  },

  componentDidUpdate: function () {
    var rows = React.findDOMNode(this.refs.table).querySelectorAll('tbody tr');

    for (var i = 0; i < rows.length; i++) {
      day = rows[i].textContent.split(',')[0];
      rows[i].className = day.toLowerCase();
    }
  },

  render: function () {
    return (
      <div className="schedule">
        <nav>
          <a href="#" rel="previous" onClick={this._goToPrevious}>&larr; Previous</a>
          <span>{this.state.monthName}</span>
          <a href="#" rel="next" onClick={this._goToNext}>Next &rarr;</a>
        </nav>
        <Table ref="table" className='pure-table' columns={this.state.columns} data={this.state.data}/>
        <Button className="submit-btn" onClick={this._handleClick}>
          Submit
        </Button>
      </div>
    );
  },
  _goToPrevious: function (e) {
    e.preventDefault();
    Actions.goTo('previous');
  },
  _goToNext: function (e) {
    e.preventDefault();
    Actions.goTo('next');
  },
  _handleClick: function () {
    Actions.updateSchedule();
  }

});

module.exports = Schedule;
