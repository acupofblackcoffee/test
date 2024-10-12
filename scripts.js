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
        type: 'image',
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

    // 言語切り替え機能
    $('.lang-btn').click(function() {
        const lang = $(this).data('lang');
        changeLanguage(lang);
    });

    // 初期言語の設定
    const savedLang = localStorage.getItem('language') || 'ja';
    changeLanguage(savedLang);

    // 初期言語のアクティブ状態を設定
    $(`.lang-btn[data-lang="${savedLang}"]`).addClass('active');
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
