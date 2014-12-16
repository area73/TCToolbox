this.TCT.HoverCollapsableStrategy = (function(sup){
  
  var HoverCollapsableStrategy = function(collapsable){
    _.bindAll(this, "onTap", "onMouseOver", "onMouseOut");
    this.touched = false;
    sup.call(this, collapsable);
  };

  var tmp = function(){};
  tmp.prototype = sup.prototype;
  HoverCollapsableStrategy.prototype = new tmp();
  HoverCollapsableStrategy.prototype.constructor = HoverCollapsableStrategy;

  $.extend(HoverCollapsableStrategy.prototype, {
    listen: function(){
      this.collapsable.triggers
        .on('mouseenter',this.onMouseOver)
        .on('tap', this.onTap);
      this.collapsable.element
        .on('mouseleave',this.onMouseOut)
        .on('touchstart touchmove touchend', function (event) {
            event.preventDefault();
        });
    },
    onMouseOver: function(e){
      var self = this;
      _.delay(function(){
        if(self.touched){
          e.preventDefault();
          self.touched = false;
        }else{
          console.log(e.type);
          self.collapsable.expand();
        }        
      }, 150);
    },
    onMouseOut: function(e){
      var self = this;
      _.delay(function(){
        if(self.touched){
          e.preventDefault();
          self.touched = false;
        }else{
          console.log(e.type);
          self.collapsable.collapse();
        }        
      }, 150);
    },
    onTap:function(e){
      console.log(e.type);
      this.touched = true;
      e.preventDefault();
      if(this.collapsable.expanded){
        this.collapsable.collapse();
      }else{
        this.collapsable.expand();
      }
    }
  });

  TCT.Collapsable.triggerStrategies.hover = HoverCollapsableStrategy;

  return HoverCollapsableStrategy;

})(this.TCT.CollapsableTriggerStrategy);