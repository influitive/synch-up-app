var React = require('react'),
    Router = require('react-router');

var Table = require('reactabular').Table;
var cells = require('reactabular').cells;
var editors = require('reactabular').editors;

require('./schedule.scss');

var Schedule = React.createClass({
  mixins: [
    Router.Navigation
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
            owner: 'Ryan' ,
            notes: '',
            estimatedValue: 3
        },
        {
            date: 'Tuesday, 2nd September 2015',
            department: 'Sales',
            owner: 'Emanuelle',
            notes: '',
            estimatedValue: 3
        },
        {
            date: 'Wednesday, 3rd September 2015',
            department: 'PM/Design',
            owner: 'Mark R',
            notes: '',
            estimatedValue: 3
        },
        {
            date: 'Thursday, 4th September 2015',
            department: 'CS',
            owner: 'Chad',
            notes: '',
            estimatedValue: 3
        },
        {
            date: 'Friday, 5th September 2015',
            department: 'Marketing',
            owner: 'Jim',
            notes: '',
            estimatedValue: 3
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
        },
        {
          property: 'owner',
          header: 'Owner',
          cell: [
            editable({
                editor: editors.input(),
            })
          ]
        },
        {
          property: 'notes',
          header: 'Notes',
        }
    ];

    return  {
        data: data,
        columns: columns
    };
  },

  render: function(){
    return(
        <Table className='pure-table pure-table-striped' columns={this.state.columns} data={this.state.data}/>
      );
  }
})

module.exports = Schedule;
