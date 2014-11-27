


if(!this.TCT) this.TCT = {};
this.TCT.Collapsable = (function(TCT){

  var Collapsable = function(element,options) {
    this.options = $.extend({}, this.defaults, options);
    _.bindAll(this, 'onToggle');
    this.element = $(element);
    this.expanded = false;
    this.triggers = this.element.find(this.options.toggle);
    this.content = this.element.find(this.options.content);
    this.group = this.options.group ? this.options.group : this.element.data("collapsable-group");
    this.addElementClasses();
    this.init();
  };

  //extiendo mis funciones en mi prototipo
  $.extend(Collapsable.prototype,{
    defaults:{
      toggle: "[data-collapsable-toggle]",
      content: "[data-collapsable-content]",
      expandedClass: "tct-collapsable--expanded",
      collapsedClass: "tct-collapsable--collapsed",
      contentClass: "tct-collapsable__content",
      animated: false,
      group: undefined
    },
    init:function() {
      this.setElementClasses();
      this.notify();
      this.triggers.on('click',this.onToggle);
    },
    addElementClasses: function(){
      this.content
            .addClass(this.options.contentClass);
    },
    setElementClasses: function(){
      var removed, added;
      if(this.expanded){
        removed = this.options.collapsedClass;
        added = this.options.expandedClass;
      }else{
        removed = this.options.expandedClass;
        added = this.options.collapsedClass;
      }
      this.element.addClass(added);
      this.element.removeClass(removed);
    },
    notify:function(){
      this.element.trigger($.Event(this.expanded ? 'expanded' : 'collapsed'));
    },
    collapse: function(){
      if(!this.expanded) return;
      this.changeState(false);
    },
    expand: function() {
      if(this.expanded) return;
      
      this.closeGroup();

      this.changeState(true);
    },
    closeGroup: function(){
      if(this.group){
        var group_elements = $("[data-collapsable-group="+this.group+"]").filter("."+this.options.expandedClass);

        group_elements.each(function(){
          element = $(this).data("collapsable");
          if(element.expanded)
            element.collapse();
          else
            element.expand();
        });
      }
    },
    changeState: function(state){
      this.expanded = state;
      this.setElementClasses();
      this.notify();
    },
    onToggle:function(e){
      e.preventDefault();
      
      if(this.expanded){
        this.collapse();
      }else{
        this.expand();
      }
    }
  });
  return Collapsable;
})();
this.TCT.CollapsableAnimated = (function(sup){
  var CollapsableAnimated = function(element, options){
    this.defaults = $.extend({}, sup.prototype.defaults, this.defaults);
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
      $(window).on("resize", _.debounce(this.onWindowResize, 100));
    },
    addElementClasses: function(){
      this.element.find(this.options.content)
            .addClass(this.options.animatedClass);
      sup.prototype.addElementClasses.call(this);
    },
    expand: function(){
      this.calcContentHeight();
      sup.prototype.expand.call(this);
    },
    collapse: function(){
      this.content.css("height", "");
      sup.prototype.collapse.call(this);
    },
    onWindowResize: function(){
      if(this.expanded){
        this.calcContentHeight();
      }
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
$.fn.collapsable = function(options){
  var collapsableClass = (options && options.animated) ? TCT.CollapsableAnimated : TCT.Collapsable;
  return $(this).each(function(){
    var self = $(this);
    if(!self.data("collapsable")){
      self.data("collapsable", new collapsableClass(this, options));
    }
  });
};