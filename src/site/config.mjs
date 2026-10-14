// Configuration centrale du site. Toute information a remplacer avant la mise en ligne est ici,
// et nulle part ailleurs : les pages, le JSON-LD, le sitemap et llms.txt en derivent.

export const SITE = {
  // A REMPLACER : domaine definitif (sans slash final)
  url: 'https://site-maroc.vercel.app',
  name: 'François Secula',
  tagline: 'Antiquaire français, expert en objets d\'art au Maroc',
  expert: {
    name: 'François Secula',
    jobTitle: 'Antiquaire et expert en objets d\'art',
  },
  // Coordonnees (NAP) : a garder identiques sur le site, le JSON-LD et la fiche Google Business Profile.
  // Le contact principal passe par le formulaire Tally (page /contact) ; le telephone reste affiche.
  phone: { display: '06 58 59 66 73', e164: '+212658596673' },
  address: {
    // Bureaux
    street: '42 Q.I Sidi Ghanem 158',
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
  tallyFormId: 'aQVbv9',
  // A COMPLETER : conversion Google Ads, declenchee uniquement sur /merci apres un envoi reel du formulaire.
  // id = 'AW-XXXXXXXXX', conversionLabel = libelle de l'action de conversion. null = aucune balise chargee.
  googleAds: { id: null, conversionLabel: null },
  lastmod: '2026-09-24',
  // Editeur du site (mentions legales) : entreprise individuelle active (attestation RNE du 09/10/2026).
  // Ne pas publier la date de naissance ni les prenoms secondaires : non requis.
  // Ne pas reprendre l'ancienne entreprise SIREN 517 211 017, radiee en 2009.
  editeur: {
    name: 'François Secula',
    legalForm: 'Entrepreneur individuel',
    siren: '529 601 486',
    siret: '529 601 486 00010',
    tva: 'FR51529601486',
    registre: 'Registre national des entreprises (RNE), depuis le 20 janvier 2011',
    address: '21 rue du Docteur Tassin, 21200 Beaune, France',
    // E-mail affiche UNIQUEMENT dans les mentions legales et la confidentialite (contact principal : formulaire Tally)
    email: 'francoisseculapub@gmail.com',
  },
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
// Une photo = une chaine ('/images/x.webp') ou un objet { src, small, alt, position } :
//   small    = variante 448 px pour les petits ecrans (srcset)
//   alt      = description reelle de la photo (prioritaire sur le texte par defaut de l'emplacement).
//              Regle : ce qu'on voit, puis le service (estimation, rachat, expertise) et le lieu, <= 125 caracteres.
//              Photos libres : l'objet illustre un "type de piece", jamais un objet rachete par François Secula.
//   position = cadrage (object-position) quand le cadre carre ou paysage coupe la photo
// Esprit recherche : objets anciens et de collection, lumiere naturelle, fonds neutres ou interieurs anciens.
const florian = (name, alt, position) => ({ src: `/images/${name}.webp`, small: `/images/${name}-448.webp`, alt, position });
// Photos de Florian prises en situation (bureaux, seance photo) : WebP 1200 px + variante 600 px
const pro = (name, alt, position, widths = [600, 1200]) => ({ src: `/images/${name}.webp`, small: `/images/${name}-600.webp`, widths, alt, position });
const PHOTOS = {
  ensemble: florian('antiquaire-maroc-antiquaire-marrakech', 'Florian, expert de l\'équipe, estime un vase ancien, un tableau au cadre doré et un fauteuil à têtes de lion', '22% 32%'),
  tableau: pro('antiquaire-maroc-tableau-cadre-dore', 'Florian, expert de l\'équipe, examine une peinture ancienne dans son cadre doré, à Marrakech', '50% 30%', [600, 1200]),
  cristal: florian('antiquaire-maroc-vase-cristal-taille', 'Florian, expert de l\'équipe, examine un vase en cristal taillé à décor vert pour l\'estimer', '50% 38%'),
  montres: pro('antiquaire-maroc-montres-bureau', 'Florian, expert de l\'équipe, examine un coffret de montres de collection à Marrakech', '50% 30%', [600, 1200]),
  sculpture: pro('antiquaire-maroc-sculpture-oiseaux-argent', 'Florian, expert de l\'équipe, examine une sculpture d\'oiseaux en métal argenté', '50% 32%', [600, 1200]),
  porcelaine: pro('antiquaire-maroc-vase-famille-rose', 'Florian, expert de l\'équipe, examine un vase chinois en porcelaine famille rose pour l\'estimer', '50% 40%', [600, 1187]),
};

// Photos professionnelles de Florian, expert de l'equipe (seance photo) : WebP 1200 px (1067 px en portrait) + variante 600 px
const PRO = {
  portrait: pro('antiquaire-maroc-portrait-antiquaire', 'Florian, expert de l\'équipe, assis dans un fauteuil ancien parmi des antiquités', '50% 30%', [600, 1067]),
  livre: pro('antiquaire-maroc-livre-ancien', 'Florian, expert de l\'équipe, feuillette un livre ancien près d\'une commode marquetée', '55% 30%', [600, 1067]),
  vase: pro('antiquaire-maroc-expertise-vase-chinois', 'Florian, expert de l\'équipe, examine un vase chinois de Canton à monture en bronze', '12% 45%'),
  // Meme photo, cadrage pour les formats verticaux et 4:3 (visage + mains + vase)
  vaseVertical: pro('antiquaire-maroc-expertise-vase-chinois', 'Florian, expert de l\'équipe, examine un vase chinois de Canton à monture en bronze', '42% 45%'),
  vinEtiquette: pro('antiquaire-maroc-vin-de-collection', 'Florian, expert de l\'équipe, lit l\'étiquette d\'une bouteille de vin ancienne', '55% 40%'),
  vin: pro('antiquaire-maroc-estimation-vin', 'Florian, expert de l\'équipe, présente une bouteille de vin de collection à estimer'),
};

// Photos libres de droits (CC0) : The Met, Cleveland Museum of Art, WordPress Photo Directory.
// Credits mentionnes dans les mentions legales, meme si la licence CC0 ne l'impose pas.
const libre = (name, alt, position) => ({ src: `/images/${name}.webp`, small: `/images/${name}-600.webp`, widths: [600, 1200], alt, position });
const LIBRES = {
  tapis: libre('objet-tapis-ancien', 'Tapis ancien noué main à médaillons rouges et bleus, XIXe siècle : type de pièce estimée et rachetée au Maroc'),
  vase: libre('objet-vase-verre-art-nouveau', 'Vase Art nouveau en verre multicouche gravé à l\'acide, 1896 : pâte de verre recherchée pour estimation et rachat', '50% 54%'),
  lustre: libre('objet-lustre-cristal', 'Lustre ancien en cristal à pampilles, type de luminaire estimé et racheté par François Secula au Maroc'),
  pendule: libre('objet-pendule-bronze-dore', 'Pendule Louis XVI en bronze doré et marbre, vers 1783 : pendules anciennes estimées et rachetées au Maroc'),
  robe: libre('objet-robe-ancienne', 'Robe ancienne en mousseline fleurie, vers 1872 : vêtements anciens et de créateur estimés et rachetés au Maroc', '50% 20%'),
  violon: libre('objet-violon-ancien', 'Violon ancien, vers 1685 : instruments de musique anciens estimés et rachetés par François Secula'),
  salon: libre('ambiance-salon-ancien', 'Salon ancien meublé d\'antiquités, lustre et miroir doré : inventaire et estimation lors d\'une succession'),
  marrakech: libre('ville-marrakech-koutoubia', 'Minaret de la Koutoubia à Marrakech, où François Secula estime et rachète antiquités et objets d\'art', '50% 30%'),
  casablanca: libre('ville-casablanca-mosquee-hassan-ii', 'Mosquée Hassan II à Casablanca, ville où François Secula se déplace pour estimer antiquités et objets d\'art', '50% 12%'),
  // Cleveland Museum of Art (CC0) : pieces de musee, fond neutre ; commode et coupe elargies au carre (fond prolonge)
  oasis: libre('objet-tableau-orientaliste-oasis', 'Tableau orientaliste du XIXe siècle, caravane quittant une oasis : peinture orientaliste estimée au Maroc', '62% 50%'),
  solidus: libre('objet-piece-or-solidus', 'Pièce d\'or ancienne à l\'effigie d\'un empereur byzantin : monnaies anciennes estimées et rachetées au Maroc'),
  commode: libre('objet-commode-louis-xv', 'Commode Louis XV en marqueterie et bronzes dorés, dessus de marbre : meuble ancien estimé et racheté au Maroc'),
  coupe: libre('objet-verre-cristal-grave', 'Verre ancien en cristal taillé et gravé sur pied balustre : verres en cristal estimés et rachetés au Maroc'),
  // Flickr / Wikimedia Commons (CC BY 2.0 et CC BY-SA 2.0) : credits nominatifs dans les mentions legales
  sacLV: { ...libre('objet-sac-louis-vuitton-alma', 'Sac Louis Vuitton Alma en toile Damier : sacs de luxe estimés et rachetés par François Secula au Maroc', '18% 50%'), widths: [600, 1024] },
  sacHermes: libre('objet-sac-hermes-birkin', 'Sac Hermès Birkin en autruche et carré de soie Hermès : sacs de luxe estimés et rachetés au Maroc', '47% 55%'),
  reliure: libre('objet-reliure-orientale-ancienne', 'Reliure orientale ancienne en cuir doré à médaillon : livres anciens et manuscrits estimés et rachetés au Maroc'),
  // WordPress Photo Directory (CC0)
  the: libre('objet-service-the-argent-maroc', 'Théières marocaines en métal argenté ciselé sur plateaux, verres à thé : argenterie estimée et rachetée au Maroc', '55% 55%'),
  medersa: { ...libre('maroc-medersa-ben-youssef', 'Cour de la médersa Ben Youssef à Marrakech vue à travers un arc en stuc ciselé, bassin et zellige', '50% 50%'), widths: [449, 900] },
  arc: libre('maroc-medersa-arc', 'Balcon en cèdre et arc outrepassé sculpté de la médersa Ben Youssef, à Marrakech', '50% 50%'),
};

// Photos fournies par le client
const FOURNIES = {
  briquets: { ...libre('objet-briquets-stylos-anciens', 'Briquets anciens ciselés et stylos plume de collection, estimés et rachetés par François Secula au Maroc'), widths: [600, 1024] },
  rabat: libre('ville-rabat-kasbah-des-oudayas', 'Kasbah des Oudayas illuminée à Rabat, ville où François Secula estime les antiquités à domicile'),
  tanger: libre('ville-tanger-ruelle-medina', 'Ruelle blanchie à la chaux et barques de pêche sur la côte marocaine, où François Secula se déplace pour estimer', '40% 50%'),
  fes: libre('ville-fes-medina', 'Toits de la médina de Fès au couchant, ville où François Secula estime et rachète les objets anciens'),
  bijouxEmailles: libre('objet-bijoux-berberes-emailles', 'Bracelets berbères en argent émaillé sertis de corail, fibule et pendentif anciens : bijoux berbères rachetés au Maroc'),
  parureAmbre: { ...libre('objet-parure-berbere-ambre', 'Parure berbère ancienne : collier d\'ambre, fibules en argent ciselé et bandeau à pièces, bijoux rachetés au Maroc', '50% 45%'), widths: [600, 1250] },
  fourrure: { ...libre('objet-manteau-fourrure', 'Manteau de fourrure ancien à col châle sur mannequin : fourrures estimées et rachetées au Maroc'), widths: [600, 852] },
  agadir: libre('ville-agadir-baie', 'Baie d\'Agadir vue d\'Agadir Oufella, ville où François Secula estime antiquités et objets d\'art à domicile', '50% 60%'),
};

export const IMAGES = {
  // Florian, expert de l'equipe (vraies photos uniquement, jamais de banque d'images)
  'florian-hero': PRO.livre,
  'florian-portrait': PRO.portrait,
  'florian-livre': PRO.livre,
  'florian-vase': PRO.vase,
  'florian-vin': PRO.vinEtiquette,
  'florian-loupe': PHOTOS.sculpture,
  'florian-visite': PHOTOS.porcelaine,
  // Ambiances et services
  og: '/images/antiquaire-maroc-og.jpg', // Image de partage reseaux sociaux, 1200 x 630
  loupe: PRO.vaseVertical,                     // Pages services
  succession: LIBRES.salon,
  // Objets recherches
  // Photo d'ensemble elargie en paysage (fond prolonge) : toute la scene tient, centree, dans les cartes 4:3
  mobilier: LIBRES.commode,
  'mobilier-florian': { src: '/images/antiquaire-maroc-mobilier-ancien.webp', small: '/images/antiquaire-maroc-mobilier-ancien-600.webp', widths: [600, 1200], alt: 'Florian, expert de l\'équipe, avec un fauteuil ancien à têtes de lion, un vase et un tableau' },
  'pate-de-verre': LIBRES.vase,
  'vaisselle-verre-argenterie': LIBRES.the,
  cristallerie: LIBRES.coupe,
  'cristallerie-florian': PHOTOS.cristal,
  'bijoux-berberes': FOURNIES.bijouxEmailles,
  'bijoux-berberes-parure': FOURNIES.parureAmbre,
  'pieces-de-monnaie': LIBRES.solidus,
  'manteaux-fourrure': FOURNIES.fourrure,
  // Ambiance marocaine (accueil, presentation)
  'maroc-medersa': LIBRES.medersa,
  'maroc-arc': LIBRES.arc,
  'sculptures-bronzes': PHOTOS.sculpture,
  'pendules-horloges': LIBRES.pendule,
  // Vignettes 4:3 : recadrage serre sur les montres (la photo entiere reste sur la page categorie)
  'montres-bijoux': { ...PHOTOS.montres, tile: { src: '/images/antiquaire-maroc-montres-detail.webp', small: '/images/antiquaire-maroc-montres-detail-600.webp', widths: [600, 1000], position: '50% 50%', alt: 'Montres de collection dans leur coffret en cuir, présentées par Florian, expert de l\'équipe, lors d\'une estimation à Marrakech' } },
  'tableaux-tapisseries': LIBRES.oasis,
  'livres-anciens': LIBRES.reliure,
  'florian-tableau': PHOTOS.tableau,
  tapis: LIBRES.tapis,
  'robes-vetements-de-marque': LIBRES.robe,
  'briquets-stylos': FOURNIES.briquets,
  'lustres-miroirs': LIBRES.lustre,
  'arts-asiatiques-africains': PHOTOS.porcelaine,
  'florian-vase-vertical': PRO.vaseVertical,
  'vins-spiritueux': PRO.vin,
  'instruments-de-musique': LIBRES.violon,
  'sacs-bagagerie': LIBRES.sacLV,
  'sacs-hermes': LIBRES.sacHermes,
  // Villes d'intervention (paysage 4:3)
  'ville-marrakech': LIBRES.marrakech,
  'ville-casablanca': LIBRES.casablanca,
  'ville-rabat': FOURNIES.rabat,
  'ville-tanger': FOURNIES.tanger,
  'ville-fes': FOURNIES.fes,
  'ville-agadir': FOURNIES.agadir,
};
