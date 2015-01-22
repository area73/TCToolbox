$(function(){
	$(".collapsable").collapsable({
		animated: true,
    goToLink: true,
    offset: 20
	});	

  $(".collapsable_mouseover").collapsable({
    animated: true,
    triggerWith: "hover"
  })
});
