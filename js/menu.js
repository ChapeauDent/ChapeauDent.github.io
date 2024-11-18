async function loadMenu() {
    try {
        // Charger le fichier JSON
        const response = await fetch('../menu.json');
        const data = await response.json();

        // Construire l'en-tête
        const headerContainer = document.getElementById('header-container');
        headerContainer.innerHTML = `
            <h1>${data.header.title}</h1>
            <p>${data.header.subtitle}</p>
        `;

        // Construire le menu
        const navContainer = document.getElementById('nav-container');
        let navHTML = `
            <button class="menutoggle" aria-expanded="false">
                <span class="menutoggleicon"></span>
                <span class="menutoggleicon"></span>
                <span class="menutoggleicon"></span>
            </button>
            <ul class="menuitems">
        `;

        data.menu.forEach(item => {
            navHTML += `
                <li class="menuitem">
                    <a class="menulink" href="${item.url}">
                        <i class="${item.icon}"></i> ${item.label}
                    </a>
                </li>
            `;
        });

        navHTML += '</ul>';
        navContainer.innerHTML = navHTML;

    } catch (error) {
        console.error('Erreur lors du chargement du menu :', error);
    }
}

// Charger le menu lorsque la page est chargée
window.addEventListener('DOMContentLoaded', loadMenu);