if(!this.TCT) this.TCT = {};
this.TCT.Sticky = (function(){
  var StickyElement = function(element, options){
    if(!(element instanceof jQuery))
      element = $(element);
    this.element = element;
    this.options = $.extend({}, this.defaults, options);
    this.top = !this.options.top ?
                  this.calculateTop :
                  typeof this.options.top == "function" ? 
                    $.proxy(function(scrollTop){
                      return this.options.top.call(this, scrollTop);
                    }, this) :
                    $.proxy(function(){
                      return this.options.top;
                    });
    this.sticked = false;
  };
    
  $.extend(StickyElement.prototype,{
    defaults: {
      top:0,
      stickyClass: "sticky"
    },
    evaluate: function(top, resize){
      if(top >= this.top(top, resize)){
        this.stick();
      }else{
        this.unstick();
      }
    },
    stick: function(){
      
      if(this.sticked) return;
      this.element.addClass(this.options.stickyClass);
      this.sticked = true;
      this.element.trigger("sticked");
    },
    unstick: function(){
      if(!this.sticked) return;
      this.element.removeClass(this.options.stickyClass);
      this.sticked = false;
      this.element.trigger("unsticked");
    },
    calculateTop: function(scrollTop, resize){
      var top = this.element.data("sticky_element_top");
      if(!top || resize){
        top = this.element.offset().top;
        this.element.data("sticky_element_top", top);
      }
      return top;
    },
    reset: function(){
      this.unstick();
    }
  });
  
  var StickySingletonEnforcer = function(){},
      Sticky = function(enforcer){
        if(!(enforcer instanceof StickySingletonEnforcer) ||
            (Sticky._instance && Sticky._instance != this))
          throw(new Error("TCT.Sticky is a singleton. Please use TCT.Sticky.instance()"));
        
        this.onScroll = $.proxy(this.onScroll, this);
        this.onResize = $.proxy(this.onResize, this);
        
        this.running = false;
        this.elements = [];
      };
      
  Sticky.StickyElement = StickyElement;
        
  Sticky.instance = function(){
    if(!Sticky._instance)
      Sticky._instance = new Sticky(new StickySingletonEnforcer());
    return Sticky._instance;
  };
  
  $.extend(Sticky.prototype, {
    //  ==================

    //  ==================
    register: function(element, options){
      this.elements.push(new StickyElement(element, options));
      return this;
    },
    refresh: function(){
      var scrollTop = $(window).scrollTop(),
          stickyElement, index;
      for(index = this.elements.length; index--;){
        stickyElement = this.elements[index];
        stickyElement.evaluate(scrollTop, true);
      }
    },
    stop: function(){
      if(!this.running) return this;
      this.resetElements();
      $(window).off(".sticky_scroll");
      this.running = false;
    },
    start: function(){
      if(window.debuggg){
        debugger;
      }
      if(this.running) return this;

      
      $(window)
        .on("scroll.sticky_scroll", this.onScroll)
        .on("resize.sticky_scroll", this.onResize);
      
      this.refresh();
      
      this.running = true;
      return this;
    },
    //  ===================

    //  ==================/
    resetElements: function(){
      var i = 0,
          totalElements = this.elements.length,
          element;
      for(i; i < totalElements; i++){
        element = this.elements[i];
        element.reset();
      }
    },
    //  =============

    //  =============
    onScroll: function(event){
      this.refresh();
    },
    onResize: function(event){
      this.refresh();
    }
  });

  return Sticky;
})();