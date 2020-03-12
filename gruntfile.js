module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    watch: {
      scripts: {
        files: ['./public/scripts/*.jsx', './public/styles/*.css'],
        tasks: ['webpack'],
        options: {
          interrupt: true,
          livereload: true
        },

      },
    },
    concurrent: {
        target: ['nodemon', 'watch'],
        options: {
                logConcurrentOutput: true
            }
    },
    webpack: {
      scripts: {
        // webpack options
        entry: "./public/scripts/main.js",
        output: {
            path: "./public/bin",
            filename: "app.bundle.js",
        },
        /*watch: true, if this is turned on, then we dont need watch task*/
        stats: {
            // Configure the console output
            colors: true,
            modules: true,
            reasons: true
        },
        module: {
          loaders: [
              { test: /\.css$/, loader: "style!css" },
              {
                  test: /\.jsx?$/,
                  exclude: /(node_modules|bower_components)/,
                  loader: 'babel',
                  query: {
                      presets: ['es2015', 'react']
                  }

              }
          ]
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: '5455'
          },
          ignore:['node_modules/**', 'public/**'],
          ext: 'js',
          // omit this property if you aren't serving HTML files and 
          // don't want to open a browser tab on start
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('open')('http://localhost:3000');
              }, 1000);
            });

            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              // Delay before server listens on port
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      }
    },   
  });

  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['webpack', 'concurrent:target']);

};