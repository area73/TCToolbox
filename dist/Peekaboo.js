if(!this.TCT) this.TCT = {};
this.TCT.Peekaboo = (function(TCT){

  var PeekabooSingletonEnforcer = function(){},
      PeekabooElement = function(element, options){
        this.element = element;
        this.uid = _.uniqueId("peekaboo_");
        this.setOptions(options || {}, this.defaults);
        this.init();
      },
      Peekaboo = function(singletonEnforcer){
        if(!singletonEnforcer || !(singletonEnforcer instanceof PeekabooSingletonEnforcer))
          throw(new Error("TCT.Peekaboo is a singleton. Please use TCT.Peekaboo.instance()"));
        this.running = false;
        _.bindAll(this, "onScroll", "onResize");
        this.elements = [];
        this.onScroll = _.debounce(this.onScroll, 100);
        this.onResize = _.debounce(this.onResize, 100);
        this.measure();
      },
      peekabooInstance;

  //  ====================================

  //  ====================================
  $.extend(PeekabooElement.prototype,{
    top: 0,
    bottom: 0,
    defaults:{
      offsetBottom: 0,
      offsetTop: 0,
    },
    init: function(){
      this.visible = false;
      this.measure();
    },
    measure: function(){
      var element = $(this.element);
      this.top = element.offset().top + _.result(this.options, "offsetTop");
      this.bottom = element.offset().top + element.outerHeight() - _.result(this.options,"offsetBottom");
    },
    exec: function(scrollPosition, viewportHeight, prevScroll, direction){
      var state,
          visibleViewport = scrollPosition + viewportHeight,
          visible;
      if(
        // Si ya hemos pasado el tope del elemento, pero aun no hemos dejado de verlo
        (scrollPosition >= this.top && scrollPosition < this.bottom) || 
        // Si el elemento aun no llega arriba, pero se alcanza a ver
        (scrollPosition < this.top && this.top < visibleViewport)
      ){
        state = "visible";
      }else{
        state = "hidden";
      }
      visible = state == "visible";
      if(this.visible != visible){
        this.visible = visible;
        $(this.element).trigger( $.Event(Peekaboo.STATE_CHANGE_EVENT, {
          state: state,
          scroll: scrollPosition,
          prevScroll: prevScroll,
          direction: direction
        }) );
      }
    },
    setOptions: function(options, defaults){
      this.options = $.extend({}, defaults || this.options, options);
      if(typeof options.offsetBottom == "function")
        this.options.offsetBottom = _.bind(this.options.offsetBottom, this);

      if(typeof options.offsetTop == "function")
        this.options.offsetTop = _.bind(this.options.offsetTop, this);
    },
    update: function(options){
      this.setOptions(options);
      this.measure();
    }
  });

  //  ==========================

  //  ==========================
  $.extend(Peekaboo,{
    STATE_CHANGE_EVENT: "peekaboo_state_change",

    instance: function(){
      if(!peekabooInstance)
        peekabooInstance = new Peekaboo(new PeekabooSingletonEnforcer());
      return peekabooInstance;
    },
    register: function(element, options){
      var instance = this.instance();
      instance.registerElement(element, options);
    },
    setOptions: function(element, options){
      var instance = this.instance();
      instance.setOptionsFor(element, options);
    },
    start: function(){
      this.instance().start();
    },
    stop: function(){
      this.instance().stop();
    }
  });

  //  =============================

  //  =============================
  $.extend(Peekaboo.prototype,{
    setOptionsFor: function(element, options){
      element = $(element);
      var uid = element.data("peekaboo_id"),
          peekabooElement = _(this.elements).find(function(pe){
            return pe.uid == uid;
          });
      if(peekabooElement){
        peekabooElement.update(options);
      }
    },
    registerElement: function(element, options){
      if($(element).data("peekaboo_id")) return;
      var peekabooElement = new PeekabooElement(element, options);
      $(element).data("peekaboo_id", peekabooElement.uid);
      this.elements.push(peekabooElement);
    },
    measure: function(){
      this.viewportHeight = $(window).height();
      this.documentHeight = $(document).height() - this.viewportHeight;
    },
    start: function(){
      if(this.running) return;
      $(window)
        .on("scroll.peekaboo_event", this.onScroll)
        .on("resize.peekaboo_event", this.onResize);
      this.running = true;
      this.run();
    },
    stop: function(){
      if(!this.running) return;
      $(window).off(".peekaboo_event");
      this.running = false;
      _(this.elements).each(function(element){
        element.visible = false;
      });
    },
    run: function(){
      if(!this.running) return;
      var scrollPosition = $(document).scrollTop(),
          prevScroll = this.scrollPosition,
          viewportHeight = this.viewportHeight,
          direction = ((typeof prevScroll == "undefined") || (prevScroll == scrollPosition)) ? "none" : scrollPosition > prevScroll ? "down" : "up";
      _(this.elements).each(function(peekabooElement){
        peekabooElement.exec(scrollPosition, viewportHeight, prevScroll, direction);
      });
      this.scrollPosition = scrollPosition;
      this.triggerPosition();
      
    },
    triggerPosition: function(){
      var percent = Math.round((this.scrollPosition / this.documentHeight)*100)/100;
      $(window).trigger($.Event("peekaboo_scroll_position", {
        position: this.scrollPosition,
        percent: percent
      }));
    },
    onScroll: function(e){
      this.run();
    },
    onResize: function(){
      this.measure();
      _(this.elements).each(function(peekabooElement){
        peekabooElement.measure();
      });
      this.run();
    }
  });

  $.fn.peekaboo = function(options){

    return this.each(function(){
      var self = $(this);
      if(!self.data( "peekaboo_id" )){
        Peekaboo.register(this, options);
      }else if(options){
        Peekaboo.setOptions(this, options);
      }
    });

  };

  return Peekaboo;
})();