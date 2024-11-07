const menutoggle = document.querySelector('.menutoggle');
const menuitems = document.querySelector('.menuitems');
const menulinks = document.querySelectorAll('.menulink');

menutoggle.addEventListener('click', function() {
	menuitems.classList.toggle('show');
    menulinks.forEach(function(link) {
        link.classList.toggle('transition');
        setTimeout(function() {
            link.classList.toggle('visible');
        }, 50);
    });
	menutoggle.setAttribute('aria-expanded',
	menutoggle.getAttribute('aria-expanded')==='false' ? 'true' : 'false');
});