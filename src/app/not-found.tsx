import { ButtonLink } from '@/components/Button';
import { PageShell } from '@/components/PageShell';

const NotFoundPage = () => (
  <PageShell>
    <div className="mx-auto flex min-h-[70svh] max-w-[720px] flex-col justify-center px-4 py-32 text-center sm:px-6">
      <p className="label-micro text-taupe">Erreur 404</p>
      <h1 className="mt-6 font-display text-editorial font-light">
        Cette page n&apos;existe pas
      </h1>
      <p className="mx-auto mt-6 max-w-[38ch] text-sm leading-relaxed text-taupe">
        Le lien a peut-être changé. Revenez à l&apos;accueil ou écrivez-nous, on
        vous répond vite.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
        <ButtonLink href="/rendez-vous" variant="outline">
          Prendre rendez-vous
        </ButtonLink>
      </div>
    </div>
  </PageShell>
);

export default NotFoundPage;
