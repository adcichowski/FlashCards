import React from "react";

function PictureRender({
  className,
  src,
  alt,
}: {
  className?: string;
  src: string;
  alt: string;
}) {
  return (
    <picture>
      <img src={"/HeroBackground.png"} className={className} alt="background" />
    </picture>
  );
}
export { PictureRender };
