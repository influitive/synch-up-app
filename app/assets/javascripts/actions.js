var Reflux = require('reflux');


var actions = Reflux.createActions([
  "fetchSchedule",
  "setScheduleParams",
  "editSchedule"
]);

module.exports = actions;
