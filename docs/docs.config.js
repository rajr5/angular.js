var path = require('canonical-path');
var gruntUtils = require('../lib/grunt/utils');
var basePath = __dirname;

var basePackage = require('./config');

module.exports = function(config) {

  var version = gruntUtils.getVersion();
  var cdnUrl = "//ajax.googleapis.com/ajax/libs/angularjs/" + version.cdn;

  var getVersion = function(component, sourceFolder, packageFile) {
    sourceFolder = sourceFolder || '../bower_components';
    packageFile = packageFile || 'bower.json';
    return require(path.join(sourceFolder,component,packageFile)).version;
  };


  config = basePackage(config);

  config.set('source.projectPath', path.resolve(basePath, '..'));

  config.set('source.files', [
    { pattern: 'src/**/*.js', basePath: path.resolve(basePath,'..') },
    { pattern: '**/*.ngdoc', basePath: path.resolve(basePath, 'content') }
  ]);

  config.set('processing.examples.commonFiles', {
    scripts: [ '../../../angular.js' ],
    stylesheets: []
  });
  config.set('processing.examples.dependencyPath', '../../..');

  config.set('rendering.outputFolder', '../build/docs');

  config.set('logging.level', 'info');

  config.merge('deployment', {
    environments: [{
      name: 'debug',
      scripts: [
        '../angular.js',
        '../angular-resource.js',
        '../angular-route.js',
        '../angular-cookies.js',
        '../angular-sanitize.js',
        '../angular-touch.js',
        '../angular-animate.js',
        'components/marked-' + getVersion('marked', '../node_modules', 'package.json') + '/lib/marked.js',
        'js/angular-bootstrap/bootstrap.js',
        'js/angular-bootstrap/bootstrap-prettify.js',
        'js/angular-bootstrap/dropdown-toggle.js',
        'components/lunr.js-' + getVersion('lunr.js') + '/lunr.js',
        'components/google-code-prettify-' + getVersion('google-code-prettify') + '/src/prettify.js',
        'components/google-code-prettify-' + getVersion('google-code-prettify') + '/src/lang-css.js',
        'js/versions-data.js',
        'js/pages-data.js',
        'js/docs.js'
      ],
      stylesheets: [
        'components/bootstrap-' + getVersion('bootstrap') + '/dist/css/bootstrap.css',
        'components/open-sans-fontface-' + getVersion('open-sans-fontface') + '/open-sans.css',
        'css/prettify-theme.css',
        'css/docs.css',
        'css/animations.css'
      ]
    },
    {
      name: 'default',
      scripts: [
        '../angular.min.js',
        '../angular-resource.min.js',
        '../angular-route.min.js',
        '../angular-cookies.min.js',
        '../angular-sanitize.min.js',
        '../angular-touch.min.js',
        '../angular-animate.min.js',
        'components/marked-' + getVersion('marked', '../node_modules', 'package.json') + '/lib/marked.js',
        'js/angular-bootstrap/bootstrap.js',
        'js/angular-bootstrap/bootstrap-prettify.js',
        'js/angular-bootstrap/dropdown-toggle.js',
        'components/lunr.js-' + getVersion('lunr.js') + '/lunr.min.js',
        'components/google-code-prettify-' + getVersion('google-code-prettify') + '/src/prettify.js',
        'components/google-code-prettify-' + getVersion('google-code-prettify') + '/src/lang-css.js',
        'js/versions-data.js',
        'js/pages-data.js',
        'js/docs.js'
      ],
      stylesheets: [
        'components/bootstrap-' + getVersion('bootstrap') + '/dist/css/bootstrap.min.css',
        'components/open-sans-fontface-' + getVersion('open-sans-fontface') + '/open-sans.css',
        'css/prettify-theme.css',
        'css/docs.css',
        'css/animations.css'
      ]
    },
    {
      name: 'production',
      scripts: [
        cdnUrl + '/angular.min.js',
        cdnUrl + '/angular-resource.min.js',
        cdnUrl + '/angular-route.min.js',
        cdnUrl + '/angular-cookies.min.js',
        cdnUrl + '/angular-sanitize.min.js',
        cdnUrl + '/angular-touch.min.js',
        cdnUrl + '/angular-animate.min.js',
        'components/marked-' + getVersion('marked', '../node_modules', 'package.json') + '/lib/marked.js',
        'js/angular-bootstrap/bootstrap.js',
        'js/angular-bootstrap/bootstrap-prettify.js',
        'js/angular-bootstrap/dropdown-toggle.js',
        'components/lunr.js-' + getVersion('lunr.js') + '/lunr.min.js',
        'components/google-code-prettify-' + getVersion('google-code-prettify') + '/src/prettify.js',
        'components/google-code-prettify-' + getVersion('google-code-prettify') + '/src/lang-css.js',
        'js/versions-data.js',
        'js/pages-data.js',
        'js/docs.js'
      ],
      stylesheets: [
        'components/bootstrap-' + getVersion('bootstrap') + '/dist/css/bootstrap.min.css',
        'components/open-sans-fontface-' + getVersion('open-sans-fontface') + '/open-sans.css',
        'css/prettify-theme.css',
        'css/docs.css',
        'css/animations.css'
      ]
    }
  ]
  });

  return config;
};
