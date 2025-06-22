

// Initialisation après chargement de la page
window.addEventListener('DOMContentLoaded', async () => {
  const input = document.getElementById('search-input');
  const params = new URLSearchParams(window.location.search);
  const queryInitiale = params.get('q');

  if (toutesLesFiches.length === 0) {
    await chargerToutesLesFiches();
  }

  // Préremplir le champ
  input.value = queryInitiale || '';

  // Si on a une requête initiale, on filtre directement
  if (queryInitiale) {
    const resultatsFiltres = toutesLesFiches.filter(fiche =>
      Object.values(fiche).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(queryInitiale.toLowerCase())
      )
    );
    afficherFiches(resultatsFiltres);
  }

  // Écouteur de recherche dynamique
  input.addEventListener('input', function () {
    const query = this.value.toLowerCase();

    const resultatsFiltres = toutesLesFiches.filter(fiche =>
      Object.values(fiche).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(query)
      )
    );

    afficherFiches(resultatsFiltres);
  });
});
