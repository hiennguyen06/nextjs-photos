"use client";

import Image from "next/image";
import ImageProps from "../utils/types";
import Link from "next/link";
interface ImageContainerProps {
  image: ImageProps;
}

export default function ImageContainer({ image }: ImageContainerProps) {
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto,c_scale,w_720/${image.public_id}.${image.format}`;

  return (
    <Link href={`/photos/${image.id}`} shallow>
      <Image
        src={imageUrl}
        alt={image.public_id}
        width={image.width}
        height={image.height}
        className="w-full"
        loading="lazy"
        placeholder="blur"
        blurDataURL={image.blurDataUrl}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
      />
    </Link>
  );
}
