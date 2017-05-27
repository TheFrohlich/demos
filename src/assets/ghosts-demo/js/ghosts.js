(function () {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  function setX(e) {
    var valueX = calcX(e);
    var valueY = calcY(e);
    document.documentElement.style.setProperty('--ghost-mouse-x', valueX + "%");
    document.documentElement.style.setProperty('--ghost-mouse-y', valueY + "%");
    document.documentElement.style.setProperty('--mouse-x', e.clientX);
    document.documentElement.style.setProperty('--mouse-y', e.clientY);
  }

  function calcX(e) {

    var x = (e.clientX / windowWidth) * 100;
    if (x < 40) { x = 40; }
    if (x > 70) { x = 70; }
    return x;
  }
  function calcY(e) {

    var x = (e.clientY / windowHeight) * 100;
    if (x < 15) { x = 15; }
    if (x > 50) { x = 50; }
    return x;
  }
  document.onmousemove = function (e) {
    setX(e);
  }
})();