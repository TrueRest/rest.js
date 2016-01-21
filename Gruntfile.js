'use strict';
var mountFolder;

mountFolder = function(connect, dir) {
  return connect['static'](require('path').resolve(dir));
};

module.exports = function(grunt) {
  var yeomanConfig;
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  yeomanConfig = {
    src: 'src',
    dist: 'dist'
  };
  return grunt.initConfig({
    yeoman: yeomanConfig,
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['<%= yeoman.src %>/init.js', '<%= yeoman.src %>/*.js', '<%= yeoman.src %>/**/*.js'],
        dest: '<%= yeoman.dist %>/rest-factory.js',
      },
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: '<%= yeoman.src %>',
          themedir : 'node_modules/yuidoc-bootstrap-theme',
          helpers : ['node_modules/yuidoc-bootstrap-theme/helpers/helpers.js'],
          outdir: 'docs/'
        }
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      },
      travis: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  },

    grunt.registerTask('doc', ['yuidoc']),
    grunt.registerTask('default', ['concat']),
    grunt.registerTask('build', ['concat']),
    grunt.registerTask('test', ['build', 'karma:unit']),
    grunt.registerTask('test-travis', ['build', 'karma:travis'])
  );
};
