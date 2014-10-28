describe("Sticky", function(){
  it("should be a singleton", function(){
    expect(TCT.Sticky.instance()).toBe(TCT.Sticky._instance);
  }); 
  it("should fail when calling new TCT.Sticky()", function(){
    expect(function(){
      new TCT.Sticky()
    }).toThrow(new Error("TCT.Sticky is a singleton. Please use TCT.Sticky.instance()"));
  }); 
});