import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';
import { CallToAction } from '@/sections/CallToAction';
import { Formulas } from '@/sections/Formulas';
import { Process } from '@/sections/Process';
import { ServiceShowcase } from '@/sections/ServiceShowcase';

export const metadata: Metadata = {
  title: 'Prestations',
  description:
    'Dragées, buffet et décoration pour fiançailles et mariages au Maroc. Formules à partir de 4 500 DH, composables à la carte.',
};

const ServicesPage = () => (
  <PageShell>
    <div className="mx-auto max-w-[1600px] px-4 pt-28 sm:px-6 md:pt-36 lg:px-10">
      <p className="label-micro text-taupe">Prestations</p>
      <h1 className="mt-6 max-w-[16ch] font-display text-editorial font-light">
        Tout ce que nous prenons en charge
      </h1>
      <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-taupe md:text-base">
        Trois métiers que nous exerçons ensemble depuis douze ans, pour des
        fiançailles et des mariages partout au Maroc.
      </p>
    </div>

    <ServiceShowcase />
    <Process />
    <Formulas />
    <CallToAction />
  </PageShell>
);

export default ServicesPage;
