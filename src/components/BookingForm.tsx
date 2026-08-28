'use client';

import { Check, Clock, MapPin } from 'lucide-react';
import { useRef, useState } from 'react';
import { fadeUp, revealImage, revealText } from '@/animations';
import { gsap, prefersReducedMotion } from '@/animations/gsap';
import { Media } from '@/components/Media';
import {
  BOOKING_SERVICES,
  formatDayName,
  formatDayNumber,
  formatFullDate,
  getAvailableDays,
  GUEST_RANGES,
  SHOWROOMS,
  TIME_SLOTS,
} from '@/data/booking';
import { SERVICES } from '@/data/services';
import { useGsapContext } from '@/hooks/useGsapContext';

const BOOKING_IMAGE
  = 'https://images.unsplash.com/photo-1549007994-cb92caebd54b';

const DAYS = getAvailableDays();

type Confirmation = {
  service: string;
  showroom: string;
  date: Date;
  slot: string;
  name: string;
};

const optionClass = (active: boolean) =>
  `border p-4 text-left transition-colors duration-300 ${
    active ? 'border-plum bg-plum text-ivory' : 'border-line hover:border-plum'
  }`;

export const BookingForm = () => {
  const [service, setService] = useState(BOOKING_SERVICES[0]?.id ?? '');
  const [showroom, setShowroom] = useState(SHOWROOMS[0]?.id ?? '');
  const [needs, setNeeds] = useState<string[]>(['dragees']);
  const [guests, setGuests] = useState<string>(GUEST_RANGES[1] ?? '');
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const slotsRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  useGsapContext(rootRef, () => {
    if (headingRef.current) {
      revealText(headingRef.current, { start: 'top 92%' });
    }

    const frame = rootRef.current?.querySelector<HTMLElement>(
      '[data-booking-frame]',
    );

    if (frame) {
      revealImage(frame, {
        inner: frame.querySelector('[data-booking-image]'),
        start: 'top 90%',
      });
    }

    fadeUp('[data-booking-block]', { start: 'top 92%', stagger: 0.08 });
  });

  const toggleNeed = (slug: string) => {
    setNeeds(current =>
      current.includes(slug)
        ? current.filter(item => item !== slug)
        : [...current, slug],
    );
    setError(null);
  };

  const onSelectSlot = (value: string, node: HTMLButtonElement) => {
    setSlot(value);
    setError(null);

    if (!prefersReducedMotion()) {
      gsap.fromTo(
        node,
        { scale: 0.92 },
        { scale: 1, duration: 0.55, ease: 'back.out(2.5)' },
      );
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const day = DAYS[dayIndex];

    if (needs.length === 0) {
      setError('Choisissez au moins une prestation.');
      return;
    }

    if (!slot) {
      setError('Choisissez un créneau horaire.');

      if (slotsRef.current && !prefersReducedMotion()) {
        gsap.fromTo(
          slotsRef.current,
          { x: -6 },
          { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.35)' },
        );
      }

      return;
    }

    if (name.trim().length < 2 || phone.trim().length < 8) {
      setError('Renseignez votre nom et un numéro de téléphone valide.');
      return;
    }

    if (!day) {
      return;
    }

    setError(null);
    setConfirmation({
      service: BOOKING_SERVICES.find(item => item.id === service)?.label ?? '',
      showroom: SHOWROOMS.find(item => item.id === showroom)?.city ?? '',
      date: day,
      slot,
      name: name.trim(),
    });

    requestAnimationFrame(() => {
      const node = confirmationRef.current;

      if (!node) {
        return;
      }

      node.scrollIntoView({ behavior: 'smooth', block: 'center' });

      if (!prefersReducedMotion()) {
        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' },
        );
      }
    });
  };

  const activeShowroom = SHOWROOMS.find(item => item.id === showroom);
  const selectedDay = DAYS[dayIndex];

  if (confirmation) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-[720px] flex-col justify-center px-4 py-32 sm:px-6">
        <div ref={confirmationRef}>
          <div className="grid size-12 place-items-center rounded-full bg-rose text-ivory">
            <Check className="size-6" strokeWidth={1.5} />
          </div>

          <h1 className="mt-8 font-display text-editorial font-light">
            Rendez-vous confirmé
          </h1>

          <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-taupe">
            Merci
            {' '}
            {confirmation.name}
            . Nous vous confirmons le rendez-vous par WhatsApp et venons avec
            une première sélection. Un rappel vous sera envoyé la veille.
          </p>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            <div className="flex justify-between gap-6 py-4">
              <dt className="label-micro text-taupe">Rendez-vous</dt>
              <dd className="text-sm">{confirmation.service}</dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="label-micro text-taupe">Lieu</dt>
              <dd className="text-sm">{confirmation.showroom}</dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="label-micro text-taupe">Date</dt>
              <dd className="text-sm">{formatFullDate(confirmation.date)}</dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="label-micro text-taupe">Heure</dt>
              <dd className="text-sm tabular-nums">{confirmation.slot}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => {
              setConfirmation(null);
              setSlot(null);
              setName('');
              setPhone('');
              setNote('');
            }}
            className="mt-8 label-micro underline underline-offset-[6px] transition-colors duration-300 hover:text-rose"
          >
            Prendre un autre rendez-vous
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="pt-28 pb-20 md:pt-36 lg:pb-28">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <p className="label-micro text-taupe">Rendez-vous</p>
        <h1
          ref={headingRef}
          className="mt-6 max-w-[18ch] font-display text-editorial font-light opacity-0"
        >
          Parlons de votre réception
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* min-w-0 lets the date strip shrink instead of widening the page. */}
          <form onSubmit={onSubmit} className="min-w-0 lg:col-span-7">
            <fieldset data-booking-block className="min-w-0 opacity-0">
              <legend className="label-micro text-taupe">
                Type de rendez-vous
              </legend>
              <div className="mt-4 grid gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
                {BOOKING_SERVICES.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setService(option.id)}
                    aria-pressed={service === option.id}
                    className={optionClass(service === option.id)}
                  >
                    <span className="block text-sm font-medium">
                      {option.label}
                    </span>
                    <span
                      className={`mt-1 block label-micro ${
                        service === option.id ? 'text-ivory/70' : 'text-taupe'
                      }`}
                    >
                      {option.duration}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[0.8125rem] text-taupe">
                {BOOKING_SERVICES.find(item => item.id === service)?.description}
              </p>
            </fieldset>

            <fieldset data-booking-block className="mt-10 min-w-0 opacity-0">
              <legend className="label-micro text-taupe">
                Ce dont vous avez besoin
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICES.map(option => (
                  <button
                    key={option.slug}
                    type="button"
                    onClick={() => toggleNeed(option.slug)}
                    aria-pressed={needs.includes(option.slug)}
                    className={`border px-5 py-3 text-sm transition-colors duration-300 ${
                      needs.includes(option.slug)
                        ? 'border-plum bg-plum text-ivory'
                        : 'border-line text-cocoa hover:border-plum'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset data-booking-block className="mt-10 min-w-0 opacity-0">
              <legend className="label-micro text-taupe">Invités</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {GUEST_RANGES.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setGuests(option)}
                    aria-pressed={guests === option}
                    className={`flex-1 min-w-24 border px-4 py-3 text-sm tabular-nums transition-colors duration-300 ${
                      guests === option
                        ? 'border-plum bg-plum text-ivory'
                        : 'border-line text-cocoa hover:border-plum'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset data-booking-block className="mt-10 min-w-0 opacity-0">
              <legend className="label-micro text-taupe">Lieu du rendez-vous</legend>
              <div className="mt-4 grid gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
                {SHOWROOMS.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setShowroom(option.id)}
                    aria-pressed={showroom === option.id}
                    className={optionClass(showroom === option.id)}
                  >
                    <span className="block text-sm font-medium">
                      {option.city}
                    </span>
                    <span
                      className={`mt-1 block text-[0.75rem] ${
                        showroom === option.id ? 'text-ivory/70' : 'text-taupe'
                      }`}
                    >
                      {option.address}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset data-booking-block className="mt-10 min-w-0 opacity-0">
              <legend className="label-micro text-taupe">Date</legend>
              {/* The strip scrolls inside its own box; the page never does. */}
              <div className="no-scrollbar mt-4 flex w-full max-w-full gap-2 overflow-x-auto overscroll-x-contain">
                {DAYS.map((day, index) => (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => setDayIndex(index)}
                    aria-pressed={dayIndex === index}
                    className={`w-18 shrink-0 border px-3 py-3 text-center transition-colors duration-300 ${
                      dayIndex === index
                        ? 'border-plum bg-plum text-ivory'
                        : 'border-line hover:border-plum'
                    }`}
                  >
                    <span className="block label-micro">
                      {formatDayName(day)}
                    </span>
                    <span className="mt-1 block text-sm tabular-nums">
                      {formatDayNumber(day)}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset data-booking-block className="mt-10 min-w-0 opacity-0">
              <legend className="label-micro text-taupe">Créneau</legend>
              <div ref={slotsRef} className="mt-4 flex flex-wrap gap-2">
                {TIME_SLOTS.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={event => onSelectSlot(option, event.currentTarget)}
                    aria-pressed={slot === option}
                    className={`flex-1 min-w-20 border px-4 py-3 text-sm tabular-nums transition-colors duration-300 ${
                      slot === option
                        ? 'border-plum bg-plum text-ivory'
                        : 'border-line text-cocoa hover:border-plum'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset data-booking-block className="mt-10 min-w-0 opacity-0">
              <legend className="label-micro text-taupe">Vos coordonnées</legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Nom complet</span>
                  <input
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    placeholder="Nom complet"
                    autoComplete="name"
                    className="w-full border border-line bg-transparent px-4 py-3.5 text-sm placeholder:text-mist focus:border-plum focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Téléphone</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                    placeholder="Téléphone"
                    autoComplete="tel"
                    className="w-full border border-line bg-transparent px-4 py-3.5 text-sm placeholder:text-mist focus:border-plum focus:outline-none"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="sr-only">Précisions</span>
                <textarea
                  value={note}
                  onChange={event => setNote(event.target.value)}
                  rows={3}
                  placeholder="La date de la fête, la salle, vos couleurs (facultatif)"
                  className="w-full resize-none border border-line bg-transparent px-4 py-3.5 text-sm placeholder:text-mist focus:border-plum focus:outline-none"
                />
              </label>
            </fieldset>

            {error && (
              <p role="alert" className="mt-6 text-[0.8125rem] text-rose">
                {error}
              </p>
            )}

            <button
              type="submit"
              data-booking-block
              className="mt-8 mb-4 w-full bg-plum py-4 label-micro text-ivory opacity-0 transition-colors duration-300 hover:bg-cocoa sm:w-auto sm:px-12"
            >
              Confirmer le rendez-vous
            </button>
          </form>

          <aside className="lg:col-span-5">
            <div
              data-booking-frame
              className="aspect-4/5 overflow-hidden bg-ivory-dim"
            >
              <div data-booking-image className="size-full">
                <Media
                  source={BOOKING_IMAGE}
                  alt="Sélection de dragées au showroom"
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="size-full scale-110 object-cover"
                />
              </div>
            </div>

            {activeShowroom && (
              <div data-booking-block className="mt-8 space-y-4 opacity-0">
                <p className="flex items-start gap-3 text-sm text-cocoa">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-rose"
                    strokeWidth={1.25}
                  />
                  <span>
                    {activeShowroom.address}
                    <br />
                    {activeShowroom.city}
                  </span>
                </p>
                <p className="flex items-start gap-3 text-sm text-cocoa">
                  <Clock
                    className="mt-0.5 size-4 shrink-0 text-rose"
                    strokeWidth={1.25}
                  />
                  {activeShowroom.hours}
                </p>
                {selectedDay && slot && (
                  <p className="border-t border-line pt-4 text-[0.8125rem] text-taupe">
                    Vous avez choisi le
                    {' '}
                    <span className="text-plum">
                      {formatFullDate(selectedDay)}
                    </span>
                    {' à '}
                    <span className="text-plum tabular-nums">{slot}</span>
                    .
                  </p>
                )}
                <p className="text-[0.75rem] leading-relaxed text-taupe">
                  Le rendez-vous est gratuit et sans engagement. Le devis vous
                  parvient sous 48 h. Pour annuler, écrivez-nous sur WhatsApp.
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
