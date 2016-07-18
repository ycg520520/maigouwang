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