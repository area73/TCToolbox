if(!this.TCT) this.TCT = {};
this.TCT.Sticky = (function(){
  var StickyElement = function(element, options){
    if(!(element instanceof jQuery))
      element = $(element);
    this.element = element;
    this.options = $.extend({}, this.defaults, options);
    this.top = !this.options.top ?
                  this.calculate_top :
                  typeof this.options.top == "function" ? 
                    $.proxy(function(scroll_top){
                      return this.options.top.call(this, scroll_top);
                    }, this) :
                    $.proxy(function(){
                      return this.options.top;
                    });
    this.sticked = false;
  };
    
  $.extend(StickyElement.prototype,{
    defaults: {
      top:0,
      sticky_class: "sticky"
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
      this.element.addClass(this.options.sticky_class);
      this.sticked = true;
      this.element.trigger("sticked");
    },
    unstick: function(){
      if(!this.sticked) return;
      this.element.removeClass(this.options.sticky_class);
      this.sticked = false;
      this.element.trigger("unsticked");
    },
    calculate_top: function(scroll_top, resize){
      var top = this.element.data("stickt_element_top");
      if(!top || resize){
        top = this.element.offset().top;
        this.element.data("stickt_element_top", top);
      }
      return top;
    }
  });
  
  var StickySingletonEnforcer = function(){},
      Sticky = function(enforcer){
        if(!(enforcer instanceof StickySingletonEnforcer) ||
            (Sticky._instance && Sticky._instance != this))
          throw(new Error("TCT.Sticky is a singleton. Please use TCT.Sticky.instance()"));
        
        this.on_scroll = $.proxy(this.on_scroll, this);
        this.on_resize = $.proxy(this.on_resize, this);
        
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
    //  = Public Methods =
    //  ==================
    register: function(element, options){
      this.elements.push(new StickyElement(element, options));
      return this;
    },
    refresh: function(){
      var scroll_top = $(window).scrollTop(),
          sticky_element, index;
      for(index = this.elements.length; index--;){
        sticky_element = this.elements[index];
        sticky_element.evaluate(scroll_top, true);
      }
    },
    stop: function(){
      if(!this.running) return this;
      
      $(window).off(".sticky_scroll");
      this.running = false;
    },
    start: function(){
      if(this.running) return this;
      
      $(window)
        .on("scroll.sticky_scroll", this.on_scroll)
        .on("resize.sticky_scroll", this.on_resize);
      this.refresh();
      
      this.running = true;
      return this;
    },
    
    //  =============
    //  = Callbacks =
    //  =============
    on_scroll: function(event){
      this.refresh();
    },
    on_resize: function(event){
      this.refresh();
    }
  });

  return Sticky;
})();