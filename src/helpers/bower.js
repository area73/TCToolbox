var fs = require("fs");
module.exports.register = function (Handlebars, options, params) {
  Handlebars.registerHelper('bower_packages', function(options) {
    var output = "",
        dependencies = this.bower.dependencies,
        includedPackages = params.grunt.config.get("examples.public.packages"),
        pkg, data, pkgData;
      
    for(pkg in this.bower.dependencies){
      if(includedPackages.indexOf(pkg) == -1) continue;
      if (options.data) data = Handlebars.createFrame(options.data || {});
      else data = {};
      data.key = pkg;
      data.repository = dependencies[pkg] ;

      pkgData = JSON.parse(fs.readFileSync("bower_components/"+pkg+"/package.json"))

      output += options.fn(pkgData, {
        data:data        
      });
    }
    return output;
  });
};