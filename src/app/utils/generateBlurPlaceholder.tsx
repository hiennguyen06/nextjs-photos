import sharp from "sharp";
import ImageProps from "./types";

// Create an in-memory cache using Map
// Keys will be ImageProps objects, values will be string (base64 blur URLs)
const cache = new Map<ImageProps, string>();

// Function to generate a base64 blur URL for an image
// // Takes ImageProps as input and returns a Promise that resolves to a string
export default async function getBase64ImageUrl(
  image: ImageProps
): Promise<string> {
  // Try to get the cached version first
  let url = cache.get(image);

  // If found in cache, return it immediately
  if (url) {
    return url;
  }

  // If not in cache, fetch the image from Cloudinary
  // Using a small 8px wide version with 70% quality for the blur effect
  const response = await fetch(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`
  );

  // Convert the response to an ArrayBuffer
  const buffer = await response.arrayBuffer();

  // Use Sharp to process the image
  const optimized = await sharp(Buffer.from(buffer))
    // Convert to JPEG format
    .jpeg({
      quality: 70, // Set quality to 70%
      progressive: true, // Enable progressive loading
    })
    // Output as buffer
    .toBuffer();

  // Convert the optimized buffer to a base64 data URL
  url = `data:image/jpeg;base64,${Buffer.from(optimized).toString("base64")}`;

  // Store the result in cache for future use
  cache.set(image, url);

  // Return the generated URL
  return url;
}
