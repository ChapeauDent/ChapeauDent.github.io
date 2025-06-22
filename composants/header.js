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

    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      menu.classList.toggle('hidden');
    });
    // JavaScript : redirection + exécution d’un script
    document.getElementById("search-form").addEventListener("submit", function (e) {
      e.preventDefault(); // Empêche le rechargement
      const query = document.getElementById("search-input").value.trim();

      if (query) {
        // Tu peux personnaliser cette URL comme tu veux
        const redirectUrl = `../recherche.html?q=${encodeURIComponent(query)}`;

        // 💥 Exemple de script personnalisé
        console.log("Recherche lancée pour :", query);

        // 🔀 Redirection vers la page de résultats
        window.location.href = redirectUrl;
      }
    });

  })
  .catch(error => {
    console.error('Erreur :', error);
  });

  