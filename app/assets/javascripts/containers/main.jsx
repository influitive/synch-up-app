var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

var Main = React.createClass({
  render: function(){
    return(
      <RouteHandler />
    );
  }
});

module.exports = Main;
