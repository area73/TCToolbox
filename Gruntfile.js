var path = require('path');
module.exports = function(grunt){
  grunt.initConfig({
    bower:{
      www:{
        options:{
          targetDir: './public/bower_components',
          layout: 'byComponent',
          install: false
        }
        // options:{
        //   peekaboo:{
        //     dest: "public/peekaboo/dependencies"
        //   }
        // }
      }
    }
  });

  grunt.loadNpmTasks("grunt-bower-task");
  grunt.registerTask("default", ["build:public"])
}