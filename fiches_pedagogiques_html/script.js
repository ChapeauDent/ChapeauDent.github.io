
const footer = document.getElementById('footer');

fetch('footer.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du menu');
    }
    return response.text();
  })
  .then(data => {
    footer.innerHTML = data;

    // Le footer est maintenant injecté, on peut exécuter le script de navigation
    const chemin = window.location.pathname;
    const nomFichier = chemin.substring(chemin.lastIndexOf("/") + 1);
    const numeroMatch = nomFichier.match(/fiche-(\d+)\.html/);

    if (numeroMatch) {
      const numeroActuel = parseInt(numeroMatch[1], 10);

      const boutonPrecedent = document.getElementById("precedent");
      const boutonSuivant = document.getElementById("suivant");

      // Gérer le bouton précédent
      if (numeroActuel > 1) {
        const numeroPrecedent = String(numeroActuel - 1).padStart(3, "0");
        boutonPrecedent.onclick = () => {
          window.location.href = `fiche-${numeroPrecedent}.html`;
        };
      } else {
        boutonPrecedent.disabled = true;
        boutonPrecedent.title = "Pas de fiche précédente";
        boutonPrecedent.classList.add("none");
      }

      // Gérer le bouton suivant
      const numeroSuivant = String(numeroActuel + 1).padStart(3, "0");
      fetch(`fiche-${numeroSuivant}.html`, { method: "HEAD" })
        .then(response => {
          if (response.ok) {
            boutonSuivant.onclick = () => {
              window.location.href = `fiche-${numeroSuivant}.html`;
            };
          } else {
            throw new Error("Fiche suivante non trouvée");
          }
        })
        .catch(() => {
          boutonSuivant.disabled = true;
          boutonSuivant.title = "Pas de fiche suivante";
          boutonSuivant.classList.add("none");
        });
    }
  })
  .catch(error => {
    console.error('Erreur :', error);
  });
