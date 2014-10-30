if(!this.TCT) this.TCT = {};
this.TCT.Peekaboo = (function(TCT){

  var Collapsable = function(element,options) {
    this.options = $.extend({}, this.defaults, options);
    _.bindAll(this, 'onToggle');
    this.element = $(element);
    this.expanded = false;
    this.triggers = this.element.find(this.options.toggle);
    this.element.find(this.options.content).addClass(this.options.contentClass);
    this.init();
  };

  //extiendo mis funciones en mi prototipo
  $.extend(Collapsable.prototype,{
    defaults:{
      toggle: "[data-collapsable-toggle]",
      content: "[data-collapsable-content]",
      expandedClass: "tct-collapsable--expanded",
      collapsedClass: "tct-collapsable--collapsed",
      contentClass: "tct-collapsable__content"
    },
    init:function() {
      this.setClasses();
      this.notify();
      this.triggers.on('click',this.onToggle);
    },
    setClasses: function(){
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
      this.changeState(false);
    },
    expand: function() {
      this.changeState(true);
    },
    changeState: function(state){
      this.expanded = state;
      this.setClasses();
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

  $.fn.collapsable = function(options){
    return $(this).each(function(){
      var self = $(this);
      if(!self.data("collapsable")){
        self.data("collapsable", new Collapsable(this, options));
      }
    });

  };

  return Collapsable;
})();