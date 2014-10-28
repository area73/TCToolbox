describe("Sticky", function(){
  StickyHelpers.testHTML();
  $("[data-sticky-block]").each(function(){
    TCT.Sticky.instance()
      .register($(this))
  })
  var instance = TCT.Sticky.instance();
  it("should be a singleton", function(){
    expect(instance).toBe(TCT.Sticky._instance);
  }); 
  it("should fail when calling new TCT.Sticky()", function(){
    expect(function(){
      new TCT.Sticky()
    }).toThrow(new Error("TCT.Sticky is a singleton. Please use TCT.Sticky.instance()"));
  });
  describe("when running", function(){
    it("should fire the on_scroll callback when scrolling", function(done){
      spyOn(instance, "on_scroll").and.callThrough();
      instance.start();
      window.scrollTo(0, 100)
      setTimeout(function(){        
        expect(instance.on_scroll).toHaveBeenCalled();
        instance.stop();
        done();
      }, 100);
    })
    it("should fire the on_resize callback when resizing the page", function(done){
      spyOn(instance, "on_resize").and.callThrough();
      instance.start();
      $(window).trigger("resize")
      setTimeout(function(){        
        expect(instance.on_resize).toHaveBeenCalled();
        instance.stop();
        done();
      }, 100);
    })
  });
  describe("when not running", function(){
    it("should fire the on_scroll callback when scrolling", function(){
      spyOn(instance, "on_scroll").and.callThrough();
      window.scrollTo(0, 100)
      expect(instance.on_scroll).not.toHaveBeenCalled();
    })
    it("should fire the on_resize callback when resizing the page", function(){
      spyOn(instance, "on_resize").and.callThrough();
      $(window).trigger("resize")
      expect(instance.on_resize).not.toHaveBeenCalled();
    })
  });
  describe("when starting", function(){
    beforeEach(function(done){
      setTimeout(function(){
        window.scrollTo(0, 201)
        done();
      },100)
    })
    it("should trigger a 'sticked' for all sticked elements", function(){
      spyOnEvent("[data-sticky-block]:nth(0)", "sticked")
      spyOnEvent("[data-sticky-block]:nth(1)", "sticked")
      TCT.Sticky.instance().start();
      expect("sticked").toHaveBeenTriggeredOn("[data-sticky-block]:nth(0)");
      expect("sticked").toHaveBeenTriggeredOn("[data-sticky-block]:nth(1)");
      TCT.Sticky.instance().stop();
    });
    it("should not trigger a 'sticked' for not sticked elements", function(){
      spyOnEvent("[data-sticky-block]:nth(2)", "sticked")
      spyOnEvent("[data-sticky-block]:nth(3)", "sticked")
      TCT.Sticky.instance().start();
      expect("sticked").not.toHaveBeenTriggeredOn("[data-sticky-block]:nth(2)");
      expect("sticked").not.toHaveBeenTriggeredOn("[data-sticky-block]:nth(3)");
      TCT.Sticky.instance().stop(); 
    });
  });
  describe("when running", function(){

  })
});