module.exports = function(grunt){
  grunt.initConfig({
    jsdoc:{
      dist : {
        src: ['src/main.js', 'src/*.js'], 
        options: {
          destination: 'doc',
          template: "TCETheme"
        }
      }
    },
    sass:{
      jsdoc:{
        cwd: "TCETheme/static/styles/scss",
        src: "*.css.scss",
        expand: true,
        dest: "TCETheme/static/styles",
        ext: ".css"
      }
    },
    watch: {
      options:{
        spawn: false
      },
      theme: {
        files: ["TCETheme/**/*"],
        tasks: ["sass", "jsdoc"]
      }
    },
    bower:{
      static: {
        dest:"TCETheme/static/dependencies",
        options: {
          expand: true
        }  
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower');
  grunt.registerTask('default', ["sass", 'jsdoc', "bower", "watch"]);
}