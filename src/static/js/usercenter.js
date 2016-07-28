$('.aside-nav .item').hover(function(){
	if($(this).is(':last-child')) return;
	$(this).addClass('active').siblings('.item').removeClass('active')
})

var oTool = $('.fav-tools-list'),
	oFavList = $('.fav-list'),
	oFavListItem = $('.fav-list .item'),
	oManageBtn = $('#J_manage');
$('body')
	.on('click','#J_cancel_manage', function(){
		oTool.hide();
		oFavList.removeClass('editor-item');
		oManageBtn.show()
	})
	.on('click','#J_all_select', function(){
		$(this).is(':checked')?oFavListItem.addClass('active'):oFavListItem.removeClass('active')
	});
	
	oManageBtn.on('click', function(){
		oTool.show();
		oFavList.addClass('editor-item');
		oManageBtn.hide()
	});
	oFavListItem.on('click', function(){
		var that = $(this);
		that.hasClass('active')?that.removeClass('active'):that.addClass('active');
	})
	$('.fav-list .ift-del').on('click',function(e){
		e.stopPropagation();
		$(this).parents('.item').remove();
	})
	$('#J_del_item').on('click',function(e){
		oFavListItem.each(function(){
			var that = $(this);
			if(that.hasClass('active')) that.remove();
		})
	})


