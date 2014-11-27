//= require_self
//= require partials/CollapsableAnimated
//= require partials/$.fn.collapsable.js
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
      if(this.options.animated){
        $(window).on("resize", _.debounce(this.recalculateHeight, 100));
      }
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
      this.changeState(true);
    },
    changeState: function(state){
      this.expanded = state;
      this.setElementClasses();
      this.notify();
    },
    onToggle:function(e){
      e.preventDefault();

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

      if(this.expanded){
        this.collapse();
      }else{
        this.expand();
      }
    }
  });
  return Collapsable;
})();