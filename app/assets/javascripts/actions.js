var Reflux = require('reflux');


var actions = Reflux.createActions([
  "fetchSchedule",
  "setScheduleParams",
  "fetchScheduleParams",
  "editSchedule"
]);

module.exports = actions;
