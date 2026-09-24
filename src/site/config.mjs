// Configuration centrale du site. Toute information a remplacer avant la mise en ligne est ici,
// et nulle part ailleurs : les pages, le JSON-LD, le sitemap et llms.txt en derivent.

export const SITE = {
  // A REMPLACER : domaine definitif (sans slash final)
  url: 'https://site-maroc.vercel.app',
  name: 'Florian Messeau',
  tagline: 'Antiquaire et expert en objets d\'art au Maroc',
  expert: {
    name: 'Florian Messeau',
    jobTitle: 'Antiquaire et expert en objets d\'art',
  },
  // A REMPLACER : coordonnees reelles (NAP identique sur le site, le JSON-LD et Google Business Profile)
  phone: { display: '05 22 00 00 00', e164: '+212522000000' },
  whatsapp: { display: '06 00 00 00 00', digits: '212600000000' },
  email: 'contact@site-maroc.ma',
  address: {
    street: 'Adresse de la galerie',
    postalCode: '40000',
    city: 'Marrakech',
    country: 'MA',
    countryName: 'Maroc',
  },
  // A COMPLETER : latitude / longitude a 5 decimales (null = non publie dans le JSON-LD)
  geo: null,
  hours: { label: 'Du lundi au samedi, de 10 h à 19 h, et sur rendez-vous', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' },
  // A COMPLETER : profils officiels (Google Business Profile, Instagram, Facebook...)
  sameAs: [],
  // A REMPLACER : identifiant du formulaire Tally (Share > Embed). null = formulaire pas encore en ligne.
  tallyFormId: null,
  lastmod: '2026-09-24',
};

export const whatsappLink = (text = 'Bonjour Florian, je souhaite faire estimer un objet.') =>
  `https://wa.me/${SITE.whatsapp.digits}?text=${encodeURIComponent(text)}`;

// Photos provisoires (Unsplash). Chaque cle est remplacee par la photo du commercial :
// deposer le fichier dans public/images/ et remplacer l'URL par '/images/nom-du-fichier.jpg'.
// Si une URL distante ne charge pas, le cadre affiche "Photo a venir" sans casser la mise en page.
const u = (id) => `https://images.unsplash.com/photo-${id}`;
export const IMAGES = {
  vitrine: u('1555041469-a586c61ea9bc'),
  og: u('1519710164239-da123dc03ef4'),
  loupe: u('1513519245088-0e12902e5a38'),
  mobilier: u('1540574163026-643ea20ade25'),
  'pate-de-verre': u('1578500494198-246f612d3b3d'),
  'vaisselle-verre-argenterie': u('1603199506016-b9a594b593c0'),
  'sculptures-bronzes': u('1582560475093-ba66accbc424'),
  'pendules-horloges': u('1563861826100-9cb868fdbe1c'),
  'montres-bijoux': u('1611591437281-460bfbe1220a'),
  'tableaux-tapisseries': u('1578301978693-85fa9c0320b9'),
  tapis: u('1600166898405-da9535204843'),
  'robes-vetements-de-marque': u('1566174053879-31528523f8ae'),
  'briquets-stylos': u('1585336261022-680e295ce3fe'),
  'lustres-miroirs': u('1540932239986-30128078f3c5'),
  'arts-asiatiques-africains': u('1578926288207-a90a5366759d'),
  'vins-spiritueux': u('1510812431401-41d2bd2722f3'),
  'instruments-de-musique': u('1511379938547-c1f69419868d'),
  'sacs-bagagerie': u('1548036328-c9fa89d128fa'),
  succession: u('1567016432779-094069958ea5'),
};
