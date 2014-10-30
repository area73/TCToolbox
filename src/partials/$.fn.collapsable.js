$.fn.collapsable = function(options){
  var collapsableClass = (options && options.animated) ? TCT.CollapsableAnimated : TCT.Collapsable;
  return $(this).each(function(){
    var self = $(this);
    if(!self.data("collapsable")){
      self.data("collapsable", new collapsableClass(this, options));
    }
  });
};