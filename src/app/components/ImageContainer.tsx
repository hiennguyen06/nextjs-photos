"use client";

import Image from "next/image";
import ImageProps from "../utils/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ImageContainerProps {
  image: ImageProps;
}

export default function ImageContainer({ image }: ImageContainerProps) {
  const router = useRouter();
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:best,f_auto,c_limit,w_1280,dpr_auto/${image.public_id}.${image.format}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/photos/${image.id}`, { scroll: false });
  };

  return (
    <Link
      className="block hover:border-spacing-1 border-black
 transition-opacity duration-300 ease-out"
      href={`/photos/${image.id}`}
      onClick={handleClick}
      scroll={false}
    >
      <Image
        src={imageUrl}
        alt={image.public_id}
        width={image.width}
        height={image.height}
        className="w-full"
        loading={image.id < 8 ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={image.blurDataUrl}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
      />
    </Link>
  );
}
