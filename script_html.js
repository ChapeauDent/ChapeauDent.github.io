

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("html-menu");
  const dossier = "fiches_pedagogiques_html/";
  
const fichiers = Array.from({ length: 56 }, (_, i) => {
  const numero = String(i + 1).padStart(3, "0");
  return `fiche-${numero}.html`;
});


  fichiers.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0], 10);
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return numA - numB;
  });

  const promesses = fichiers.map(nomFichier =>
    fetch(dossier + nomFichier)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const p = doc.querySelector("header p:nth-of-type(2)");
        const texte = p ? p.textContent.trim() : "Sans titre";

        return {
          nomFichier,
          texte
        };
      })
      .catch(error => {
        console.error("Erreur lors du chargement de", nomFichier, error);
        return {
          nomFichier,
          texte: "Erreur de chargement"
        };
      })
  );

  Promise.all(promesses).then(resultats => {
    resultats.forEach(({ nomFichier, texte }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = dossier + nomFichier;
      a.textContent = texte;
      li.appendChild(a);
      menu.appendChild(li);
    });
  });
});


