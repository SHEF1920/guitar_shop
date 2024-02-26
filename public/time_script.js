document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('load', function() {
        var loadTime = performance.now();
        console.log('Время загрузки страницы: ' + loadTime + ' мс');

        var element = document.getElementById('loadTimeInfo');
        element.innerHTML = 'Время загрузки страницы: ' + loadTime.toFixed(3) + ' мс';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);

    var menuItems = document.querySelectorAll('.navbar li');

    menuItems.forEach(function (item) {
        var link = item.querySelector('a');
        var href = link.getAttribute('href');

        if (filename == href) {
            item.classList.add('active');
        }
    });
});