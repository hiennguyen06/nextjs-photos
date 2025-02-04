"use client";

import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageProps from "../utils/types";
interface ModalProps {
  image: ImageProps;
  totalImages: number;
}

export default function Modal({ image, totalImages }: ModalProps) {
  console.log(image);
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

  const handlePreviousPhoto = useCallback(() => {
    router.replace(`/photos/${image.id - 1}`, { scroll: false });
  }, [router, image.id]);

  const handleNextPhoto = useCallback(() => {
    router.replace(`/photos/${image.id + 1}`, { scroll: false });
  }, [router, image.id]);

  return (
    <main
      ref={overlay}
      className="fixed w-full  h-screen px-4 inset-0 z-10 bg-white flex justify-center items-center gap-4 overflow-hidden"
      onClick={handleModalClose}
    >
      <button
        onClick={onModalClose}
        className="absolute top-4 right-4 rounded-full p-2"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#18181B] "
        >
          <path
            fill="currentColor"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
          />
        </svg>
      </button>
      <button
        className={`p-4 rounded-full bg-transparent flex justify-center items-center ${
          image.id === 0 ? "opacity-40 pointer-events-none" : ""
        }`}
        onClick={() => handlePreviousPhoto()}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"
          />
        </svg>
      </button>

      <div className="relative flex justify-center items-center overflow-hidden w-full h-[auto]">
        <Image
          src={imageUrl}
          alt={image.public_id}
          width={image.width}
          height={image.height}
          className="max-h-[90vh] w-auto object-contain"
          placeholder="blur"
          blurDataURL={image.blurDataUrl}
          priority
        />
      </div>
      <button
        className={`p-4 rounded-full bg-transparent flex justify-center items-center ${
          image.id === totalImages - 1 ? "opacity-40 pointer-events-none" : ""
        }`}
        onClick={() => handleNextPhoto()}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"
          />
        </svg>
      </button>
    </main>
  );
}
