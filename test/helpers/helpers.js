// Write your test helpers here
var StickyHelpers = {
  _testContainer: function(){
    this.container = $("<div id='sticky-test-html'>");
    this.container.prependTo("body");
  },
  _testDiv: function(w, h){
    this.container.append("<div data-sticky-block "+
                                "style='width:"+w+"px; height:"+h+"px; margin:0 auto;"+
                                       "background-color: #ccc; color:#969696;"+
                                       "line-height:"+h+"px; text-align: center;"+
                                       "font-size: 20px; font-weight:bold;"+
                                       "font-family:Arial, Helvetica, sans-serif;'>"+
      w+"x"+h+
    "</div>")
  },
  testHTML: function(){
    $("body, html").css({
      margin: 0,
      padding: 0
    })
    this._testContainer();
    this._testDiv(400,200);
    this._testDiv(400,400);
    this._testDiv(400,600);
    this._testDiv(400,300);
    this._testDiv(400,500);
  }
  
}