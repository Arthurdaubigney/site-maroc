// Interactions du site : menu mobile, repli des photos, annee du pied de page,
// redirection vers /merci apres envoi du formulaire Tally (page /contact).
// Aucune dependance ; charge en defer.
(function () {
  'use strict';

  /* ---------- Menu mobile (bouton de divulgation) ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var panel = document.getElementById('menu-mobile');

  function setMenu(open) {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    toggle.querySelector('[data-menu-icon="open"]').classList.toggle('hidden', open);
    toggle.querySelector('[data-menu-icon="close"]').classList.toggle('hidden', !open);
    toggle.querySelector('[data-menu-label]').textContent = open ? 'Fermer le menu' : 'Ouvrir le menu';
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 80rem)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- Photos : si une image distante ne charge pas, le cadre garde
     ses dimensions et affiche le panneau zellige au lieu d'une icone cassee. ---------- */
  document.querySelectorAll('.photo-frame img').forEach(function (img) {
    var markMissing = function () { img.closest('.photo-frame').classList.add('is-missing'); };
    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener('error', markMissing);
  });

  /* ---------- Formulaire Tally : envoi reussi -> /merci ----------
     L'embed Tally signale l'envoi au parent par postMessage (Tally.FormSubmitted).
     Le marqueur de session prouve a /merci qu'un formulaire vient d'etre envoye. */
  if (document.querySelector('iframe[data-tally-src]')) {
    window.addEventListener('message', function (event) {
      if (event.origin !== 'https://tally.so') return;
      var data = event.data;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch (e) { return; }
      }
      if (!data || data.event !== 'Tally.FormSubmitted') return;
      try { sessionStorage.setItem('fx-formulaire-envoye', '1'); } catch (e) { /* stockage bloque */ }
      window.location.assign('/merci');
    });
  }

  /* ---------- Annee du pied de page ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
