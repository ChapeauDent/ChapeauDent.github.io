const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const directoryPath = path.join(__dirname, 'www');
const jsonPath = path.join(__dirname, 'pages.json');

let pages = [];

// Lire le contenu du répertoire www
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Erreur lors de la lecture du répertoire:', err);
        return;
    }

    // Pour chaque fichier HTML dans le dossier
    files.forEach(file => {
        if (path.extname(file) === '.html') {
            const filePath = path.join(directoryPath, file);
            const html = fs.readFileSync(filePath, 'utf8');
            const dom = new JSDOM(html);

            const title = dom.window.document.querySelector('title')?.textContent || 'Sans titre';
            const description = dom.window.document.querySelector('meta[name="description"]')?.content || 'Pas de description';

            pages.push({
                title: title,
                description: description,
                url: `www/${file}`
            });
        }
    });

    // Écrire les informations dans pages.json
    fs.writeFileSync(jsonPath, JSON.stringify(pages, null, 4), 'utf8');
    console.log('Le fichier pages.json a été mis à jour.');
});
