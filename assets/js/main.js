// Interactions du site : menu mobile, repli des photos, annee du pied de page.
// Le formulaire de contact est un embed Tally (voir index.html, section #estimation).
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
     ses dimensions et affiche "Photo a venir" au lieu d'une icone cassee. ---------- */
  document.querySelectorAll('.photo-frame img').forEach(function (img) {
    var markMissing = function () { img.closest('.photo-frame').classList.add('is-missing'); };
    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener('error', markMissing);
  });

  /* ---------- Annee du pied de page ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
