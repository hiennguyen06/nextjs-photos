"use client";

import { useCallback, useRef, useEffect } from "react";
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

  const onModalClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleModalClose = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current) {
        onModalClose();
      }
    },
    [onModalClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      ref={overlay}
      className="fixed h-screen inset-0 z-10 flex justify-center items-center overflow-hidden"
      onClick={handleModalClose}
    >
      <div className="relative w-auto max-h-[75vh] overflow-hidden">
        <Image
          src={imageUrl}
          alt={image.public_id}
          width={image.width}
          height={image.height}
          className="max-h-[75vh] w-auto"
          placeholder="blur"
          blurDataURL={image.blurDataUrl}
          priority
        />
      </div>
    </div>
  );
}
