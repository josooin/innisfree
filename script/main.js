$(document).ready(function () {
    let w_width = $(window).innerWidth();
    let menuToggleActivated = false;

    // 창 크기 조정에 따른 메뉴 토글 이벤트 최적화
    function adjustMenu() {
        w_width = $(window).innerWidth();

        if (w_width >= 768 && !menuToggleActivated) {
            $('#toggle').on('click', toggleMenu);
            menuToggleActivated = true;
        } else if (w_width < 768 && menuToggleActivated) {
            $('#toggle').off('click', toggleMenu);
            menuToggleActivated = false;
        }
    }

    function toggleMenu() {
        let a = $(this).data('toggled') || 0;
        if (a === 0) {
            $('.h_bottom').stop().animate({ 'height': '450px' }, 500);
            a = 1;
        } else {
            $('.h_bottom').stop().animate({ 'height': '0px' }, 500);
            a = 0;
        }
        $(this).data('toggled', a);
    }

    $(window).on('resize', adjustMenu).trigger('resize');

    // 검색폼
    $('.search-icon').click(function () {
        var searchInput = $('.search-input');

        // 너비와 투명도를 토글합니다.
        if (searchInput.width() === 0) {
            searchInput.animate({ width: '15em', opacity: 1 }, 400);
        } else {
            searchInput.animate({ width: '0', opacity: 0 }, 400);
        }

        // 검색 입력 필드에 포커스를 설정합니다.
        searchInput.focus();
    });

    // 아코디언 메뉴
    $('.h_bottom > .gnb > ul > li > a').click(function () {
        if (w_width <= 767) {
            $('.sub').not($(this).next()).slideUp();
            $(this).next().slideToggle();
            $('i').not($(this).find('i')).removeClass('act01');
            $(this).find('i').toggleClass('act01');
        }
    });

    // 탭 기능 개선
    $('main > .main_nav > ul > li > a').click(function () {
        $(this).addClass('active').parent().siblings().find('a').removeClass('active');
        return false; // Prevent default action and stop event propagation
    });

    // 캐러셀 슬라이드 최적화
    $('.cnt2_nav a').click(function (e) {
        e.preventDefault();

        let i = $(this).parent().index();
        let slideWidth = $('.cnt2 #product .cnt2_gallery').width();
        let position = -(i * slideWidth);

        $('.cnt2 #product').animate({ 'left': position }, 300);
        $('.cnt2_nav').removeClass('act');
        $(this).parent().addClass('act');
    });

    // 자동 슬라이드를 위한 함수
    let n = 0;
    let slideCount = $('.cnt2_nav').length; 
    let Timer = setInterval(function () {
        n = (n + 1) % slideCount;
        let position = -(n * $('.cnt2 #product .cnt2_gallery').width());
        $('.cnt2 #product').animate({ 'left': position }, 300);

        // 'act' 클래스를 업데이트합니다.
        $('.cnt2_nav').removeClass('act').eq(n).addClass('act');
    }, 5000);

});
