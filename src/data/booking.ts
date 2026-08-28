export type Showroom = {
  id: string;
  city: string;
  address: string;
  hours: string;
};

export type BookingService = {
  id: string;
  label: string;
  duration: string;
  description: string;
};

export const SHOWROOMS: Showroom[] = [
  {
    id: 'fes-showroom',
    city: 'Fès — Showroom',
    address: 'Sur rendez-vous, centre-ville',
    hours: 'Lun – Sam · 10 h – 19 h',
  },
  {
    id: 'fes-domicile',
    city: 'Fès — À domicile',
    address: 'Nous venons chez vous avec les échantillons',
    hours: 'Lun – Sam · sur rendez-vous',
  },
  {
    id: 'regions',
    city: 'Fès & régions',
    address: 'Déplacement pour les fêtes hors ville',
    hours: 'Selon la date de votre fête',
  },
];

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: 'decouverte',
    label: 'Rendez-vous découverte',
    duration: '1 h',
    description:
      'Nous parlons de votre date, de la salle et de vos couleurs, autour d\'une première sélection de dragées.',
  },
  {
    id: 'degustation',
    label: 'Dégustation buffet',
    duration: '1 h 30',
    description:
      'Vous goûtez les pièces sucrées et salées du buffet et composez la carte de votre réception.',
  },
  {
    id: 'decor',
    label: 'Essai décoration',
    duration: '1 h',
    description:
      'Montage grandeur nature d\'une table dressée pour valider les tons, les fleurs et la lumière.',
  },
];

export const TIME_SLOTS = [
  '10:00',
  '11:00',
  '12:00',
  '14:30',
  '15:30',
  '16:30',
  '17:30',
];

export const GUEST_RANGES = [
  '30 – 60',
  '60 – 100',
  '100 – 150',
  '150 – 250',
  '250 +',
] as const;

/** The next `count` selectable days, skipping Sundays (the showroom is closed). */
export const getAvailableDays = (count = 14) => {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);

    if (cursor.getDay() !== 0) {
      days.push(new Date(cursor));
    }
  }

  return days;
};

const dayFormatter = new Intl.DateTimeFormat('fr-MA', { weekday: 'short' });
const dateFormatter = new Intl.DateTimeFormat('fr-MA', {
  day: 'numeric',
  month: 'short',
});
const fullDateFormatter = new Intl.DateTimeFormat('fr-MA', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

export const formatDayName = (date: Date) => dayFormatter.format(date);
export const formatDayNumber = (date: Date) => dateFormatter.format(date);
export const formatFullDate = (date: Date) => fullDateFormatter.format(date);
