// https://github.com/kentor/react-flux-testing/blob/master/tests.webpack.js

var Immutable = require('immutable');

/**
 * Function.bind polyfill for PhantomJS
 */
require('phantomjs-polyfill');

/**
 * Create a set of webpack module ids for our project's modules, excluding
 * tests. This will be used to clear the module cache before each spec.
 */
var projectContext = require.context('./app/assets/javascripts', true);
var projectModuleIds = Immutable.Set(
  projectContext.keys().map(function(module){
    String(projectContext.resolve(module))
  })
);

beforeEach(function(){
  /**
   * Clear the module cache before each spec. Many of our modules, such as
   * Stores and Actions, are singletons that have state that we don't want to
   * carry over between specs. Clearing the cache makes `require(module)`
   * return a new instance of the singletons. Modules are still cached within
   * each test case.
   */
  var cache = require.cache;
  projectModuleIds.forEach(function(id){ delete cache[id] });
});

/**
 * Load each spec using webpack's dynamic require with contexts.
 */
var specs = require.context('./spec/javascripts', true, /_spec.js?$/);
specs.keys().forEach(specs);
