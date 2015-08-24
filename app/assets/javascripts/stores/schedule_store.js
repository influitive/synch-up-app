var Reflux  = require('reflux'),
    request = require('superagent');

var actions = require('actions');

var ScheduleStore = Reflux.createStore({
  listenables: actions,

  onFetchSchedule: function(month, year) {
    request
      .get('/api/schedule?year=2015&month=10')
      .accept('json')
      .end(function(e, response){
        this.trigger({data: response.body});
      }.bind(this));
  }
});

module.exports = ScheduleStore;
