"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageProps from "../utils/types";

interface ModalProps {
  image: ImageProps;
}

export default function Modal({ image }: ModalProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:best,f_auto,c_limit,w_1280,dpr_auto/${image.public_id}.${image.format}`;

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  return (
    <div ref={overlay} className="fixed inset-0 z-50" onClick={handleClick}>
      <h1>Modal Page</h1>
      <div className="modal fixed inset-x-0 top-[50%] translate-y-[-50%] z-50 w-full max-w-7xl mx-auto p-4">
        <Image
          src={imageUrl}
          alt={image.public_id}
          width={image.width}
          height={image.height}
          className="w-full h-auto object-contain"
          placeholder="blur"
          blurDataURL={image.blurDataUrl}
          priority
        />
      </div>
    </div>
  );
}
