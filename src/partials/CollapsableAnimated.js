this.TCT.CollapsableAnimated = (function(sup){
  var CollapsableAnimated = function(element, options){
    this.defaults = $.extend({}, sup.prototype.defaults, this.defaults);
    this.uid = _.uniqueId();
    this.windowSize = {};
    this.updateWindowSize();
    _.bindAll(this, 'onWindowResize');
    sup.call(this, element, options);
  };

  var tmp = function(){};
  tmp.prototype = sup.prototype;
  CollapsableAnimated.prototype = new tmp();
  CollapsableAnimated.prototype.constructor = CollapsableAnimated;

  $.extend(CollapsableAnimated.prototype, {
    defaults: {
      animatedClass: "tct-collapsable__content--animated",
      noTransitionClass: "tct-collapsable__content--no-transition"
    },
    init: function(){
      sup.prototype.init.call(this);
    },
    addElementClasses: function(){
      this.element.find(this.options.content)
            .addClass(this.options.animatedClass);
      sup.prototype.addElementClasses.call(this);
    },
    expand: function(){
      this.calcContentHeight();
      sup.prototype.expand.call(this);
      this.startResizeListening();
    },
    collapse: function(){
      this.stopResizeListening();
      this.content.css("height", "");
      sup.prototype.collapse.call(this);
    },
    onWindowResize: function(e){
      var ww = $(window).width(),
          wh = $(window).height();
      if(this.expanded && (this.windowSize.width != ww || this.windowSize.height != wh)){
        this.updateWindowSize(ww, wh);
        this.calcContentHeight();
      }
    },
    updateWindowSize: function(ww, wh){
      this.windowSize.width = ww || $(window).width();
      this.windowSize.height = wh || $(window).height();
    },
    stopResizeListening: function(){
      $(window).off(".resize_collapsable_"+this.uid);
    },
    startResizeListening: function(){
      $(window).on("resize.resize_collapsable_"+this.uid, _.debounce(this.onWindowResize, 100));
    },
    calcContentHeight: function(transition){
      var element = this.content,
          current_height = element.outerHeight(),
          noTransitionClass = this.options.noTransitionClass,
          real_height;
      element.addClass(noTransitionClass).css("height","auto");
      real_height = element.outerHeight();
      if(transition === false){
        element
            .css("height",real_height);
        _.defer(function(){
          element.removeClass(noTransitionClass);
        });
      }else{
        element
          .css("height",current_height)
            .removeClass("hidden").addClass("visible");
        _.defer(function(){
          element
            .removeClass(noTransitionClass)
            .css("height", real_height);
        });
      }
    }
  });

  return CollapsableAnimated;
})(TCT.Collapsable);