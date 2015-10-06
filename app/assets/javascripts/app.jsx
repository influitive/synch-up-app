// required by phantomjs for our test suite. Might be nice to split this out somehow?
require('phantomjs-polyfill');
var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route;

require('./app.scss');

var Main = require('containers/main'),
    Home = require('containers/home'),
    Schedule = require('containers/schedule');


var routes = (
  <Route name="main" path="/" handler={Main}>
    <Route name="home" path="home" handler={Home} />
    <Route name="schedule" path="schedule" handler={Schedule} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler){
  React.render(<Handler/>, document.getElementById('wrapper'));
});
