describe("CollapsableAnimated", function(){
  var element;
  
  beforeEach(function(){
    element = CollapsableHelpers.createTestElement(500, {
      animated: true
    });
  });

  afterEach(function(){
    element.remove();
  })

  it("should use CollapsableAnimated class", function(){
    expect(element.data("collapsable") instanceof TCT.CollapsableAnimated).toBe(true);
  })

  it("should have the collapsable animation class", function(){
    expect(element.find("[data-collapsable-content]")).toBeMatchedBy(".tct-collapsable__content--animated");
  })

  it("should fire a transitionend evente if the browser supports it", function(done){
    var collapsable = element.data("collapsable");
    collapsable.onTransitionEnd = function(){
      expect(collapsable.onTransitionEnd).toHaveBeenCalled();
      element.off("webkitTransitionEnd")
      done();
    };
    spyOn(collapsable, "onTransitionEnd").and.callThrough();
    element.on("webkitTransitionEnd", collapsable.onTransitionEnd);
    collapsable.expand();
  });

  it("should calculate the right height", function(done){
    var content = element.find("[data-collapsable-content]");
    expect(content.css("height")).toBe("0px");
    element.data("collapsable").expand();
    _.delay(function(){
      expect(content.css("height")).toBe("500px");  
      done();
    }, 1000)    
  })

  it("should set the height to 0 when collapsing", function(done){
    var collapsable = element.data("collapsable");
    var content = element.find("[data-collapsable-content]");
    collapsable.onTransitionEnd = function(){
      expect(content.css("height")).toBe("500px");
      element.off("webkitTransitionEnd")
      collapsable.collapse();
      _.delay(function(){
        expect(content.css("height")).toBe("0px");  
        done();
      }, 1000)        
    };
    element.on("webkitTransitionEnd", collapsable.onTransitionEnd);
    collapsable.expand();
  });

});