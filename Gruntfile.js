var path = require('path');
module.exports = function(grunt){
  grunt.initConfig({
    bower:{
      pub:{
        dest: 'public/bower_components',
        options: {
          expand: true
        }  
      }      
    },
    assemble:{
      options: {
        data: ["bower.json"],
        layout: 'default.hbs',
        layoutdir: 'src/layouts',
        assets: "public",
        helpers: ["src/helpers/**/*.js"]
      },
      public: {
        src:"**/*.hbs",
        cwd: "src/pages",
        dest: "public",
        expand: true
      }
    },
    examples:{
      public:{
        packages:[
          "peekaboo"
        ]
      }
    },
    watch: {
      options:{
        spawn: false
      },
      assemble:{
        files: ["src/pages/**/*", "src/layouts/**/*"],
        tasks: ["assemble"]  
      }
    }
  });

  grunt.loadTasks('tasks/');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('assemble');

  grunt.registerTask("default", ["examples", "assemble", "watch"])
}