"use client";

import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageProps from "../utils/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
interface ModalProps {
  image: ImageProps;
  totalImages: number;
}

export default function Modal({ image, totalImages }: ModalProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const touchStart = useRef<number>(0);
  const touchEnd = useRef<number>(0);
  const minSwipeDistance = 50;

  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:best,f_auto,c_limit,w_1280,dpr_auto/${image.public_id}.${image.format}`;

  const onModalClose = useCallback(() => {
    if (overlay.current) {
      overlay.current.ontouchstart = null;
      overlay.current.ontouchmove = null;
      overlay.current.ontouchend = null;
    }

    touchStart.current = 0;
    touchEnd.current = 0;

    setTimeout(() => {
      router.back();
    }, 0);
  }, [router]);

  const handlePreviousPhoto = useCallback(() => {
    touchStart.current = 0;
    touchEnd.current = 0;

    if (overlay.current) {
      overlay.current.ontouchstart = null;
      overlay.current.ontouchmove = null;
      overlay.current.ontouchend = null;
    }

    router.replace(`/photos/${image.id - 1}`, { scroll: false });
  }, [router, image.id]);

  const handleNextPhoto = useCallback(() => {
    touchStart.current = 0;
    touchEnd.current = 0;

    if (overlay.current) {
      overlay.current.ontouchstart = null;
      overlay.current.ontouchmove = null;
      overlay.current.ontouchend = null;
    }

    router.replace(`/photos/${image.id + 1}`, { scroll: false });
  }, [router, image.id]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const swipeDistance = touchStart.current - touchEnd.current;

    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    if (swipeDistance > 0) {
      // Swiped left, go to next photo
      if (image.id !== totalImages - 1) {
        handleNextPhoto();
      }
    } else {
      // Swiped right, go to previous photo
      if (image.id !== 0) {
        handlePreviousPhoto();
      }
    }
  };

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

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onModalClose();
          break;
        case "ArrowLeft":
          if (image.id !== 0) {
            handlePreviousPhoto();
          }
          break;
        case "ArrowRight":
          if (image.id !== totalImages - 1) {
            handleNextPhoto();
          }
          break;
      }
    },
    [onModalClose, handlePreviousPhoto, handleNextPhoto, image.id, totalImages]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <main
      ref={overlay}
      className="fixed w-full h-dvh px-4 max-md:px-0 inset-0 z-10 bg-white flex justify-center max-md:flex-col items-center gap-4 max-md:gap-0 overflow-hidden"
      onClick={handleModalClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={onModalClose}
        onTouchEnd={(e) => {
          e.preventDefault();
          onModalClose();
        }}
        className="absolute max-md:static max-md:self-end top-4 right-4 rounded-full p-2 bg-[#f4f4f4] max-md:my-2"
      >
        <X strokeWidth={1} size={24} className="text-[#18181B]" />
      </button>
      <button
        className={`p-4 rounded-full bg-transparent flex justify-center items-center max-md:hidden ${
          image.id === 0 ? "opacity-40 pointer-events-none" : ""
        }`}
        onClick={() => handlePreviousPhoto()}
      >
        <ChevronLeft size={32} className="text-[#18181B]" />
      </button>

      <div className="relative flex flex-col justify-center gap-4 items-center overflow-hidden w-full h-[auto]">
        <Image
          src={imageUrl}
          alt={image.public_id}
          width={image.width}
          height={image.height}
          className="max-h-[75vh] w-full object-contain animate-fadeIn"
          priority
        />
        <p className="text-center font-inconsolata">{image.alt}</p>
      </div>

      <div className="hidden max-md:flex justify-between w-full mt-auto">
        <button
          className={`p-4 rounded-full bg-transparent flex justify-center items-center ${
            image.id === 0 ? "opacity-40 pointer-events-none" : ""
          }`}
          onClick={() => handlePreviousPhoto()}
        >
          <ChevronLeft size={32} className="text-[#18181B]" />
        </button>
        <button
          className={`p-4 rounded-full bg-transparent flex justify-center items-center  ${
            image.id === totalImages - 1 ? "opacity-40 pointer-events-none" : ""
          }`}
          onClick={() => handleNextPhoto()}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleNextPhoto();
          }}
        >
          <ChevronRight size={32} className="text-[#18181B]" />
        </button>
      </div>

      <button
        className={`p-4 rounded-full bg-transparent flex justify-center items-center max-md:hidden ${
          image.id === totalImages - 1 ? "opacity-40 pointer-events-none" : ""
        }`}
        onClick={() => handleNextPhoto()}
      >
        <ChevronRight size={32} className="text-[#18181B]" />
      </button>
    </main>
  );
}
