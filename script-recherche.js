const fichiers = [
  'bdd/fiches_integration.json',
  'bdd/fiches_css.json',
  'bdd/fiches_html.json',
  'bdd/fiches_js.json'
];

let toutesLesFiches = [];

// Fonction pour charger tous les fichiers JSON
async function chargerToutesLesFiches() {
  const promesses = fichiers.map(fichier =>
    fetch(fichier).then(res => res.json())
  );

  try {
    const resultats = await Promise.all(promesses);
    toutesLesFiches = resultats.flat();
  } catch (error) {
    console.error('Erreur lors du chargement des fichiers JSON :', error);
  }
}

// Fonction pour afficher les fiches dans le DOM
function afficherFiches(fiches) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  fiches.forEach(fiche => {
    const card = document.createElement('div');
    card.className = 'card p-4 bg-white rounded-lg shadow';

    card.innerHTML = `
      <p class="text-sm text-gray-500">${fiche.fichier}</p>
      <h2 class="text-xl font-bold text-blue-600 mt-2">${fiche.competence}</h2>
      <section class="mt-2">${fiche.objectif}</section>
      <section class="mt-2">${fiche.theorie}</section>
      <section class="mt-2">${fiche.exemple}</section>
      <section class="mt-2">${fiche.sources}</section>
      <section class="mt-2">${fiche.infos_supplementaires || ''}</section>
    `;

    container.appendChild(card);
  });
}

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
