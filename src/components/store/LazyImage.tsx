import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
}

/**
 * LazyImage — shows a shimmer skeleton while the image loads,
 * then fades the image in with a smooth opacity transition.
 */
export function LazyImage({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const { onLoad, onError, ...imageProps } = props;

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  return (
    <span className="relative block h-full w-full">
      {/* Shimmer until image is loaded */}
      {!loaded && (
        <span className={`skeleton absolute inset-0 ${skeletonClassName}`} aria-hidden="true" />
      )}
      {failed ? (
        <span
          role="img"
          aria-label={alt ? `${alt} image unavailable` : "Image unavailable"}
          className="absolute inset-0 grid place-items-center bg-sky-soft text-muted-foreground"
        >
          <ImageOff className="h-8 w-8 opacity-60" aria-hidden="true" />
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={(event) => {
            setLoaded(true);
            onLoad?.(event);
          }}
          onError={(event) => {
            setFailed(true);
            setLoaded(true);
            onError?.(event);
          }}
          className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          {...imageProps}
        />
      )}
    </span>
  );
}
