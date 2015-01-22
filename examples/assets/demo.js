$(function(){
	$(".collapsable").collapsable({
		animated: true,
    goToLink: true
	});	

  $(".collapsable_mouseover").collapsable({
    animated: true,
    triggerWith: "hover"
  })
});
