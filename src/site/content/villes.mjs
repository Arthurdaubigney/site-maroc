// Pages ville : /zones-intervention/<slug>. Contenu propre a chaque ville (pas de page satellite
// dupliquee) : contexte local, objets frequemment rencontres, quartiers desservis.

export const VILLES = [
  {
    slug: 'antiquaire-marrakech',
    ville: 'Marrakech',
    title: 'Antiquaire à Marrakech : estimation et rachat | Florian Messeau',
    description: 'Antiquaire et expert à Marrakech : estimation gratuite et rachat d\'antiquités, de tapis anciens, de mobilier et d\'objets d\'art, de la Médina à la Palmeraie.',
    lead: 'De la Médina à la Palmeraie, Florian Messeau estime et achète les antiquités et objets d\'art des particuliers, des riads et des villas de Marrakech.',
    contexte: [
      'Marrakech concentre des collections d\'une grande diversité : objets marocains transmis dans les familles, mais aussi mobilier, tableaux et objets d\'art européens rassemblés par les résidents étrangers installés dans les riads et les villas depuis les années 1960.',
      'Lors d\'une vente de riad ou d\'un départ, le contenu de la maison mérite d\'être examiné avant d\'être dispersé : tapis anciens du Haut Atlas, luminaires en cuivre, portes sculptées et peinture orientaliste s\'y côtoient souvent.',
    ],
    quartiers: ['Médina', 'Guéliz', 'Hivernage', 'Palmeraie', 'Route de l\'Ourika', 'Amelkis', 'Targa'],
    objets: ['tapis', 'tableaux-tapisseries', 'lustres-miroirs', 'mobilier-ancien-contemporain'],
  },
  {
    slug: 'antiquaire-casablanca',
    ville: 'Casablanca',
    title: 'Antiquaire à Casablanca : estimation et rachat | Florian Messeau',
    description: 'Antiquaire et expert à Casablanca : estimation gratuite et rachat de mobilier Art déco, tableaux, argenterie et objets d\'art, d\'Anfa au centre-ville.',
    lead: 'D\'Anfa au centre-ville Art déco, Florian Messeau se déplace à Casablanca pour estimer et acheter vos antiquités et objets d\'art.',
    contexte: [
      'Casablanca possède l\'un des plus riches ensembles d\'architecture Art déco au monde, et les appartements du centre-ville ont souvent conservé du mobilier, des luminaires et des objets de la même époque.',
      'Les grandes familles casablancaises ont aussi réuni des collections de peinture marocaine moderne, d\'argenterie et de bijoux. Florian Messeau les examine sur place, avec discrétion.',
    ],
    quartiers: ['Anfa', 'Centre-ville', 'Gauthier', 'Racine', 'Bourgogne', 'Californie', 'Ain Diab', 'Oasis'],
    objets: ['mobilier-ancien-contemporain', 'tableaux-tapisseries', 'vaisselle-verre-argenterie', 'montres-bijoux'],
  },
  {
    slug: 'antiquaire-rabat',
    ville: 'Rabat',
    title: 'Antiquaire à Rabat : estimation et rachat | Florian Messeau',
    description: 'Antiquaire et expert à Rabat : estimation gratuite et rachat de tapis de Rabat, broderies, mobilier, tableaux et objets d\'art, du Souissi aux Oudayas.',
    lead: 'Du Souissi aux Oudayas, Florian Messeau estime et achète à Rabat les antiquités, tapis et objets d\'art des familles et des résidents.',
    contexte: [
      'Rabat a donné son nom à un style de tapis urbain réputé, et ses broderies anciennes comptent parmi les plus fines du Maroc. On y trouve aussi de nombreux intérieurs diplomatiques et administratifs riches en mobilier européen.',
      'Les départs de diplomates et de cadres expatriés sont souvent l\'occasion de vendre une collection constituée au fil des affectations : arts asiatiques, tableaux, argenterie.',
    ],
    quartiers: ['Souissi', 'Hay Riad', 'Agdal', 'Hassan', 'Les Orangers', 'Kasbah des Oudayas', 'Salé'],
    objets: ['tapis', 'robes-vetements-de-marque', 'arts-asiatiques-africains', 'vaisselle-verre-argenterie'],
  },
  {
    slug: 'antiquaire-tanger',
    ville: 'Tanger',
    title: 'Antiquaire à Tanger : estimation et rachat | Florian Messeau',
    description: 'Antiquaire et expert à Tanger : estimation gratuite et rachat de mobilier, tableaux et collections européennes, de la Kasbah à la Vieille Montagne.',
    lead: 'De la Kasbah à la Vieille Montagne, Florian Messeau estime et achète à Tanger les antiquités et collections héritées de l\'histoire internationale de la ville.',
    contexte: [
      'Longtemps ville internationale, Tanger a accueilli artistes, écrivains et collectionneurs du monde entier. Leurs maisons ont souvent conservé mobilier européen, tableaux, livres et objets de voyage.',
      'Ces collections mêlent volontiers les époques et les origines : c\'est précisément là qu\'une expertise attentive fait la différence entre un objet décoratif et une pièce de collection.',
    ],
    quartiers: ['Kasbah', 'Médina', 'Marshan', 'Vieille Montagne', 'Malabata', 'Boulevard Pasteur', 'Cap Spartel'],
    objets: ['tableaux-tapisseries', 'mobilier-ancien-contemporain', 'instruments-de-musique', 'briquets-stylos'],
  },
  {
    slug: 'antiquaire-fes',
    ville: 'Fès',
    title: 'Antiquaire à Fès : estimation et rachat | Florian Messeau',
    description: 'Antiquaire et expert à Fès : estimation gratuite et rachat de céramiques, dinanderie, bijoux anciens et broderies, de la Médina à la Ville nouvelle.',
    lead: 'De Fès el-Bali à la Ville nouvelle, Florian Messeau estime et achète les objets d\'art et d\'artisanat anciens des familles fassies.',
    contexte: [
      'Capitale historique de l\'artisanat marocain, Fès a produit des céramiques au bleu caractéristique, une dinanderie d\'une grande finesse, des bijoux en or émaillé et des broderies recherchées.',
      'Les maisons de la Médina conservent souvent ces objets depuis plusieurs générations. Leur valeur dépend de l\'ancienneté et de la qualité d\'exécution, que seul un examen permet d\'établir.',
    ],
    quartiers: ['Fès el-Bali', 'Fès el-Jdid', 'Ville nouvelle', 'Route d\'Immouzer', 'Atlas'],
    objets: ['vaisselle-verre-argenterie', 'montres-bijoux', 'sculptures-bronzes', 'tapis'],
  },
  {
    slug: 'antiquaire-agadir',
    ville: 'Agadir',
    title: 'Antiquaire à Agadir : estimation et rachat | Florian Messeau',
    description: 'Antiquaire et expert à Agadir et dans le Souss : estimation gratuite et rachat de bijoux berbères, tapis, mobilier et objets d\'art des résidents et des villas.',
    lead: 'À Agadir et dans le Souss, Florian Messeau se déplace pour estimer et acheter les antiquités, bijoux et objets d\'art des particuliers.',
    contexte: [
      'Le Souss est la terre des bijoux berbères en argent et des tapis de Taznakht. Agadir accueille aussi de nombreux résidents européens dont les villas renferment mobilier, tableaux et objets rapportés d\'Europe.',
      'Lors d\'un retour en Europe ou d\'une succession, Florian Messeau examine l\'ensemble sur place et propose une offre globale ou objet par objet.',
    ],
    quartiers: ['Centre-ville', 'Founty', 'Talborjt', 'Charaf', 'Taghazout', 'Tiznit', 'Taroudant'],
    objets: ['montres-bijoux', 'tapis', 'mobilier-ancien-contemporain', 'sacs-bagagerie'],
  },
];
