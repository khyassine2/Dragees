import type { Metadata } from 'next';
import { BookingForm } from '@/components/BookingForm';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Rendez-vous',
  description:
    'Prenez rendez-vous au showroom pour vos dragées, votre buffet et votre décoration. Gratuit, sans engagement, devis sous 48 h.',
};

const BookingPage = () => (
  <PageShell>
    <BookingForm />
  </PageShell>
);

export default BookingPage;
