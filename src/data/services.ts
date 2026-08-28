export type ServiceCategory = {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
};

export type Formula = {
  id: string;
  label: string;
  guests: string;
  from: number;
  includes: string[];
};

export const SERVICES: ServiceCategory[] = [
  {
    slug: 'dragees',
    label: 'Dragées',
    tagline: 'Le détail que l\'on garde',
    description:
      'Amandes d\'Espagne enrobées à la main, chocolats fins et contenants choisis un par un. Chaque ballotin est composé avec vous, du ruban au calligraphié.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b',
    highlights: [
      'Amandes, chocolat et fruits secs',
      'Ballotins, boîtes et coffrets sur mesure',
      'Étiquettes calligraphiées à la main',
      'Dégustation avant commande',
    ],
  },
  {
    slug: 'buffet',
    label: 'Buffet',
    tagline: 'Une table qui se raconte',
    description:
      'Pâtisserie marocaine et française, pièces montées et tables sucrées dressées sur place. Le buffet est pensé comme un décor, pas comme un simple service.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3',
    highlights: [
      'Pâtisserie marocaine et française',
      'Pièces montées et wedding cake',
      'Fontaine de chocolat et bar à thé',
      'Service et dressage sur place',
    ],
  },
  {
    slug: 'decoration',
    label: 'Décoration',
    tagline: 'La lumière avant tout',
    description:
      'Scénographie complète de la salle : arche florale, chemin de table, éclairage chaud et coin photo. Nous installons la veille et démontons après la fête.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    highlights: [
      'Arche florale et fond de scène',
      'Chemin de table et art de la table',
      'Éclairage d\'ambiance et bougies',
      'Installation et démontage inclus',
    ],
  },
];

export const FORMULAS: Formula[] = [
  {
    id: 'intime',
    label: 'Intime',
    guests: '30 à 60 invités',
    from: 4500,
    includes: [
      '60 ballotins de dragées',
      'Table sucrée 5 pièces',
      'Décor de table et bougies',
      'Installation le jour même',
    ],
  },
  {
    id: 'fiancailles',
    label: 'Fiançailles',
    guests: '60 à 150 invités',
    from: 9800,
    includes: [
      'Ballotins personnalisés au nom des invités',
      'Buffet sucré 9 pièces + pièce montée',
      'Arche florale et fond de scène',
      'Éclairage d\'ambiance complet',
      'Coordination le jour J',
    ],
  },
  {
    id: 'grand-jour',
    label: 'Grand jour',
    guests: '150 invités et plus',
    from: 18000,
    includes: [
      'Coffrets dragées haut de gamme',
      'Buffet sucré et salé, service en salle',
      'Scénographie complète de la salle',
      'Coin photo et signalétique calligraphiée',
      'Répétition et coordination sur deux jours',
    ],
  },
];

export const GALLERY = [
  {
    id: 'ballotins',
    caption: 'Ballotins ivoire et ruban satin',
    image: 'https://images.unsplash.com/photo-1522767131594-6b7e96848fba',
  },
  {
    id: 'table',
    caption: 'Table sucrée, fiançailles à Fès',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
  },
  {
    id: 'arche',
    caption: 'Arche florale en tons poudrés',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
  },
  {
    id: 'coffret',
    caption: 'Coffret dragées et chocolat',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9',
  },
  {
    id: 'piece-montee',
    caption: 'Pièce montée trois étages',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d',
  },
  {
    id: 'salle',
    caption: 'Salle dressée, Fès',
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a',
  },
] as const;

export const STEPS = [
  {
    number: '01',
    title: 'Le rendez-vous',
    text: 'Nous écoutons votre projet, la salle, le nombre d\'invités et vos couleurs. Comptez une heure, thé compris.',
  },
  {
    number: '02',
    title: 'La proposition',
    text: 'Vous recevez une planche d\'ambiance, une sélection de dragées à goûter et un devis détaillé sous 48 h.',
  },
  {
    number: '03',
    title: 'Les essais',
    text: 'Dégustation du buffet et validation du décor grandeur nature. Tout s\'ajuste avant de figer quoi que ce soit.',
  },
  {
    number: '04',
    title: 'Le jour J',
    text: 'Installation la veille, coordination sur place, démontage après la fête. Vous n\'avez rien à porter.',
  },
] as const;
