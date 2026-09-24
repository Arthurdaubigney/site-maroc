// Interactions de la page d'accueil : menu mobile, repli des photos, formulaire d'estimation.
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
    window.matchMedia('(min-width: 64rem)').addEventListener('change', function (mq) {
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

  /* ---------- Formulaire d'estimation ---------- */
  var form = document.getElementById('form-estimation');
  if (!form) return;

  var summary = document.getElementById('form-erreurs');
  var status = document.getElementById('form-statut');
  var submit = form.querySelector('button[type="submit"]');
  var submitLabel = form.querySelector('[data-submit-label]');

  var rules = {
    nom: function (v) { return v.trim().length >= 2 ? '' : 'Indiquez votre nom et prénom.'; },
    telephone: function (v) {
      var digits = v.replace(/[^\d+]/g, '');
      if (!digits) return 'Indiquez un numéro de téléphone pour que nous puissions vous rappeler.';
      return digits.replace(/\D/g, '').length >= 9 ? '' : 'Ce numéro semble incomplet. Exemple : 06 12 34 56 78.';
    },
    email: function (v) {
      if (!v.trim()) return '';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Cette adresse e-mail semble incomplète. Exemple : nom@domaine.ma.';
    },
    categorie: function (v) { return v ? '' : 'Choisissez le type d\'objet, même approximatif.'; },
    description: function (v) {
      return v.trim().length >= 15 ? '' : 'Décrivez l\'objet en quelques mots : dimensions, matériaux, signature.';
    },
    consentement: function (_, el) {
      return el.checked ? '' : 'Cochez cette case pour que nous puissions traiter votre demande.';
    }
  };

  function showError(name, message) {
    var field = form.elements[name];
    var slot = form.querySelector('[data-error-for="' + name + '"]');
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (slot) slot.textContent = message;
  }

  function validate() {
    var errors = [];
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      var message = rules[name](field.value, field);
      showError(name, message);
      if (message) errors.push({ name: name, message: message });
    });
    return errors;
  }

  // Revalide un champ deja signale des que l'utilisateur le corrige
  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    var evt = field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input';
    field.addEventListener(evt, function () {
      if (field.getAttribute('aria-invalid') === 'true') showError(name, rules[name](field.value, field));
    });
  });

  function renderSummary(errors) {
    var list = summary.querySelector('[data-error-list]');
    list.innerHTML = '';
    errors.forEach(function (err) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + err.name;
      a.className = 'link';
      a.textContent = err.message;
      a.addEventListener('click', function (event) {
        event.preventDefault();
        form.elements[err.name].focus();
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    summary.querySelector('[data-error-count]').textContent = errors.length === 1
      ? '1 champ est à corriger avant l\'envoi'
      : errors.length + ' champs sont à corriger avant l\'envoi';
    summary.classList.remove('hidden');
    summary.focus();
  }

  function setBusy(busy) {
    submit.setAttribute('aria-busy', String(busy));
    submitLabel.textContent = busy ? 'Envoi en cours' : 'Envoyer ma demande';
  }

  function showStatus(kind, html) {
    status.className = 'mt-6 rounded-control border p-4 ' + (kind === 'success' ? 'border-success text-ink' : 'border-error text-ink');
    status.innerHTML = html;
    status.classList.remove('hidden');
    status.focus();
  }

  function composeBody(data) {
    return [
      'Nom : ' + data.get('nom'),
      'Téléphone : ' + data.get('telephone'),
      'E-mail : ' + (data.get('email') || 'non renseigné'),
      'Ville : ' + (data.get('ville') || 'non renseignée'),
      'Type d\'objet : ' + data.get('categorie'),
      'Recontact par : ' + data.get('contact'),
      '',
      'Description :',
      data.get('description')
    ].join('\n');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (submit.getAttribute('aria-busy') === 'true') return;

    var errors = validate();
    if (errors.length) { renderSummary(errors); return; }
    summary.classList.add('hidden');

    var data = new FormData(form);
    var endpoint = form.dataset.endpoint;

    // Pas encore de service d'envoi configure : on ouvre la messagerie, et on le dit.
    if (!endpoint) {
      var email = form.dataset.fallbackEmail;
      var subject = 'Demande d\'estimation : ' + data.get('categorie');
      window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(composeBody(data));
      showStatus('success',
        '<p class="font-semibold">Votre messagerie s\'ouvre avec la demande pré-remplie.</p>' +
        '<p class="mt-1 text-sm text-muted">Il vous reste à l\'envoyer. Si rien ne s\'ouvre, écrivez-nous à <a class="link" href="mailto:' + email + '">' + email + '</a> ou appelez le <a class="link" href="tel:+212522000000">05 22 00 00 00</a>.</p>');
      return;
    }

    setBusy(true);
    fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        form.reset();
        showStatus('success',
          '<p class="font-semibold">Demande envoyée. Merci.</p>' +
          '<p class="mt-1 text-sm text-muted">Nous vous recontactons pour recevoir vos photos et vous donner un premier avis.</p>');
      })
      .catch(function () {
        showStatus('error',
          '<p class="font-semibold">L\'envoi n\'a pas abouti.</p>' +
          '<p class="mt-1 text-sm text-muted">Votre saisie est conservée. Réessayez dans un instant, ou appelez le <a class="link" href="tel:+212522000000">05 22 00 00 00</a>.</p>');
      })
      .finally(function () { setBusy(false); });
  });
})();
