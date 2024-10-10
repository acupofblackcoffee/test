$(document).ready(function() {
    // アコーディオン機能
    $('.accordion-area .title').click(function() {
        $(this).toggleClass('close');
        $(this).next('.box').slideToggle();
    });

    // スムーズスクロール
    $('a[href^="#"]').click(function() {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - 70; // ヘッダーの高さ分を引く
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });

    // ギャラリーモーダル
    $(".gallery-list").modaal({
        fullscreen: true,
        before_open: function(){
            $('html').css('overflow-y','hidden');
        },
        after_close: function(){
            $('html').css('overflow-y','scroll');
        }
    });

    // スクロール時のナビゲーション更新
    $(window).scroll(function() {
        $('.scroll-point').each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > position - windowHeight + 200) {
                var id = $(this).attr('id');
                $('.g-nav li').removeClass('current');
                $('.g-nav li a[href="#' + id + '"]').parent().addClass('current');
            }
        });
    });

    // Raindrop effect in footer
    $('#wrapper').raindrops({
        color: '#C5956B',
        canvasHeight: 150,
        waveLength: 100,
        waveHeight: 120,
        rippleSpeed: 0.2,
        density: 3,
        frequency: 1
    });
});

// 現在の位置を取得する関数
function getCurrentPosition() {
    var scrollPosition = $(window).scrollTop();
    $('.scroll-point').each(function() {
        var target = $(this).offset().top;
        var id = $(this).attr('id');
        if (scrollPosition >= target - 71) { // ヘッダーの高さ+1px
            $('.g-nav li').removeClass('current');
            $('.g-nav li a[href="#' + id + '"]').parent().addClass('current');
        }
    });
}

// ページ読み込み時と画面サイズ変更時に現在位置を更新
$(window).on('load resize', function() {
    getCurrentPosition();
});

// スクロール時に現在位置を更新
$(window).scroll(function() {
    getCurrentPosition();
});

// スクロールトップボタンの表示制御とスムーズスクロール
$(window).scroll(function() {
  if ($(this).scrollTop() > 300) {
    $('#scrollTopBtn').fadeIn();
  } else {
    $('#scrollTopBtn').fadeOut();
  }
});

$('#scrollTopBtn').click(function() {
  $('html, body').animate({scrollTop : 0}, 800);
  return false;
});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const header = document.getElementById('header');
  
  menuToggle.addEventListener('click', function() {
    header.classList.toggle('open');
  });

  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // メニュー外をクリックしたときにメニューを閉じる
  document.addEventListener('click', function(event) {
    if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
      menuToggle.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });

  // モバイルナビゲーションのリンクをクリックしたときにメニューを閉じる
  const mobileNavLinks = mobileNav.getElementsByTagName('a');
  for (let link of mobileNavLinks) {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  }
});
