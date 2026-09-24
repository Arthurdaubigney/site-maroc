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
  // Le contact passe par le formulaire Tally (page /contact). Telephone conserve en attendant.
  phone: { display: '05 22 00 00 00', e164: '+212522000000' },
  address: {
    // A COMPLETER si une adresse est publiee (null = seule la ville est affichee)
    street: null,
    postalCode: '40000',
    city: 'Marrakech',
    country: 'MA',
    countryName: 'Maroc',
  },
  // A COMPLETER : latitude / longitude a 5 decimales (null = non publie dans le JSON-LD)
  geo: null,
  // A COMPLETER : profils officiels (Google Business Profile, Instagram, Facebook...)
  sameAs: [],
  // A REMPLACER : identifiant du formulaire Tally (Share > Embed). null = formulaire pas encore en ligne.
  tallyFormId: null,
  lastmod: '2026-09-24',
  // Conception et realisation du site (mentions legales). Aucune personne physique n'est citee :
  // seule la societe apparait (ni dirigeant, ni nom commercial).
  realisation: {
    name: 'PSA',
    siren: '909 703 324',
    legalForm: 'SASU au capital de 10 000 €',
    address: '2 avenue des Lyonnais, 21200 Beaune, France',
    rcs: '909 703 324 R.C.S. Dijon',
    tva: 'FR46909703324',
  },
};


// Photos du site. null = emplacement vide (cadre "Photo a venir"), le site reste propre.
// Pour ajouter une photo : la deposer dans public/images/ puis remplacer null par '/images/nom-du-fichier.jpg'.
// Esprit recherche : objets anciens et de collection, lumiere naturelle, fonds neutres ou interieurs anciens.
// Pas d'esthetique de bijouterie ou de vitrine commerciale neuve.
export const IMAGES = {
  // Florian Messeau (photos reelles uniquement, jamais de banque d'images)
  'florian-hero': null,        // Florian examinant un objet ancien, plan poitrine, 4:5
  'florian-portrait': null,    // Portrait de Florian dans un interieur ancien, 4:5
  'florian-loupe': null,       // Florian lisant un poincon ou une signature a la loupe, 1:1
  'florian-visite': null,      // Florian chez un client, face a un meuble ancien, 1:1
  // Ambiances et services
  og: null,                    // Image de partage reseaux sociaux, 1200 x 630
  loupe: null,                 // Objet ancien examine a la loupe, sans visage, 4:5
  succession: null,            // Salon ancien meuble, objets de famille, sans personne, 4:5
  // Objets recherches
  mobilier: null,
  'pate-de-verre': null,
  'vaisselle-verre-argenterie': null,
  'sculptures-bronzes': null,
  'pendules-horloges': null,
  'montres-bijoux': null,
  'tableaux-tapisseries': null,
  tapis: null,
  'robes-vetements-de-marque': null,
  'briquets-stylos': null,
  'lustres-miroirs': null,
  'arts-asiatiques-africains': null,
  'vins-spiritueux': null,
  'instruments-de-musique': null,
  'sacs-bagagerie': null,
  // Villes d'intervention (paysage 4:3)
  'ville-marrakech': null,
  'ville-casablanca': null,
  'ville-rabat': null,
  'ville-tanger': null,
  'ville-fes': null,
  'ville-agadir': null,
};
