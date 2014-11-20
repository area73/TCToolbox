if(!this.TCT) this.TCT = {};
this.TCT.Rater = (function(){
  var Rater = function(element, options){
    _.bindAll(this, "onMouseMove", "onMouseUp", "onTouchEnd", "onMouseDown", "onTouchStart"); //"onMouseDown"
    this.element = element;
    this.options = $.extend({}, this.defaults, options);
    this.inputs = this.element.find("input[type=radio]");
    this.stars = this.inputs.length;
    this.snapTo = Math.round(100/this.stars);
    this.init();
  };

  $.extend(Rater.prototype, {
    defaults:{
      wrapperClass: "rater__wrapper",
      starsClass: "rater__stars"
    },
    init: function(){
      this.prepare();
      var checked;
      if((checked = this.inputs.filter(":checked")).length){
        var index = _(this.inputs).indexOf(checked.get(0)) + 1;
        this.setOverlayPercent((100/this.inputs.length)*index);
      };
      this.element.on("touchstart", this.onTouchStart);
      this.element.on("mousedown", this.onMouseDown);
      this.element.on("click", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
      });
      this.element.on("tap", this.onTouchEnd);
    },
    prepare: function(){
      this.element.wrapInner("<div class='"+this.options.wrapperClass+"'></div>");
      this.overlay = $("<div class='"+this.options.starsClass+"'></div>");
      this.element.append(this.overlay);
    },
    onTouchStart: function(){
      this.touch = true; // Set this.touches to true
    },
    onMouseDown: function(e){
      if(!this.touch){ // If a touch event didn't initizlized the events
        // Do the mouse tracking
        var percent = this.updatePercent(e.pageX);
        this.trackMouseEvents();
      }else{ // Otherwise, do nothing and reset this.touch
        this.touch = false;
      }
    },
    onTouchEnd: function(e){
      var percent = this.updatePercent(e.pageX);
      this.setPercent(percent);
    },
    updatePercent: function(pageX){
      var percent = this.getPercent(pageX);
      this.setOverlayPercent(percent);
      return percent;
    },
    trackMouseEvents: function(){
      $("body").on("mousemove.rater_body_events", this.onMouseMove)
               .on("mouseup.rater_body_events", this.onMouseUp);
    },
    onMouseMove: function(e){
      var percent = this.getPercent(e.pageX);
      this.setOverlayPercent(percent);
    },
    onMouseUp: function(e){
      $("body").off(".rater_body_events");
      var percent = this.getPercent(e.pageX);
      this.setOverlayPercent(percent);
      this.setPercent(percent);
    },
    getPercent: function(pageX){
      var left = this.element.offset().left,
          width = this.element.width(),
          offsetX = pageX - left,
          percent = 0;

      if(offsetX >= 0){
        if(offsetX > width) offsetX = width;
        percent = this.snapPercent(Math.round((offsetX/width)*100));
      }

      return percent;
    },
    snapPercent: function(percent) {
      return Math.ceil(percent / this.snapTo) * this.snapTo;
    },
    setOverlayPercent: function(percent){
      this.overlay.css("width", percent+"%");
    },
    setPercent: function(percent){
      var index = (percent/this.snapTo) - 1;
      if(index < 0){
        this.inputs.filter(":checked").prop("checked", false);
      }else{
        this.inputs.eq(index).prop("checked", true);
      }
    }
  });

  $.fn.rater = function(options){
    return this.each(function(){
      var self = $(this);
      if(!self.data("rater"))
        self.data("rater", new Rater(self, options));
      return self.data("rater");
    });
  };

  return Rater;
})();