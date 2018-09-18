var util = require('util');
var glob = require('glob');
var moment = require('moment');
var config = require('./config');

module.exports = function (grunt) {
  var filesToSkip = ['Gruntfile.js'];
  var filePaths = glob.sync('*.js', {cwd: 'src/'}).filter(function (filePath) {
    return filesToSkip.indexOf(filePath) < 0;
  });

  var files = function (env) {
    return filePaths.reduce(function (files, filePath) {
      files[util.format('bin/%s/%s', env, filePath)] = 'src/' + filePath;
      return files;
    }, {});
  };

  function get_config(name) {
    var conf = config[name];
    conf.buildDate = moment().format();
    return conf;
  }

  grunt.initConfig({
    jshint: {
      all: ['bin/**/*.js']
    },

    render: {
      dev: {
        options: get_config('dev'),
        files: files('dev')
      },
      production: {
        options: get_config('production'),
        files: files('production')
      },
      staging: {
        options: get_config('staging'),
        files: files('staging')
      },
      testing: {
        options: get_config('testing'),
        files: files('testing')
      }
    },

    deploy: {
      dev: {
        options: get_config('dev')
      },
      staging: {
        options: get_config('staging')
      },
      production: {
        options: get_config('production')
      },
      testing: {
        options: get_config('testing')
      }
    }
  });

  grunt.loadTasks('tasks/');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ejs-render');

  grunt.registerTask('default', ['render:dev']);
  grunt.registerTask('dev', ['render:dev']);
  grunt.registerTask('production', ['render:production']);
  grunt.registerTask('staging', ['render:staging']);
  grunt.registerTask('testing', ['render:testing']);

  grunt.registerTask('rd', ['render:dev', 'deploy:dev']);
  grunt.registerTask('rd-testing', ['render:testing', 'deploy:testing']);
  grunt.registerTask('rd-dev', ['render:dev', 'deploy:dev']);
  grunt.registerTask('rd-production', ['render:production', 'deploy:production']);
  grunt.registerTask('rd-staging', ['render:staging', 'deploy:staging']);
};
