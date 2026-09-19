// Пока пусто — сюда позже добавим логику баннера cookie
// и условную загрузку Яндекс Метрики.

document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('carousel');
    if (!viewport) return;

    const dots = document.querySelectorAll('.carousel__dot');
    const prev = document.querySelector('.carousel__arrow_prev');
    const next = document.querySelector('.carousel__arrow_next');

    // прокрутка стрелками
    prev.addEventListener('click', () => {
        viewport.scrollBy({ left: -viewport.clientWidth, behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
        viewport.scrollBy({ left: viewport.clientWidth, behavior: 'smooth' });
    });

    // клик по точке
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = Number(dot.dataset.index);
            viewport.scrollTo({ left: viewport.clientWidth * index, behavior: 'smooth' });
        });
    });

    // подсветка активной точки при ручной прокрутке
    viewport.addEventListener('scroll', () => {
        const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === index);
        });
    });
});

function loadAnalytics() {
    // Раскомментируйте и вставьте сюда свой номер счётчика
    // (function(m,e,t,r,i,k,a){...})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    // ym(XXXXXX, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
    console.log('Analytics loaded (placeholder)');
}