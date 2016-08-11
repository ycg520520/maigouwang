'use strict';
require('./plugins/jquery');
require('./plugins/swiper');
require('./plugins/layer/layer');
require('./models/common');

new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  nextButton: '.ift-next',
  prevButton: '.ift-prev',
  // slidesPerView: 1,
  paginationClickable: true,
  // spaceBetween: 0,
  loop: true
});

$('.classify').addClass('index');

/**
 * 图片展示效果
 * 1、当鼠标滑到当前元素上时 从下往上显示信息内容
 * 2、当鼠标从当前元素上滑倒同辈元素上时：
 * 	1)、鼠标方向判断：
 * 		a、获取到当前元素position.left
 * 		b、获取到当前元素position.top
 * 		c、获取到当前元素width
 * 		d、获取到当前元素height
 * 		e、通过上面则可获取到当前元素的鼠标区间
 *             top
 *            ------
 *       left |    | right
 *            ------
 *            bootom
 *    如果小于top,则上方，小于left则左方，大于right则右方，大于bottom则下方
 * 		
 * 	2)、鼠标移动方向展示内容同时在两个元素切换内容追加展示内容：
 * 		a、在滑出元素（即老的当前元素）上方  * 则从下往上隐藏内容，而新进入的元素（更改后的当前元素）则从下往上显示内容；
 * 		b、在滑出元素（即老的当前元素）下方  * 则从上往下隐藏内容，而新进入的元素（更改后的当前元素）则从上往下显示内容；
 * 		c、在滑出元素（即老的当前元素）左方  * 则从右往左隐藏内容，而新进入的元素（更改后的当前元素）则从右往左显示内容；
 * 		c、在滑出元素（即老的当前元素）右方 则从左往右隐藏内容，而新进入的元素（更改后的当前元素）则从左往右显示内容；
*/




