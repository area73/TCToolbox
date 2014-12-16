
this.TCT.ClickCollapsableStrategy = (function(sup){
  
  var ClickCollapsableStrategy = function(collapsable){
    _.bindAll(this, "onToggle");
    sup.call(this, collapsable);
  };

  var tmp = function(){};
  tmp.prototype = sup.prototype;
  ClickCollapsableStrategy.prototype = new tmp();
  ClickCollapsableStrategy.prototype.constructor = ClickCollapsableStrategy;

  $.extend(ClickCollapsableStrategy.prototype, {
    listen: function(){
      this.collapsable.triggers.on('click',this.onToggle);
    },
    onToggle:function(e){
      e.preventDefault();
      if(this.collapsable.expanded){
        this.collapsable.collapse();
      }else{
        this.collapsable.expand();
      }
    }
  });

  TCT.Collapsable.triggerStrategies.click = ClickCollapsableStrategy;

  return ClickCollapsableStrategy;

})(this.TCT.CollapsableTriggerStrategy);