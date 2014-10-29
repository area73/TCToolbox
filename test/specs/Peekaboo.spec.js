describe("TCT.Peekaboo", function(){
  console.log("If running in browser, this tests should be ran within a 800x500 window")
  PeekabooHelpers.testHTML();  

  it("should be a singleton", function(){
    expect(TCT.Peekaboo.instance())
      .toBe(TCT.Peekaboo.instance());
  });

  it("should fail when calling new TCT.Peekaboo()", function(){
    expect(function(){
      new TCT.Peekaboo()
    }).toThrow(new Error("TCT.Peekaboo is a singleton. Please use TCT.Peekaboo.instance()"));
  });

  describe("instance method", function(){
    var instance = TCT.Peekaboo.instance();

    describe("register_element", function(){
      it("should give each element an uid", function(){
        var element = $("[data-peekaboo-block]:nth(0)")
        instance.register_element(element);
        expect(element.data("peekaboo_id")).toBeDefined();
        var el = $("[data-peekaboo-block]:nth(1)");
        instance.register_element(el);
        expect(element.data("peekaboo_id")).not.toEqual(el.data("peekaboo_id"));
      });
      it("should create a PeekabooElement", function(){
        var element = $("[data-peekaboo-block]:nth(0)"),
            uid = element.data("peekaboo_id");
        expect(_(instance.elements).where({uid: uid}))
          .toBeDefined();
      })
    })

    describe("measure", function(){
      it("should measure the viewport", function(){
        // Window height is configured at Gruntfile
        instance.measure();
        expect(instance.viewport_height).toBe($(window).height());
      })
      it("should measure the document", function(){
        // Window height is configured at Gruntfile
        instance.measure();
        expect(instance.document_height).toBe($(document).height() - $(window).height());
      })
    })
  })

  describe("when starting", function(){
    it("should trigger events for visible elements", function(){
      spyOnEvent("[data-peekaboo-block]:nth(0)", "peekaboo_state_change")
      spyOnEvent("[data-peekaboo-block]:nth(1)", "peekaboo_state_change")
      $("[data-peekaboo-block]").peekaboo();
      TCT.Peekaboo.start();  
      expect("peekaboo_state_change")
        .toHaveBeenTriggeredOn("[data-peekaboo-block]:nth(0)");
      expect("peekaboo_state_change")
        .toHaveBeenTriggeredOn("[data-peekaboo-block]:nth(1)");
      TCT.Peekaboo.stop();  
    })
    it("should trigger events for visible elements with the right state", function(done){
      $("[data-peekaboo-block]:nth(1)").peekaboo().on("peekaboo_state_change", function(e){
        expect(e.state).toBe("visible")
        expect(e.direction).toBe("none")
        expect(e.scroll).toBe(0)
        $("[data-peekaboo-block]:nth(1)").off("peekaboo_state_change");
        done()
      });
      TCT.Peekaboo.start();  
      TCT.Peekaboo.stop();  
    })
    it("should not trigger events for not visible elements", function(){
      spyOnEvent("[data-peekaboo-block]:nth(2)", "peekaboo_state_change")
      $("[data-peekaboo-block]").peekaboo();
      TCT.Peekaboo.start();  
      expect("peekaboo_state_change")
        .not
          .toHaveBeenTriggeredOn("[data-peekaboo-block]:nth(2)");
      TCT.Peekaboo.stop();  
    })
  });

  describe("while running", function(){
    beforeEach(function(done){
      _.defer(function(){
        window.scrollTo(0, 0);
        TCT.Peekaboo.start();
        done();
      }) 
    });

    afterEach(function(){
      $("[data-peekaboo-block]").off("peekaboo_state_change")
      TCT.Peekaboo.stop(); 
    });

    it("should trigger events for visible elements when going down", function(done){
      spyOnEvent("[data-peekaboo-block]:nth(2)", "peekaboo_state_change")
      $("[data-peekaboo-block]:nth(2)").peekaboo().on("peekaboo_state_change", function(e){
        expect(e.state).toBe("visible");
        expect(e.direction).toBe("down");
        expect(e.scroll).toBe(600);
        done();
      });
      _.defer(function(){
        window.scrollTo(0, 600);
      })
    });

    it("should trigger events for visible elements when going up", function(done){
      _.defer(function(){
        window.scrollTo(0, 600);
        _.delay(function(){
          $("[data-peekaboo-block]:nth(0)").peekaboo().on("peekaboo_state_change", function(e){
            expect(e.state).toBe("visible");
            expect(e.direction).toBe("up");
            expect(e.scroll).toBe(100);
            expect(e.prev_scroll).toBe(600);
            done();
          });
          window.scrollTo(0, 100);    
        }, 1000)
      })
    })

    it("should trigger events for hidden elements when going down", function(done){
      $("[data-peekaboo-block]:nth(0)").peekaboo().on("peekaboo_state_change", function(e){
        expect(e.state).toBe("hidden");
        expect(e.direction).toBe("down");
        expect(e.scroll).toBe(600);
        expect(e.prev_scroll).toBe(0);
        done();
      });
      _.delay(function(){
        window.scrollTo(0, 600);
      }, 1000)
    })

    it("should trigger events for hidden elements when going up", function(done){
      _.defer(function(){
        window.scrollTo(0, 600);
        _.delay(function(){
          $("[data-peekaboo-block]:nth(2)").peekaboo().on("peekaboo_state_change", function(e){
            expect(e.state).toBe("hidden");
            expect(e.direction).toBe("up");
            expect(e.scroll).toBe(100);
            expect(e.prev_scroll).toBe(600);
            done();
          });
          window.scrollTo(0, 100);
        }, 1000)
      });      
    })
  });
    
});