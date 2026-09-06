import { ImageOff } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { resolveProductImage } from "@/data/products";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
}

/**
 * LazyImage — resolves product image URLs automatically,
 * checks decode/cache status instantly to eliminate image loading lag.
 */
export function LazyImage({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  ...props
}: LazyImageProps) {
  const resolvedSrc = resolveProductImage(src);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setFailed(false);
    if (imgRef.current) {
      if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setLoaded(true);
      }
    }
  }, [resolvedSrc]);

  return (
    <span className="relative block h-full w-full overflow-hidden">
      {/* Skeleton placeholder shown only while loading */}
      {!loaded && !failed && (
        <span
          className={`skeleton absolute inset-0 z-0 ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}
      {failed ? (
        <span
          role="img"
          aria-label={alt ? `${alt} image unavailable` : "Image unavailable"}
          className="absolute inset-0 grid place-items-center bg-sky-soft text-muted-foreground z-10"
        >
          <ImageOff className="h-8 w-8 opacity-60" aria-hidden="true" />
        </span>
      ) : (
        <img
          ref={(el) => {
            imgRef.current = el;
            if (el && el.complete && el.naturalWidth > 0 && !loaded) {
              setLoaded(true);
            }
          }}
          src={resolvedSrc}
          alt={alt}
          loading="eager"
          decoding="async"
          onLoad={(event) => {
            setLoaded(true);
            props.onLoad?.(event);
          }}
          onError={(event) => {
            setFailed(true);
            props.onError?.(event);
          }}
          className={`relative z-10 ${className} transition-opacity duration-150 ${
            loaded ? "opacity-100" : "opacity-90"
          }`}
          {...props}
        />
      )}
    </span>
  );
}
