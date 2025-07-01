document.addEventListener('DOMContentLoaded', chargerMenu);

async function chargerMenu() {
  try {
    const header = document.getElementById('header');
    const reponse = await fetch('composants/header.html');

    if (!reponse.ok) {
      throw new Error('Erreur lors du chargement du menu');
    }

    const html = await reponse.text();
    header.innerHTML = html;

  } catch (erreur) {
    console.error('Erreur :', erreur);
  }

  const menuToggle = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuToggle.classList.toggle('expanded');
  });

  const currentPage = window.location.pathname;
  const links = document.getElementsByClassName('nav_link');

  console.log('Current page:', currentPage);

  for (let link of links) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.remove('text-gray-700');
      link.classList.add('text-blue-600');
      link.style.cursor = 'default';
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  // Barre de progression du scroll
window.addEventListener('scroll', () => {
  const progress = document.getElementById('scroll-progress');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progress.style.width = `${scrollPercent}%`;
});
});
