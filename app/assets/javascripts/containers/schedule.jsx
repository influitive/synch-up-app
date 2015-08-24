var React  = require('react'),
    Router = require('react-router'),
    Reflux = require('reflux');

var Table = require('reactabular').Table;
var cells = require('reactabular').cells;
var editors = require('reactabular').editors;


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
      var idx = rowIndex;
      this.state.data[idx][property] = value;
      this.setState({
        data: data,
      });
    });

    var data = [
        {
            date: 'Monday, 1st September 2015',
            department: 'Dev',
        },
        {
            date: 'Tuesday, 2nd September 2015',
            department: 'Sales',
        },
        {
            date: 'Wednesday, 3rd September 2015',
            department: 'PM/Design'
        },
        {
            date: 'Thursday, 4th September 2015',
            department: 'CS',
        },
        {
            date: 'Friday, 5th September 2015',
            department: 'Marketing',
        },
    ];

    var columns = [
        {
          property: 'date',
          header: 'Date',
        },
        {
          property: 'department',
          header: 'Department',
          cell: [
            editable({
                editor: editors.input(),
            })
          ]
        }
    ];

    return  {
        data: data,
        columns: columns
    };
  },

  componentWillMount: function () {
      Actions.fetchSchedule(0,0);
  },

  render: function(){
    console.log(this.state.data);
    return(
        <Table className='pure-table pure-table-striped' columns={this.state.columns} data={this.state.data}/>
      );
  }
})

module.exports = Schedule;
