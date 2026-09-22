
document.addEventListener('DOMContentLoaded', () => {
    // МЕТРИКА
    const notice = document.getElementById('cookie-notice');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');

    const CONSENT_KEY = 'cookie-consent';
    const METRIKA_ID = 112818949;

    function loadAnalytics() {
        if (window.__metrikaLoaded) return;   // защита от двойной загрузки
        window.__metrikaLoaded = true;

        (function(m, e, t, r, i, k, a) {
            m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments); };
            m[i].l = 1 * new Date();
            for (let j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
            }
            k = e.createElement(t);
            a = e.getElementsByTagName(t)[0];
            k.async = 1;
            k.src = r;
            a.parentNode.insertBefore(k, a);
        })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + METRIKA_ID, 'ym');

        ym(METRIKA_ID, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            referrer: document.referrer,
            url: location.href,
            accurateTrackBounce: true,
            trackLinks: true
        });
    }
    // логика баннера
    const saved = localStorage.getItem(CONSENT_KEY);

    if (saved === 'accepted') {
        // уже приняли — грузим Метрику, баннер не показываем
        loadAnalytics();
    } else if (saved === 'rejected') {
        // уже отклонили — ничего не грузим, баннер не показываем
    } else {
        // решения нет — показываем баннер
        notice.hidden = false;

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            notice.hidden = true;
            loadAnalytics();
        });

        rejectBtn.addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'rejected');
            notice.hidden = true;
            // Метрику не грузим
        });
    }

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