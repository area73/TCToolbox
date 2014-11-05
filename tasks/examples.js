module.exports = function(grunt){
  grunt.registerMultiTask("examples", function(){
    var src = this.data.packages.map(function(pkg){
      return pkg+"/examples/**/*";
    })
    grunt.config("copy.examples",{
      files:[{
        cwd: "bower_components/",
        src: src,
        dest: "public/",
        expand: true,
        rename: function(dir, filename){
          return dir+filename.replace(/(^.+?)\/examples\/(.+)/, "$1/$2")
        }
      }]
    });
    grunt.task.run("copy:examples")
  });
}