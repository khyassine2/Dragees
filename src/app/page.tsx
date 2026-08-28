import { CallToAction } from '@/sections/CallToAction';
import { Formulas } from '@/sections/Formulas';
import { GalleryStrip } from '@/sections/GalleryStrip';
import { Hero } from '@/sections/Hero';
import { Process } from '@/sections/Process';
import { ServiceShowcase } from '@/sections/ServiceShowcase';

const HomePage = () => (
  <>
    <Hero />
    <ServiceShowcase />
    <Process />
    <GalleryStrip />
    <Formulas />
    <CallToAction />
  </>
);

export default HomePage;
