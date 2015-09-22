var Reflux = require('reflux');


var actions = Reflux.createActions([
  "fetchSchedule",
  "setScheduleParams",
  "fetchScheduleParams",
  "editSchedule",
  "updateSchedule",
  "goTo"

]);

module.exports = actions;
