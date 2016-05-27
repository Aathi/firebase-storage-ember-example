var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {});
  app.import('vendor/bootstrap.css');
  return app.toTree();
};
