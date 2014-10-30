describe("Collapsable", function(){
  
  var element;
  
  beforeEach(function(){
    element = CollapsableHelpers.createTestElement();
  });

  afterEach(function(){
    element.remove();
  })

  it("should set the content class", function(){
    expect(element.find("[data-collapsable-content]"))
      .toBeMatchedBy(".tct-collapsable__content")
  });

  it("should start collapsed", function(){
    expect(element.find("[data-collapsable-content]").height())
      .toBe(0)
    expect(element)
      .toBeMatchedBy(".tct-collapsable--collapsed")
    expect(element).not
      .toBeMatchedBy(".tct-collapsable--expanded")
  });

  describe("expanded", function(){
    beforeEach(function(){
      element.find("[data-collapsable-toggle]").trigger("click");
    })
    it("should expand when clicking on [data-collapsable-toggle]", function(){
      expect(element.find("[data-collapsable-content]").height())
        .toBe(500)
    });

    it("should have the expanded class", function(){
      expect(element)
        .toBeMatchedBy(".tct-collapsable--expanded")
      expect(element).not
        .toBeMatchedBy(".tct-collapsable--collapsed")
    })
  })

  describe("collapsed", function(){
    beforeEach(function(done){
      element.find("[data-collapsable-toggle]").trigger("click");
      _.defer(function(){
        element.find("[data-collapsable-toggle]").trigger("click");
        done();
      })
    })
    it("should expand when clicking on [data-collapsable-toggle]", function(){
      expect(element.find("[data-collapsable-content]").height())
        .toBe(0)
    });

    it("should have the collapsed class", function(){
      expect(element)
        .toBeMatchedBy(".tct-collapsable--collapsed")
      expect(element).not
        .toBeMatchedBy(".tct-collapsable--expanded")
    })
  });

  it("should toggle between states", function(done){
    element.find("[data-collapsable-toggle]").trigger("click");
    _.defer(function(){
      expect(element)
        .toBeMatchedBy(".tct-collapsable--expanded")
      element.find("[data-collapsable-toggle]").trigger("click");
      _.defer(function(){
        expect(element)
          .toBeMatchedBy(".tct-collapsable--collapsed")
        done();  
      })
      
    })
  }) 

});