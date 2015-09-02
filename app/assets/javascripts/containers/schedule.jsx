var React  = require('react'),
    Router = require('react-router'),
    Reflux = require('reflux');

var Table   = require('reactabular').Table;
var cells   = require('reactabular').cells;
var editors = require('reactabular').editors;

var Button  = require('patternity/infl-components/button.jsx');

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
      Actions.fetchSchedule();
  },

  render: function(){
    return(
        <div className="schedule">
          <Table className='pure-table pure-table-striped' columns={this.state.columns} data={this.state.data}/>
          <Button className="submit-btn">
            Submit
          </Button>
        </div>
      );
  }
})

module.exports = Schedule;
