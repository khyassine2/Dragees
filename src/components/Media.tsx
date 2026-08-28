import { imageSrcSet, imageUrl } from '@/utils/format';

type MediaProps = {
  source: string;
  alt: string;
  sizes: string;
  className?: string;
  /** Only the hero and first grid row should bypass lazy loading. */
  priority?: boolean;
};

/** Responsive, lazy-loaded photography with a stable fallback width. */
export const Media = (props: MediaProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={imageUrl(props.source, 1024)}
    srcSet={imageSrcSet(props.source)}
    sizes={props.sizes}
    alt={props.alt}
    loading={props.priority ? 'eager' : 'lazy'}
    decoding="async"
    fetchPriority={props.priority ? 'high' : 'auto'}
    draggable={false}
    className={props.className}
  />
);
