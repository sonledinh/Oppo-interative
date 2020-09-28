jQuery(function($) {
  var doAnimations = function() {
    var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $('.box-wapper p, .title-banner, .btn-k14, .desc p, .title-clock h3, .clock-time');
    if ($animatables.length == 0) {
      $(window).off('scroll', doAnimations);
    } 
    $animatables.each(function(i) {
       var $animatable = $(this);
      if (($animatable.offset().top + $animatable.height() - 20) < offset) {
            $animatable.addClass('animated');
      }
    });
  };
  $(window).on('scroll', doAnimations);
  $(window).trigger('scroll');
}); 

$('.slide-wpper').slick({
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: '<button class="prev"></button>',
  nextArrow: '<button class="next"></button>',
});