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
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ["sass", 'jsdoc', "watch"]);
}