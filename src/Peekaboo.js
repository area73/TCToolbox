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

        _.bindAll(this, "on_scroll", "on_resize");
        this.elements = [];
        this.on_scroll = _.debounce(this.on_scroll, 100);
        this.on_resize = _.debounce(this.on_resize, 100);
        this.measure();
        $(window)
          .on("scroll", this.on_scroll)
          .on("resize", this.on_resize);
      },
      peekaboo_instance;

  //  =================================
  //  = PeekabooElement Class methods =
  //  =================================
  $.extend(PeekabooElement,{
    
  });

  //  ====================================
  //  = PeekabooElement Instance methods =
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
    exec: function(scroll_position, viewport_height, prev_scroll, direction){
      var state,
          visible_viewport = scroll_position + viewport_height,
          visible;
      if(
        // Si ya hemos pasado el tope del elemento, pero aun no hemos dejado de verlo
        (scroll_position >= this.top && scroll_position < this.bottom) || 
        // Si el elemento aun no llega arriba, pero se alcanza a ver
        (scroll_position < this.top && this.top < visible_viewport)
      ){
        state = "visible";
      }else{
        state = "hidden";
      }
      visible = state == "visible";
      if(this.visible != visible){
        this.visible = visible;
        $(this.element).trigger( $.Event("peekaboo_state_change", {
          state: state,
          scroll: scroll_position,
          prev_scroll: prev_scroll,
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
  //  = Peekaboo Class methods =
  //  ==========================
  $.extend(Peekaboo,{
    instance: function(){
      if(!peekaboo_instance)
        peekaboo_instance = new Peekaboo(new PeekabooSingletonEnforcer());
      return peekaboo_instance;
    },
    register: function(element, options){
      var instance = this.instance();
      instance.register_element(element, options);
    },
    setOptions: function(element, options){
      var instance = this.instance();
      instance.setOptionsFor(element, options);
    },
    run: function(){
      this.instance().run();
    }
  });

  //  =============================
  //  = Peekaboo Instance methods =
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
    register_element: function(element, options){
      var peekabooElement = new PeekabooElement(element, options);
      $(element).data("peekaboo_id", peekabooElement.uid);
      this.elements.push(peekabooElement);
    },
    measure: function(){
      this.viewport_height = $(window).height();
      this.document_height = $(document).height() - this.viewport_height;
    },
    run: function(){
      var scroll_position = $(document).scrollTop(),
          prev_scroll = this.scroll_position,
          viewport_height = this.viewport_height,
          direction = ((typeof prev_scroll == "undefined") || (prev_scroll == scroll_position)) ? "none" : scroll_position > prev_scroll ? "down" : "up";
      _(this.elements).each(function(peekabooElement){
        peekabooElement.exec(scroll_position, viewport_height, prev_scroll, direction);
      });
      this.scroll_position = scroll_position;
      this.triggerPosition();
      
    },
    triggerPosition: function(){
      var percent = Math.round((this.scroll_position / this.document_height)*100)/100;
      $(window).trigger($.Event("peekaboo_scroll_position", {
        position: this.scroll_position,
        percent: percent
      }));
    },
    on_scroll: function(e){
      this.run();
    },
    on_resize: function(){
      this.measure();
      _(this.elements).each(function(peekaboo_element){
        peekaboo_element.measure();
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