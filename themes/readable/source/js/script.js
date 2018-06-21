var isDown = true
var oldY = 0
inView.offset(50)

document.body.addEventListener('touchstart', function(){
});

window.addEventListener('scroll', _.throttle(e => {
  var currentY = window.scrollY
  if((oldY - currentY) < 0) {
    isDown = true
  } else {
    isDown = false
  }
  oldY = currentY
}, 250))

$("article img").each(function() {
    var strA = "<a data-fancybox='gallery' href='" + this.src + "'></a>";
    $(this).wrapAll(strA);
});

$('.toc-link').each(function() {
    var href = $(this).attr("href");

    inView(href).on('exit', () => {
      if (isDown) {
        handleActive(href)
      }
    })

    inView(href).on('enter', () => {
      if (!isDown) {
        handleActive(href)
      }
    })

    this.onclick = function(e) {
      var pos = $(href).offset().top - 10;
      $("html,body").animate({scrollTop: pos}, 300);
      setTimeout(() => {
        handleActive(href)
      }, 350)
      return false
    }
})

function handleActive(href) {
  document.querySelectorAll('.toc-link').forEach(elm => {
    elm.classList.remove('active')
  })
  document.querySelector(".toc [href='"+ href +"']").classList.add('active')
}