// Page /merci : s'affiche toujours (lien direct, redirection Tally ou envoi du formulaire integre).
// La conversion n'est comptee qu'apres un envoi reel, une seule fois :
//  - envoi depuis le formulaire integre : main.js pose le marqueur 'fx-formulaire-envoye' ;
//  - redirection de fin de formulaire reglee dans Tally : la page precedente est tally.so ou /contact.
// Un rechargement, un retour arriere ou une visite directe ne comptent jamais.
(function () {
  'use strict';

  var marqueur = false;
  try {
    marqueur = sessionStorage.getItem('fx-formulaire-envoye') === '1';
    sessionStorage.removeItem('fx-formulaire-envoye');
  } catch (e) { /* stockage bloque */ }

  var nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || {};
  var rechargement = nav.type === 'reload' || nav.type === 'back_forward';
  var depuisFormulaire = /^https:\/\/([a-z0-9-]+\.)?tally\.so\//.test(document.referrer)
    || document.referrer.indexOf(window.location.origin + '/contact') === 0;

  if (rechargement || !(marqueur || depuisFormulaire)) return;

  // Evenement generique (utilisable par Google Tag Manager : declencheur "formulaire_envoye").
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'formulaire_envoye' });

  // Conversion Google Ads, si configuree (SITE.googleAds dans src/site/config.mjs).
  var cfg = {};
  try { cfg = JSON.parse(document.getElementById('merci-config').textContent); } catch (e) { /* pas de config */ }
  if (!cfg.adsId || !cfg.conversionLabel) return;

  // La balise globale (chargee dans le <head> de chaque page) definit deja gtag ; sinon on la charge ici.
  if (typeof window.gtag !== 'function') {
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', cfg.adsId);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.adsId);
    document.head.appendChild(s);
  }
  window.gtag('event', 'conversion', { send_to: cfg.adsId + '/' + cfg.conversionLabel });
})();
