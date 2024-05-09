window.addEventListener('load', function () {
  setTimeout(function () {
    var perfEntries = performance.getEntriesByType('navigation');
    console.log(perfEntries);
    var loadTime = perfEntries[0].loadEventEnd - perfEntries[0].startTime;
    var resultElement = document.getElementById('loadTimeInfo');
    resultElement.innerHTML += ' + ' + loadTime.toFixed(3) + ' ms (client)';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/') + 1);

  // получение всех элементов меню
  var menuItems = document.querySelectorAll('.menu-list li');

  // Перебираем элементы и добавляем класс active к текущей странице
  menuItems.forEach(function (item) {
    var link = item.querySelector('a');
    var href = link.getAttribute('href');

    if (filename == href) {
      item.classList.add('active');
    }
  });
});
