var Reflux = require('reflux');


var actions = Reflux.createActions([
  "fetchSchedule",
  "setScheduleParams",
  "fetchScheduleParams",
  "editSchedule",
  "updateSchedule"
]);

module.exports = actions;
