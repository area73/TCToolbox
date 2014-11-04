module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'dist/tct-foundation.css': 'src/scss/tct-foundation.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      },

      js:{
        files: "src/js/**/*.js",
        tasks: ["directives"]
      }
    },

    directives: {
      files: {
        src     : 'src/js/tct-foundation.js',
        dest    : 'dist/tct-foundation.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sprockets-directives');

  grunt.registerTask('build', ['sass', "directives"]);
  grunt.registerTask('default', ['build','watch']);

}