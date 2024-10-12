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

    $(".gallery").modaal({
	type: 'image',
	overlay_close:true,//モーダル背景クリック時に閉じるか
	before_open:function(){// モーダルが開く前に行う動作
		$('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
	},
	after_close:function(){// モーダルが閉じた後に行う動作
		$('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
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
                $('.desktop-nav li').removeClass('current');
                $('.desktop-nav li a[href="#' + id + '"]').parent().addClass('current');
                $('.mobile-nav .nav-item').removeClass('current');
                $('.mobile-nav .nav-item[href="#' + id + '"]').addClass('current');
            }
        });
    });
});

// 現在の位置を取得する関数
function getCurrentPosition() {
    var scrollPosition = $(window).scrollTop();
    $('.scroll-point').each(function() {
        var target = $(this).offset().top;
        var id = $(this).attr('id');
        if (scrollPosition >= target - 71) { // ヘッダーの高さ+1px
            $('.desktop-nav li').removeClass('current');
            $('.desktop-nav li a[href="#' + id + '"]').parent().addClass('current');
            $('.mobile-nav .nav-item').removeClass('current');
            $('.mobile-nav .nav-item[href="#' + id + '"]').addClass('current');
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

const modal = document.getElementById('languageModal');
const modalToggle = document.getElementById('languageModalToggle');

modalToggle.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = function() {
        const lang = this.getAttribute('data-lang');
        console.log('Language changed to:', lang);
        // ここで実際の言語切り替え処理を行う
        modal.style.display = "none";
    }
});

$(document).ready(function() {
    // 既存の関数はそのまま保持

    // 言語切り替え機能
    $('.lang-btn').click(function() {
        const lang = $(this).data('lang');
        changeLanguage(lang);
    });

    // 初期言語の設定
    const savedLang = localStorage.getItem('language') || 'ja';
    changeLanguage(savedLang);
});

function changeLanguage(lang) {
    $('[data-i18n]').each(function() {
        const key = $(this).data('i18n');
        $(this).text(translations[lang][key]);
    });

    // タイトルの変更
    document.title = translations[lang]['pageTitle'];

    // 言語ボタンのアクティブ状態を更新
    $('.lang-btn').removeClass('active');
    $(`.lang-btn[data-lang="${lang}"]`).addClass('active');

    // 言語設定を保存
    localStorage.setItem('language', lang);

    // HTMLのlang属性を更新
    $('html').attr('lang', lang);
}
