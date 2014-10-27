describe("TCT.Peekaboo", function(){
  it("should be a singleton", function(){
    expect(TCT.Peekaboo.instance())
      .toBe(TCT.Peekaboo.instance());
  });

  it("should fail when calling new TCT.Peekaboo()", function(){
    expect(function(){
      new TCT.Peekaboo()
    }).toThrow(new Error("TCT.Peekaboo is a singleton. Please use TCT.Peekaboo.instance()"));
  });

  describe("class methods", function(){
    describe("run", function(){
      it("should run the current instance", function(){
        var instance = TCT.Peekaboo.instance();
        spyOn(instance, "run");
        TCT.Peekaboo.run();
        expect(instance.run).toHaveBeenCalled();
      })
    })
  })

  describe("instance method", function(){
    var element = $("<p></p>"),
        instance = TCT.Peekaboo.instance();
    beforeEach(function(){
      $("body").append(element)
      $("html").css("height", "5000px")
    })
    afterEach(function(){
      element.remove();
      $("html").css("height", "auto")
    })

    describe("register_element", function(){
      it("should give each element an uid", function(){
        instance.register_element(element);
        expect(element.data("peekaboo_id")).toBeDefined();

        var el = $("<p></p>");
        instance.register_element(element);

        expect(element.data("peekaboo_id")).not.toEqual(el.data("peekaboo_id"));
      });
      it("should create a PeekabooElement", function(){
        var uid = element.data("peekaboo_id");
        instance.register_element(element);
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

    
});