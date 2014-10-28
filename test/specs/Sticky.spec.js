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
    it("should fire the onScroll callback when scrolling", function(done){
      spyOn(instance, "onScroll").and.callThrough();
      instance.start();
      window.scrollTo(0, 100)
      setTimeout(function(){        
        expect(instance.onScroll).toHaveBeenCalled();
        instance.stop();
        done();
      }, 100);
    })
    it("should fire the onResize callback when resizing the page", function(done){
      spyOn(instance, "onResize").and.callThrough();
      instance.start();
      $(window).trigger("resize")
      setTimeout(function(){        
        expect(instance.onResize).toHaveBeenCalled();
        instance.stop();
        done();
      }, 100);
    })
  });
  describe("when not running", function(){
    it("should fire the onScroll callback when scrolling", function(){
      spyOn(instance, "onScroll").and.callThrough();
      window.scrollTo(0, 100)
      expect(instance.onScroll).not.toHaveBeenCalled();
    })
    it("should fire the onResize callback when resizing the page", function(){
      spyOn(instance, "onResize").and.callThrough();
      $(window).trigger("resize")
      expect(instance.onResize).not.toHaveBeenCalled();
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
    it("should stick the elements while scrolling", function(done){
      window.scrollTo(0, 0)
      spyOnEvent("[data-sticky-block]:nth(1)", "sticked");
      spyOnEvent("[data-sticky-block]:nth(2)", "sticked")
      TCT.Sticky.instance().start();
      expect("sticked").not.toHaveBeenTriggeredOn("[data-sticky-block]:nth(1)");
      window.scrollTo(0, 200)
      _.delay(function(){
        expect("sticked").toHaveBeenTriggeredOn("[data-sticky-block]:nth(1)");  
        expect("sticked").not.toHaveBeenTriggeredOn("[data-sticky-block]:nth(2)");
        window.scrollTo(0, 600);
        _.delay(function(){
          expect("sticked").toHaveBeenTriggeredOn("[data-sticky-block]:nth(2)");
          done()  
        })        
      })      
    })
    it("should unstick the elements while scrolling", function(done){
      window.scrollTo(0, 600)
      spyOnEvent("[data-sticky-block]:nth(1)", "unsticked");
      spyOnEvent("[data-sticky-block]:nth(2)", "unsticked");
      TCT.Sticky.instance().start();
      expect("unsticked").not.toHaveBeenTriggeredOn("[data-sticky-block]:nth(2)");
      window.scrollTo(0, 599)
      _.delay(function(){
        expect("unsticked").toHaveBeenTriggeredOn("[data-sticky-block]:nth(2)");  
        expect("unsticked").not.toHaveBeenTriggeredOn("[data-sticky-block]:nth(1)");
        window.scrollTo(0, 199);
        _.delay(function(){
          expect("unsticked").toHaveBeenTriggeredOn("[data-sticky-block]:nth(2)");
          done()  
        })        
      })      
    })
  });

  describe("when registering", function(){
    it("should be able to assign the 'top' property through options", function(done){
      window.scrollTo(0, 600)
      var div = StickyHelpers.createTestDiv(200,200);
      div.attr("id", "newly-registered-div")
      spyOnEvent("#newly-registered-div", "sticked")
      StickyHelpers.container.append(div);
      TCT.Sticky.instance().register(div, {
        top: 200
      });
      window.scrollTo(0,200);
      _.delay(function(){
        expect("sticked").toHaveBeenTriggeredOn("#newly-registered-div");  
        done();
      })
    })

    it("should be able to assign the 'top' property as a function through options", function(done){
      window.scrollTo(0, 600)
      var div = StickyHelpers.createTestDiv(200,200);
      div.attr("id", "newly-registered-div-2")
      spyOnEvent("#newly-registered-div-2", "sticked")
      StickyHelpers.container.append(div);
      TCT.Sticky.instance().register(div, {
        top: function(){
          return 500;
        }
      });
      window.scrollTo(0,500);
      _.delay(function(){
        expect("sticked").toHaveBeenTriggeredOn("#newly-registered-div-2");  
        done();
      })
    })
  })
});