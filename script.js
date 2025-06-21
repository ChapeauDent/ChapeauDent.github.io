const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dossier = path.join(__dirname, 'fiches_pedagogiques_js');
const output = [];

fs.readdir(dossier, (err, fichiers) => {
    if (err) throw err;

    fichiers
        .filter(f => f.startsWith('fiche-') && f.endsWith('.html'))
        .forEach(fichier => {
            const chemin = path.join(dossier, fichier);
            const contenuHTML = fs.readFileSync(chemin, 'utf-8');
            const $ = cheerio.load(contenuHTML);

            const competence = $('header p:nth-of-type(2)').html().trim()
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');


            const sections = {
                objectif: '',
                theorie: '',
                exemple: '',
                sources: '',
                infos_supplementaires: ''
            };

            $('section').each((i, el) => {
                const titre = $(el).find('h2').text().toLowerCase();

                const contenuHTML = $(el).html().replace(/^<h2>.*?<\/h2>/i, '').trim();

                if (titre.includes('objectif')) sections.objectif = contenuHTML;
                else if (titre.includes('théorie')) sections.theorie = contenuHTML;
                else if (titre.includes('exemple')) sections.exemple = contenuHTML;
                else if (titre.includes('source')) sections.sources = contenuHTML;
            });

            output.push({
                fichier,
                competence,
                ...sections
            });
        });

    fs.writeFileSync('fiches_js.json', JSON.stringify(output, null, 2), 'utf-8');
    console.log('✅ Données extraites avec structure HTML conservée dans fiches.json');
});
