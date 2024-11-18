   // Fonction pour récupérer les pages et les afficher
   async function fetchPages() {
    try {
        const response = await fetch('../pages.json');
        const pages = await response.json();

        const container = document.getElementById('pages-container');
        pages.forEach(page => {
            // Créer un élément div qui contiendra les informations
            const div = document.createElement('a');
            div.href = page.url;
            div.classList.add('page-link'); // Ajouter la classe appropriée
            
            // Ajouter un lien vers la page
            const titre = document.createElement('h2');
            titre.textContent = page.title;

            // Ajouter le lien et la description dans le div
            const description = document.createElement('p');
            description.textContent = page.description;

            // Ajouter le lien et la description dans le conteneur
            div.appendChild(titre);
            div.appendChild(description);

            // Ajouter le conteneur au DOM
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des pages:', error);
    }
}

// Appel de la fonction pour récupérer et afficher les pages au chargement de la page
fetchPages();