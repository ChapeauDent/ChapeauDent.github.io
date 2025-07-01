async function chargerMenu() {
  try {
    const header = document.getElementById('header');
    const reponse = await fetch('composants/header.html');

    if (!reponse.ok) {
      throw new Error('Erreur lors du chargement du menu');
    }

    const html = await reponse.text();
    header.innerHTML = html;

  } catch (erreur) {
    console.error('Erreur :', erreur);
  }
}
document.addEventListener('DOMContentLoaded', chargerMenu);

window.addEventListener('DOMContentLoaded', async () => {
  // Barre de progression du scroll
window.addEventListener('scroll', () => {
  const progress = document.getElementById('scroll-progress');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progress.style.width = `${scrollPercent}%`;
});
});
