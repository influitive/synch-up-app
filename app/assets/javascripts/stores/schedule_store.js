var Reflux  = require('reflux'),
    request = require('superagent');

var actions = require('actions');

var ScheduleStore = Reflux.createStore({
  listenables: actions,

  init: function () {
    this.schedule = {month: "1", year: "2015"};
    this.data     = []
  },

  onSetScheduleParams: function (paramType, value) {
    //paramType can be either month or year
    this.schedule[paramType] = value
    this.trigger({schedule: this.schedule})
  },

  onFetchScheduleParams: function (){
    this.trigger({schedule: this.schedule});
  },

  onFetchSchedule: function() {
    month = this.schedule.month;
    year  = this.schedule.year;

    request
      .get('/api/schedule')
      .query({year: year, month: month})
      .accept('json')
      .end(function(e, response){
        this.data = response.body;
        this.trigger({data: this.data});
      }.bind(this));
  },

  onEditSchedule: function(index, property, value) {
    this.data[index][property] = value;
    this.trigger({data: this.data})
  },

  onUpdateSchedule: function() {
    request
      .patch('/api/schedule')
      .query({year: year, month: month, schedule: JSON.stringify(this.data)})
      .end(function(e, response){
      });
  }
});

module.exports = ScheduleStore;
