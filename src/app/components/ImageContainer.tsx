"use client";

import Image from "next/image";
import ImageProps from "../utils/types";
import Link from "next/link";
interface ImageContainerProps {
  image: ImageProps;
}

export default function ImageContainer({ image }: ImageContainerProps) {
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:best,f_auto,c_limit,w_1280,dpr_auto/${image.public_id}.${image.format}`;

  return (
    <Link className="block mb-2" href={`/photos/${image.id}`} passHref>
      <Image
        src={imageUrl}
        alt={image.public_id}
        width={image.width}
        height={image.height}
        className="w-full"
        loading="lazy"
        placeholder="blur"
        blurDataURL={image.blurDataUrl}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
      />
    </Link>
  );
}
