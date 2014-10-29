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
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ["sass", 'jsdoc']);
}