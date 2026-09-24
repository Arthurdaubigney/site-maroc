// Pages de services : /expertise-achat/<slug>. Une intention de recherche par page.

export const SERVICES = [
  {
    slug: 'estimation-gratuite',
    nav: 'Estimation gratuite',
    icon: 'search',
    h1: 'Estimation gratuite d\'antiquités et d\'objets d\'art',
    title: 'Estimation gratuite d\'antiquités au Maroc | Florian Messeau',
    description: 'Faites estimer gratuitement vos antiquités et objets d\'art au Maroc : premier avis sur photos, examen à domicile, estimation argumentée et sans engagement.',
    summary: 'Premier avis gratuit sur photos, puis examen de l\'objet chez vous ou en galerie. Sans engagement.',
    lead: 'Vous souhaitez connaître la valeur d\'un objet avant de décider quoi en faire ? Florian Messeau vous donne un premier avis gratuit sur photos, puis une estimation argumentée après examen, sans aucune obligation de vendre.',
    sections: [
      ['Comment se déroule l\'estimation', null, [
        '<strong>Vous envoyez quelques photos</strong> par WhatsApp, par e-mail ou via le formulaire : vue d\'ensemble, signature, poinçons, dessous.',
        '<strong>Vous recevez rapidement un premier avis</strong> : intérêt de l\'objet, piste d\'attribution et fourchette de valeur quand les photos le permettent.',
        '<strong>L\'objet est examiné</strong> chez vous ou à la galerie. L\'examen physique confirme l\'époque, l\'authenticité et l\'état.',
        '<strong>Vous décidez</strong> : conserver, vendre à Florian Messeau, ou demander un rapport d\'expertise écrit.',
      ]],
      ['Une estimation argumentée', 'Chaque estimation s\'appuie sur des ventes comparables récentes, en galerie et en ventes publiques. Florian Messeau vous explique comment il arrive au chiffre : l\'époque, l\'état, la rareté et la demande actuelle du marché.', null],
      ['Gratuite, vraiment', 'Le premier avis et l\'examen en vue d\'un achat ne vous coûtent rien et ne vous engagent à rien. Seul le rapport d\'expertise écrit, destiné à une succession, à un partage ou à une assurance, fait l\'objet d\'un devis préalable.', null],
    ],
    faq: [
      ['Combien de temps faut-il pour obtenir un premier avis ?', 'Peu de temps : Florian Messeau répond rapidement dès réception de photos exploitables.'],
      ['Puis-je faire estimer un objet sans vouloir le vendre ?', 'Oui. Beaucoup de demandes viennent de familles qui veulent simplement connaître la valeur d\'un objet hérité.'],
      ['Estimez-vous à distance ?', 'Le premier avis se donne sur photos. Une estimation ferme demande toujours de voir l\'objet.'],
    ],
  },
  {
    slug: 'expertise-objets-art',
    nav: 'Expertise d\'objets d\'art',
    icon: 'file-text',
    h1: 'Expertise d\'objets d\'art et rapport écrit',
    title: 'Expertise d\'objets d\'art et rapport écrit | Florian Messeau',
    description: 'Rapport d\'expertise écrit pour succession, partage, assurance ou vente : identification, datation, état et valeur de vos objets d\'art et antiquités au Maroc.',
    summary: 'Rapport écrit pour une succession, un partage, une assurance ou une vente.',
    lead: 'Certaines situations demandent un document écrit : partage entre héritiers, déclaration de succession, contrat d\'assurance ou préparation d\'une vente. Florian Messeau rédige un rapport d\'expertise détaillé pour chaque objet ou pour un ensemble.',
    sections: [
      ['Ce que contient le rapport', null, [
        'La description précise de l\'objet : nature, matériaux, dimensions, marques et signatures',
        'La datation et l\'attribution, avec le degré de certitude',
        'L\'état de conservation et les restaurations constatées',
        'La valeur retenue selon l\'usage : valeur de marché, valeur d\'assurance ou valeur de partage',
        'Des photographies de chaque objet',
      ]],
      ['Pour qui ?', 'Particuliers, familles, notaires, avocats et assureurs. Le rapport peut porter sur un objet unique comme sur l\'inventaire complet d\'une maison.', null],
      ['Tarif', 'Le rapport d\'expertise fait l\'objet d\'un devis préalable, établi selon le nombre d\'objets et le temps de recherche nécessaire. Vous le connaissez avant tout engagement.', null],
    ],
    faq: [
      ['Quelle différence entre estimation et expertise ?', 'L\'estimation est un avis de valeur, gratuit. L\'expertise est un document écrit, détaillé et engageant, utilisable auprès d\'un notaire ou d\'un assureur.'],
      ['Le rapport est-il utilisable pour une assurance ?', 'Oui. Il indique une valeur d\'assurance et comporte les photographies nécessaires en cas de sinistre.'],
    ],
  },
  {
    slug: 'achat-antiquites',
    nav: 'Achat d\'antiquités',
    icon: 'banknote',
    h1: 'Achat d\'antiquités et d\'objets d\'art au Maroc',
    title: 'Achat d\'antiquités à Marrakech et au Maroc | Florian Messeau',
    description: 'Florian Messeau achète vos antiquités et objets de collection à Marrakech et partout au Maroc : proposition claire après examen, enlèvement pris en charge.',
    summary: 'Proposition claire après examen, enlèvement pris en charge.',
    lead: 'Vous souhaitez vendre un objet ancien, une collection ou le mobilier d\'une maison ? Florian Messeau examine vos objets, vous fait une proposition claire et s\'occupe de l\'enlèvement.',
    sections: [
      ['Une proposition claire', 'Après examen, vous recevez une proposition de rachat détaillée, objet par objet si vous le souhaitez. Vous êtes libre de l\'accepter ou de la refuser, sans frais.', null],
      ['Enlèvement', null, [
        'Démontage et emballage soignés, même pour les pièces fragiles',
        'Transport pris en charge',
        'Enlèvement partout au Maroc, sur rendez-vous',
      ]],
      ['Ce que nous achetons', 'Mobilier, tableaux, tapis, argenterie, bijoux et montres, bronzes, verrerie d\'art, luminaires, objets asiatiques et africains, et bien d\'autres. Consultez la liste complète des objets recherchés.', null],
    ],
    faq: [
      ['Achetez-vous des objets à l\'unité ?', 'Oui, une pièce isolée comme une collection entière.'],
      ['Qui s\'occupe du transport ?', 'Florian Messeau organise l\'enlèvement, l\'emballage et le transport, où que vous soyez au Maroc.'],
    ],
  },
  {
    slug: 'succession-debarras',
    nav: 'Successions et débarras',
    icon: 'home',
    h1: 'Successions, inventaires et débarras de maisons',
    title: 'Succession et débarras de maison au Maroc | Florian Messeau',
    description: 'Inventaire, estimation et rachat du contenu d\'une maison ou d\'un appartement lors d\'une succession ou d\'un déménagement au Maroc, en toute discrétion.',
    summary: 'Inventaire, estimation et rachat du contenu d\'une maison, en toute discrétion.',
    lead: 'Une succession ou un départ à l\'étranger oblige souvent à vider une maison entière. Florian Messeau vous accompagne de l\'inventaire à l\'enlèvement, avec tact et discrétion.',
    sections: [
      ['Un accompagnement complet', null, [
        'Visite de la maison et repérage des objets de valeur, pièce par pièce',
        'Inventaire et estimation, avec rapport écrit si le notaire le demande',
        'Offre de rachat globale ou objet par objet',
        'Enlèvement organisé à la date qui vous convient',
      ]],
      ['Discrétion et respect', 'Vider la maison d\'un proche est un moment délicat. Les visites se font sur rendez-vous, sans publicité, et chaque objet est traité avec soin.', null],
      ['Pour les héritiers à l\'étranger', 'Si vous vivez hors du Maroc, l\'essentiel peut se faire à distance : visite en votre absence avec une personne de confiance, compte rendu photographié et échanges à distance.', null],
    ],
    faq: [
      ['Travaillez-vous avec les notaires ?', 'Oui. L\'inventaire et le rapport d\'expertise peuvent être remis directement à l\'étude notariale.'],
      ['Faut-il trier avant votre visite ?', 'Non. Ne jetez rien avant la visite : des objets de valeur se cachent souvent parmi ce qui semble sans intérêt.'],
    ],
  },
];
