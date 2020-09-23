
$(document).ready(function() {
  $('.hver-ripper').ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.04,
  });
});

jQuery(document).ready(function($){ 

  var totalSections;
  var positionMarkers = [0];
  var grabber = $('.number');
  var currentIndex = 1;
  var isDragging = false;
  var hideTrack = 1;

  $('#fp-container').fullpage({
    scrollOverflow: true,
    scrollingSpeed: 1200,
    // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'], 
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
    menu: '#menu-adm', 
    slidesNavigation: true,
    afterRender: function() {
      totalSections = $('.fp-section').length;
      totalDisplay = totalSections;
      $('.total').html(totalDisplay);

      for(i = 1; i < totalSections; i++) {
        var container = grabber.parent();
        var containerheight = container.innerHeight();
        var denominator =  totalSections / i;
        var checkTop = (containerheight - 40 - grabber.height() ) * i / (totalSections -1);
        checkTop = parseInt(checkTop);
        positionMarkers[i] = checkTop;
      }
    },
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
      }
      if(currentIndex == 2) {
           $('.section-track').css({
            'opacity': '0',
            'z-index': '-1'
          });
      }
      if(currentIndex == 3) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-3').removeClass('number-4');
      }
      if(currentIndex == 4) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-4').removeClass('number-5 number-3');
      }
      if(currentIndex == 5) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-5').removeClass('number-6 number-4');
      }
      if(currentIndex == 6) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-6').removeClass('number-7 number-5');
      }
      if(currentIndex == 7) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-7').removeClass('number-8 number-6');
      }
      if(currentIndex == 8) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-8').removeClass('number-9 number-7');
      }
      if(currentIndex == 9) {
           $('.section-track').css({
            'opacity': '1',
            'z-index': '3'
          });
           $('.adm_emag .number').addClass('number-9').removeClass('number-8');
      }
    }
  });


  var window_height = jQuery(window).height();
  checkWindowHeight(window_height);

  jQuery(window).resize(function(){
    window_height = jQuery(window).width();
    checkWindowHeight(window_height);
  });

  function checkWindowHeight(window_height) {
    positionMarkers.length = 0;
    positionMarkers = [0];
    for(i = 1; i < totalSections; i++) {
      var container = grabber.parent();
      var containerheight = container.innerHeight();
      var denominator =  totalSections / i;
      var checkTop = (containerheight - 40 - grabber.height() ) * i / (totalSections -1);
      checkTop = parseInt(checkTop);
      positionMarkers[i] = checkTop;
    }

  }

  $( grabber ).draggable({ 
    axis: "y", 
    containment: ".track",
  });

  var clicked = false;
  $(grabber).on({
    'mousemove': function(e) {
      clicked && updateScrollPos(e);
    },
    'mousedown': function(e) {
      clicked = true;
      grabber.addClass('in-drag');
      grabber.removeClass('number-active');

    },
    'mouseup': function() {
      clicked = false;
      grabber.removeClass('in-drag');
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
      var correctSlidePosition;
      for(i = 0; i < positionMarkers.length; i++) {
        if(grabber.position().top >= positionMarkers[i]){
          correctSlidePosition = positionMarkers[i]; 
        }
      }
      $('.number').css({
        // 'top' : (correctSlidePosition) + 'px'
        'top' : 'calc(50% - 144px)'
      }); 
    }
  })

  var updateScrollPos = function(e) {
    var sliderpos = grabber.position();
    // Loop through the positionMarkers and find the correct slide 
    // for the current positionMarkers
    var currentSlideIndex;
    for(i = 0; i < positionMarkers.length; i++) {
      // if the grabber is past the positionMarker, set marker as currentSlideIndex
      // once we have looped through, the last one that gets set should be the current slide 
      if(sliderpos.top >= positionMarkers[i]){
       currentSlideIndex = i + 1; // add + 1 because of arrays starting at 0
      }
    }
    // if the slide it SHOULD be does not match the slide it is, make it
    if (currentSlideIndex != currentIndex ){
      // console.log("switching slides");
      isDragging = true;
      $.fn.fullpage.moveTo(currentSlideIndex);
    }
  }


  $(document).on('wheel', function (e) {
      $('.number').css({
        'top' : 'calc(50% - 144px)'
      });
  })

  $('.slider-nav').slick({
      autoplay: false,
      arrow: false,
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,  
      prevArrow: '',
      nextArrow: '',
      responsive: [
          {
              breakpoint: 767,
              settings: {
                  slidesToShow: 1,
              }
          },
          {
              breakpoint: 480,
              settings: { 
                  slidesToShow: 1,
              }
          }
      ]
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
});

