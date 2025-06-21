const header = document.getElementById('header');

fetch('/composants/header.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du menu');
    }
    return response.text();
  })
  .then(data => {
    header.innerHTML = data;

    // ✅ Code exécuté après que le header soit injecté
    const currentUrl = window.location.pathname;

    document.querySelectorAll('nav ul li a').forEach(link => {
      const linkUrl = new URL(link.href);
      if (linkUrl.pathname === currentUrl) {
        link.parentElement.classList.add('active');
      }
    });
  })
  .catch(error => {
    console.error('Erreur :', error);
  });
