




$(function() {

  // sp menu
  $(".js-open_menu").on("click", function() {
    $(this).toggleClass("active");
    $(".c-header").toggleClass("active");
    $(".c-menu").fadeToggle ();

    //メニューを開いてる間、後ろ側を固定する
    if ($(this).hasClass('active')) {
      scrollPosition = $(window).scrollTop();
      $('.page-container').addClass('is_scroll').css({'top': -scrollPosition});
    } else {
      $('.page-container').removeClass('is_scroll').css({'top': 0});
      window.scrollTo( 0 , scrollPosition );
    }
  });  
  
  // スムーススクロール
  //$('.a[href^="#"]').click(function() {
  $('.p-fv__scroll, .js-guide_item').click(function() {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });

  
  if (window.innerWidth < 768) {
    setTimeout(function() {
    	$('.p-fv__btn').show();
    }, 3000);
  }
  
  
  // top slideup animation
  $(window).scroll(function() {
    $(".c-slideup").each(function() {
      const position = $(this).offset().top;
      const scroll = $(window).scrollTop() + 50;
      const windowHeight = $(window).height();
      if (scroll > position - windowHeight) {
        $(this).addClass("active");
      }
      if (scroll + 100 < position - windowHeight) {
        $(this).removeClass("active");
      }
    });
  });

  // accordion
  $(".js-toggleswitch").on("click", function() {
    $(this).toggleClass("active");
    $(this).prev(".togglecontent").slideToggle();
  });

  // 
  $("#js-menuDetail").each(function() {
    $('.p-menu_detail__thumbnail').on('click',function(){
      $('.p-menu_detail__thumbnail').removeClass('active');
      $(this).addClass('active');
      $('.p-menu_detail__img').removeClass('active').hide();
      $('.p-menu_detail__img').eq($(this).index()).addClass('active').show();
    });

    $('.p-menu_detail__thumbnail').hover(function() {
      $('.p-menu_detail__img').removeClass('active').hide();
      $('.p-menu_detail__img').eq($(this).index()).addClass('active').show();   
    }, function() {
      $('.p-menu_detail__img').removeClass('active').hide();
      $('.p-menu_detail__img').eq($('.p-menu_detail__thumbnail.active').index()).addClass('active').show();   
    });
  });    

  var resultRecommendOffset = $("#l-result__recommend").offset();
  $(window).on("scroll", function() {
    scTop = $(this).scrollTop();
    dH = $(document).height();
    wH = $(window).height();
    scrollPosition = wH + scTop;
    footerHeight = $(".c-footer").innerHeight();
    if ( dH - scrollPosition  <= footerHeight ) {
      $(".main-content .bold-ro__choice-header").removeClass("fixed");
      $('.p-fv__btn ').hide();// top 診断ボタン
    } else {
      $(".main-content .bold-ro__choice-header").addClass("fixed");
      $('.p-fv__btn ').show();// top 診断ボタン
    }
    
    // 診断結果画面の追従
    $(resultRecommendOffset).each(function() {
      if (scTop < resultRecommendOffset.top - wH/2) {
        $(".js-resultFixed").removeClass("fixed");
      } else if ( dH - scrollPosition  <= footerHeight ) {
        $(".js-resultFixed").removeClass("fixed");
      } else {
        $(".js-resultFixed").addClass("fixed");
      }
	});

    // top 診断ボタン
    if (scTop > 50) {
      $('.p-fv__btn ').addClass("sc");
    } else {
      $('.p-fv__btn ').removeClass("sc");
    }
  });

  // BOX選択多面のタイトル挿入
  $("#choice-actions").each(function() {
    $(".p-page__title_container").html('<h1 class="p-page__title" data-page="box_subscription2">homeal BOXに入れる商品を残り<span>6つ</span>選択してください </h1>').attr ("data-page", "box_subscription");
    $("#choice-actions").insertAfter(".bold-modal__content");
  });

  // ログイン画面の注意書きの表示/非表示
  $(".p-account .js-no-transition").on("click", function() {
    $('.p-account__note').hide();
  });
  $(".p-account .js-recover_password_cancel").on("click", function() {
    $('.p-account__note').show();
  });
 
  $.fn.tile = function(columns) {
    var tiles, $tile, max, c, h, remove, s = document.body.style, a = ["height"],
      last = this.length - 1;
    if(!columns) columns = this.length;
    remove = s.removeProperty ? s.removeProperty : s.removeAttribute;
    return this.each(function() {
      remove.apply(this.style, a);
    }).each(function(i) {
      c = i % columns;
      if(c == 0) tiles = [];
      $tile = tiles[c] = $(this);
      h = ($tile.css("box-sizing") == "border-box") ? $tile.outerHeight() : $tile.innerHeight();
      if(c == 0 || h > max) max = h;
      if(i == last || c == columns - 1) {
        $.each(tiles, function() { this.css("height", max); });
      }
    });
  };
  setTimeout(function(){
	$('.bold-product__details .bold-product__info').tile(8);
    $('.bold-product__details .p-menu_list__tags').tile(4);
  },100);
});
/* Header with announve bar*/
$(window).on('scroll', function () {
  var startPos = 2, winScrollTop = 0;
    winScrollTop = $(this).scrollTop();
    if (winScrollTop >= startPos) {
        $('.c-header').addClass('top');
    } else {
        $('.c-header').removeClass('top');
    }
    startPos = winScrollTop;
});

/* sp fixed button change color */
var $w = $(window).scroll(function(){
  var firstHeight = $("#l-fv").offset().top + 100;
  var menuHeight = $("#change_btn").offset().top;
  var setHeight = $("#return_btn").offset().top;
    if ( $w.scrollTop() > firstHeight && $w.scrollTop() < menuHeight) {   
      $(".p-fv__btn .c-linkbtn").addClass("bg-is-white");
    } else if ( $w.scrollTop() > menuHeight && $w.scrollTop() < setHeight){
      $(".p-fv__btn .c-linkbtn").removeClass("bg-is-white");
    } else if ($w.scrollTop() > setHeight ) {
      $(".p-fv__btn .c-linkbtn").addClass("bg-is-white");
    } else if ($w.scrollTop() < firstHeight ){
      $(".p-fv__btn .c-linkbtn").removeClass("bg-is-white");
    }
});

