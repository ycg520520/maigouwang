$('.aside-nav .item').hover(function(){
	if($(this).is(':last-child')) return;
	$(this).addClass('active').siblings('.item').removeClass('active')
})