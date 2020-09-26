

jQuery(document).ready(function($){
  var totalSections;
  var positionMarkers = [0];
  var grabber = $('.number');
  var currentIndex = 1;
  var isDragging = false; 
  var hideTrack = 1;

  $('#fp-container').fullpage({
    scrollOverflow: true,
    scrollingSpeed: 600,
    anchors: ['home', 'intro', '06H00', '07H00', '11H00', '12H00', '16H00', '18H00', '20H00', '22H00', 'end'],
    menu: '#menu-adm', 
    slidesNavigation: true, 
    onLeave: function(index, nextIndex, direction){
      currentIndex = nextIndex;
      $('.current').html(currentIndex);
      var currentMultiplier = currentIndex - 1;
      if (isDragging){
        isDragging = false
      } else {
        var container = grabber.parent();
        var containerheight = container.innerHeight();
        var denominator =  totalSections / currentMultiplier;
        var moveTop = (containerheight - 40 - grabber.height() ) * currentMultiplier / (totalSections -1) ;
        moveTop = parseInt(moveTop);
        $('.number').css({
          'top' : (moveTop) + 'px'
        });
      } 
      if(currentIndex == 1) {
           $('.section-track').css({
            'opacity': '0',
            'z-index': '-1'
          });
          $('#menu-adm, .section-track').removeClass('active');
      }
      if(currentIndex == 2) {
           $('.section-track').css({
            'opacity': '0',
            'z-index': '-1'
          });
           $('#menu-adm, .section-track').removeClass('active');
      }
      if(currentIndex == 3) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-3').removeClass('number-4 number-5 number-6 number-7 number-8 number-9 number-10');
           $('#menu-adm, .section-track').addClass('active');
      }
      if(currentIndex == 4) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-4').removeClass('number-5 number-3 number-6 number-7 number-8 number-9 number-10');
           $('#menu-adm, .section-track').addClass('active');
      }
      if(currentIndex == 5) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-5').removeClass('number-6 number-4 number-7 number-8 number-9 number-10 number-3');
           $('#menu-adm, .section-track').addClass('active');
      }
      if(currentIndex == 6) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-6').removeClass('number-7 number-5 number-4 number-3 number-8 number-9 number-10');
           $('#menu-adm, .section-track').addClass('active');
      }
      if(currentIndex == 7) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-7').removeClass('number-8 number-6 number-3 number-4 number-5 number-9 number-10');
           $('#menu-adm, .section-track').addClass('active');
      }
      if(currentIndex == 8) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-8').removeClass('number-9 number-7 number-3 number-4 number-5 number-6 number-10');
           $('#menu-adm').removeClass('active');
           $('.section-track').addClass('active');
      }
      if(currentIndex == 9) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-9').removeClass('number-8 number-10 number-3 number-4 number-5 number-6 number-7');
           $('#menu-adm').removeClass('active');
           $('.section-track').addClass('active');
      }
      if(currentIndex == 10) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-10').removeClass('number-9 number-3 number-4 number-5 number-6 number-7 number-8');
           $('#menu-adm').removeClass('active');
           $('.section-track').addClass('active');
      }
      if(currentIndex == 11) {
           $('.section-track').css({
            'opacity': '0',
            'z-index': '-1'
          });
           $('.adm_emag .number').removeClass('number-9 number-3 number-4 number-5 number-6 number-7 number-8 number-10');
           $('#menu-adm').removeClass('active');
           $('.section-track').addClass('active');
      }
    }
  });

  $( grabber ).draggable({ 
    axis: "y", 
    containment: ".track",
  });

  var clicked = false;
  var currentPos = document.getElementsByClassName('number')[0].offsetTop;
  var body = document.body, html = document.documentElement;

  window.heightfull = Math.max( body.offsetHeight, html.clientHeight, html.offsetHeight );
  $(grabber).on({
    'mousemove': function(e) {
      clicked && updateScrollPos(e);
    },
    'mousedown': function(e) {
      clicked = true;
      grabber.addClass('in-drag');
      grabber.removeClass('number-active');
      $('.track').addClass('active');

    },
    'mouseup': function() {
      clicked = false;
      grabber.removeClass('in-drag');
      $('.track').removeClass('active');
    },
  })
  $(window).on({
    'mousemove': function(e) {
      if(clicked == true) {
        clicked && updateScrollPos(e);
      }
    },
    'mouseup': function() {
      clicked = false;
      grabber.removeClass('in-drag');
      $('.track').removeClass('active');
      var correctSlidePosition;
      for(i = 0; i < positionMarkers.length; i++) {
        if(grabber.position().top >= positionMarkers[i]){
          correctSlidePosition = positionMarkers[i]; 
        }
      }
      $('.number').css({
        'top' : 'calc(50% - 144px)'
      }); 
       checkScroll = false;

    }
  })
  window.checkScroll = false;
  var updateScrollPos = function(e) {
    var sliderpos = grabber.position();
    var currentSlideIndex;
    var updateHeight = parseInt(document.getElementsByClassName('number')[0].offsetTop);
    if(updateHeight <= (heightfull *0.2)&&checkScroll==false) {
      $.fn.fullpage.moveSectionUp();
      checkScroll = true;
    } 
    if(updateHeight >= (heightfull *0.5)&&checkScroll==false) {
      $.fn.fullpage.moveSectionDown();
      checkScroll = true;
    }
  }
 
  $(document).on('wheel', function (e) {
      $('.number').css({
        'top' : 'calc(50% - 144px)'
      });
  })

  $('.slider-for').slick({
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.slider-nav',
  });
  $('.slider-nav').slick({
      autoplay:false,
      arrow:false,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for', 
      dots: false,
      focusOnSelect: true,
      prevArrow: '<a href=""javascript:void(0)" class="prev"></a>',
      nextArrow: '<a href=""javascript:void(0)" class="next"></a>',
  });

  $('#menu-adm a').click(function(event) {
    $('.number').css({
        'top' : 'calc(50% - 144px)'
      }); 
    $('.number').click();
  });

  if ($('.section-1').hasClass('active')) {
    $('.section-track').css({
      'opacity': '0',
      'z-index': '-1'
    });
  } else {
    $('.section-track').css({
      'opacity': '1',
      'z-index': '4'
    });
  }

  $('.hver-ripper').ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.04,
  }); 


  var rect = $('.section')[0].getBoundingClientRect();
  var mouse = {x: 0, y: 0, moved: false};
  $(".desc-thumbs, .caption, .bg-eff-2, .section-1, .section-end").mousemove(function(e) {
    mouse.moved = true;
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top; 
  });
  TweenLite.ticker.addEventListener('tick', function(){
    if (mouse.moved){    
      parallaxIt(".desc-thumbs, .caption, .bg-eff-2, .section-1, .section-end img", -35); 
      parallaxIt(".section-end .leff", -15); 
      // parallaxIt(".section-1", -30); 
      // parallaxIt(".section-2", -30); 
    } 
    mouse.moved = false;
  });
  function parallaxIt(target, movement) {
    TweenMax.to(target, 1, {
      x: (mouse.x - rect.width / 2) / rect.width * movement,
      y: (mouse.y - rect.height / 2) / rect.height * movement
    });
  }
  $(window).on('resize scroll', function(){
    rect = $('.desc-thumbs, .caption, .bg-eff, .section-1, .section-end')[0].getBoundingClientRect();
  })

});
  
