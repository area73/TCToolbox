this.TCT.CollapsableTriggerStrategy = (function(){
  var CollapsableTriggerStrategy = function(collapsable, options){
    this.options = $.extend({}, this.defaults, options);
    this.collapsable = collapsable;
  };

  $.extend(CollapsableTriggerStrategy.prototype, {
    init: function(){
      this.listen();
    }
  });

  return CollapsableTriggerStrategy;
})();