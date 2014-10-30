var CollapsableHelpers = {
  createTestContainer: function(){
    this.container = $("<div id='collapsable-test-html'>");
    this.container.prependTo("body");
  },
  createCollapsable: function(h){
    var div = $("<div data-collapsable> "+
                    "<a href='#' data-collapsable-toggle>Toggle</a>"+
                    "<div data-collapsable-content>"+
                      "<div style='height:"+h+"px; margin:0 auto;"+
                            "background-color: #ccc; color:#969696;"+
                            "line-height:"+h+"px; text-align: center;"+
                            "font-size: 20px; font-weight:bold;"+
                            "font-family:Arial, Helvetica, sans-serif;'></div>"+
                    "</div>"+
                "</div>");
    this.container.append(div)
    return div;
  },
  createTestElement: function(h){
    if(!h) h = 500;
    if(!$("#collapsable-test-html").length) this.createTestContainer()
    return this.createCollapsable(h).collapsable();
  }
  
}