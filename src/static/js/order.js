$('.payment-list>.item').on('click',function(){
	$(this).addClass('active').siblings('.item').removeClass('active');
})