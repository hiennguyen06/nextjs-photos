import { cache } from "react";
import ImageProps from "./types";
export const prefetchImageRoutes = cache(async (images: ImageProps[]) => {
  const prefetchPromises = images.slice(0, 4).map(async (image) => {
    const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:best,f_auto,c_limit,w_1280,dpr_auto/${image.public_id}.${image.format}`;

    // Prefetch the image
    await fetch(imageUrl, { priority: "high" });

    return imageUrl;
  });

  await Promise.all(prefetchPromises);
});
