var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,

    loop: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    },
});
