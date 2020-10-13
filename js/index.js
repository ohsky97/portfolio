(function($) {
  $(function() {

    /* 1-1. section 높이 == 사용자 브라우저 높이 */
    $('section').height($(window).height());

    /* 1-2. 브라우저 크기가 변경됭 때 마다 section 높이 맞추기 */
    $(window).on('resize', function() {
      $('section').height($(window).height());
    });

    /* 2. gnb 앵커 클릭하면
        - 앵커애 on 클래스 주기
        - 앵커 순번만큼 스크롤바 움직이기
    */
    $('.gnb').on('click', 'a', function(e) {
      e.preventDefault(); /* href 동작 X */

      var aIndex = $(this).index(),
          winH = $(window).height(),
          newTop = winH * aIndex,
          easing = 'easeOutBounce';

      $('html, body').stop().animate({
        scrollTop: newTop
      }, 1500, easing);

      $('.gnb').children().removeClass();
      $(this).addClass('on');

    });

    /* 3. 스크롤하면, 바로 이전이나 다음에 있는 section으로 이동
        mousewheel 플러그인이 있어야 사용 가능
    */
    $('section').on('mousewheel', function(e, delta) {
      e.preventDefault();

      /* 첫번째와 마지막 이미지일 때 스크롤을 내리거나 올리면 jQuery오류뜨는 것을 방지
          및 변수사용 secIndex != first / secIndex != last
      */
      var secIndex = $(this).index(),
          first = 0,
          last = $('section').length - 1;

      // 휠을 위로 돌렸을 때
      if(delta > 0 && secIndex != first) {
        var before = $(this).prev().offset().top;

        $('html, body').stop().animate({
          scrollTop: before
        }, 1500, 'easeOutBounce');

      } else if(delta < 0 && secIndex != last) {
        // 휠을 아래로 돌렸을 때
        var after = $(this).next().offset().top;

        $('html, body').stop().animate({
          scrollTop: after
        }, 1500, 'easeOutBounce');

      }

    });

    /* 4. 마우스 좌표값을 이용해서 이미지(꽃, 물, 잎, 눈) 움직이기 */
    $('section').on('mousemove', function(e) {
      var posX = e.pageX,
          posY = e.pageY;

     // section 1
      $('.obj11').css({
        right: 20-(posX/30),
        bottom: 20-(posY/30)
      });

      $('.obj12').css({
        right: 150+(posX/10),
        bottom: -50+(posY/20)
      });

      $('.obj13').css({
        right: 70-(posX/20),
        top: 200+(posY/10)
      });

     //section 2
      $('.obj21').css({
       left: -10+(posX/25),
       top: -10+(posY/30)
      });
      $('.obj22').css({
       right: 150+(posX/50),
       bottom: -50+(posY/50)
      });

     //section 3
      $('.obj31').css({
       right: 200-(posX/30),
       bottom: 30-(posY/30)
      });
      $('.obj32').css({
       right: 110+(posX/10),
       bottom: -300+(posY/20)
      });
      $('.obj33').css({
       right: -70+(posX/20),
       top: -150+(posY/20)
      });

     //section 4
      $('.obj41').css({
       right: 20-(posX/30),
       bottom: -120-(posY/30)
      });
      $('.obj42').css({
       right: 0+(posX/20),
       bottom: -200+(posY/20)
      });

    });

    /* 5. 스크롤 했을 때 해당 메뉴 'a'에 on 클래스 주기 */
    $(window).on('scroll', function() {

      var winH = $(window).height(),
          scrollTop = $(window).scrollTop() + winH/2;
      /* 메뉴바와 스크롤을 올렸을 때 동시에 되지 않는것을 + winH/2를 입력함으로써 해결 */

      for(var i = 0; i < 4; i++) {
        if(scrollTop >= winH * i && scrollTop < winH * (i+1)) {
          $('.gnb').children().removeClass('on');
          $('.gnb').find('a').eq(i).addClass('on');
        }
      }

    });

  });

  $(function() {
          // 배너
    $('.banner').each(function () {

            var $banner = $(this),
                $slide = $banner.find('.slide'),
                $item = $slide.find('a'),
                $btn = $('.project').find('.btn');

            var sp = 1000,
                count = $item.length,

                currentIndex = 0,
                timer; // 마우스올리면 멈춤, 벗어나면 재생하기위해 선언함.


            $item.each(function (i) {
                $(this).css({
                    left: 100 * i + '%'
                });

            });


            /*. 슬라이드 함수 선언(만들기) */
            function slideShow(i) {
                $slide.stop().animate({
                    left: -100 * i + '%'
                }, sp);

                currentIndex = i;

                if (currentIndex == 0) {
                    $('.info1').show();
                    $('.info2').hide();
                    $('.info3').hide();

                } else if (currentIndex == 1) {
                    $('.info1').hide();
                    $('.info2').show();
                    $('.info3').hide();

                } else if (currentIndex == 2) {
                    $('.info1').hide();
                    $('.info2').hide();
                    $('.info3').show();
                    $('.info4').hide();
                } else if (currentIndex == 3) {
                    $('.info1').hide();
                    $('.info2').hide();
                    $('.info3').hide();
                    $('.info4').show();
                }

                // indicator, btn 상태 업데이트 함수 호출(실행)
                upDate();
            }

            /* upDate() 함수 선언 */
            function upDate() {

                // 첫번째 앵커라면 .prev 숨김
                if (currentIndex == 0) {
                    $btn.find('.prev').hide();
                    //          $btn.find('.prev').addClass('on');
                } else {
                    $btn.find('.prev').show();
                }

                // 마지막 앵커라면 .next 숨김
                if (currentIndex == count - 1) {
                    $btn.find('.next').hide();
                } else {
                    $btn.find('.next').show();
                }

            }



            /* 슬라이드 함수 호출(실행) */
            slideShow(currentIndex);
            console.log(currentIndex);

            /*  버튼을 누르면 슬라이드 이동 */
            $btn.find('.next').click(function() {
                slideShow(currentIndex+1);
                upDate();

            });

            $btn.find('.prev').click(function() {
                slideShow(currentIndex-1);
                upDate();
            });

        });
  });


})(jQuery);

















