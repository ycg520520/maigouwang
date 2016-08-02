new Swiper('#J_hotCommend', {
  pagination: '.swiper-pagination',
  nextButton: '.ift-next',
  prevButton: '.ift-prev',
  slidesPerView: 4,
  paginationClickable: true,
  spaceBetween: '4%',
  autoHeight: true,
  loop: true
});

new Swiper('.scroller', {
  scrollbar:'.swiper-scrollbar',
  direction: 'vertical',
  slidesPerView: 'auto',
  mousewheelControl: true,
  scrollbarHide:false,
  freeMode: true,
  resistanceRatio:0
});

$('body')
  .on('click','.condition a', function(e){
    e.stopPropagation();
    return false;
  })
  .on('click', '#J_clearFilter', function(){
    $('.condition').html('')
  })
  .on('click','.ift-close', function(e){
    e.stopPropagation();
    var _this = $(this);
    _this.parents('a').remove();
    return false;
  })
  // 自定义价格操作
  .on('click','#submit_price', function(){
    var minPrice = $.trim($('#min_price').val()),
        maxPrice = $.trim($('#max_price').val()),
        priceFilter = $('.price-interval').siblings('.attr-val-list').find('a')
        reg = /^[1-9]\d*\.?\d*$|^0\.\d*$/;
    if(!reg.test(minPrice) || !reg.test(maxPrice)){
      console.log('输入错误，必须是有效的数字。')
      return;
    }
    console.log(minPrice, maxPrice)
    if(Number(minPrice)>Number(maxPrice)){
      console.log('起始区间数必须大于结束区间数。')
      return;
    }
    priceFilter.removeClass('active');
    
  });

// 条件筛选操作
$('.attr-val-list a').on('click',function(e){
  e.stopPropagation();
  var _this = $(this),
      text = _this.text(),
      typeText = _this.parents('.attr-row').find('.attr-key').text(),
      reg = new RegExp(typeText),
      conditionList = $('.condition a');  
  
  _this.addClass('active').siblings('a').removeClass('active');

  // 判断筛选条件区域是否存在，存在就做替换操作，不存在就追加
  if(reg.test(conditionList.find('span').text())){
    conditionList.each(function(){
      var _curThis = $(this);
      if(_curThis.find('span').text() === typeText){
        if(text !== "全部")
          _curThis.find('strong').html(text);
        else
          _curThis.remove();
      }
    })
  }else{
    $('.condition').append('<a href="javascript:;"><span>'+typeText+'</span><strong>'+text+'</strong><i class="ift-close"></i></a>')
  }

  return false;
})



