var Reflux = require('reflux'),
  request = require('superagent');

var actions = require('actions');

var MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

var ScheduleStore = Reflux.createStore({
  listenables: actions,

  init: function () {
    this.schedule = {month: (new Date()).getMonth() + 1, year: "2015"};
    this.data = []
  },

  onSetScheduleParams: function (paramType, value) {
    //paramType can be either month or year
    this.schedule[paramType] = value;
    this.trigger({schedule: this.schedule})
  },

  onFetchScheduleParams: function () {
    this.trigger({schedule: this.schedule});
  },

  onFetchSchedule: function () {
    var month = this.schedule.month;
    var year = this.schedule.year;

    request
      .get('api/schedule')
      .query({year: year, month: month})
      .accept('json')
      .end(function (e, response) {
        this.data = response.body;
        this.trigger({data: this.data, monthName: MONTHS[month - 1]});
      }.bind(this));
  },

  onEditSchedule: function (index, property, value) {
    this.data[index][property] = value;
    this.trigger({data: this.data})
  },

  onUpdateSchedule: function () {
    var month = this.schedule.month;
    var year = this.schedule.year;

    request
      .patch('/api/schedule')
      .query({year: year, month: month, schedule: JSON.stringify(this.data)})
      .end(function (e, response) {
      });
  },

  onGoTo: function (direction) {
    var date = new Date();
    date.setFullYear(this.schedule.year, this.schedule.month - 1);
    if (direction == 'previous') {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    this.schedule.month = date.getMonth() + 1;
    this.schedule.year = date.getFullYear();

    this.onFetchSchedule();
  }

});

module.exports = ScheduleStore;
