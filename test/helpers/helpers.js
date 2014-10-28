// Write your test helpers here
var StickyHelpers = {
  _testContainer: function(){
    this.container = $("<div id='sticky-test-html'>");
    this.container.prependTo("body");
  },
  createTestDiv: function(w, h){
    var div = $("<div data-sticky-block "+
                                "style='width:"+w+"px; height:"+h+"px; margin:0 auto;"+
                                       "background-color: #ccc; color:#969696;"+
                                       "line-height:"+h+"px; text-align: center;"+
                                       "font-size: 20px; font-weight:bold;"+
                                       "font-family:Arial, Helvetica, sans-serif;'>"+
      w+"x"+h+
    "</div>");
    this.container.append(div)
    return div;
  },
  testHTML: function(){
    $("body, html").css({
      margin: 0,
      padding: 0
    })
    this._testContainer();
    this.createTestDiv(400,200);
    this.createTestDiv(400,400);
    this.createTestDiv(400,600);
    this.createTestDiv(400,300);
    this.createTestDiv(400,500);
  }
  
}