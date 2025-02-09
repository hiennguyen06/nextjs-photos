import ImageProps from "./types";

// Create an in-memory cache using Map
// Keys will be ImageProps objects, values will be string (base64 blur URLs)
const cache = new Map<ImageProps, string>();

// Function to generate a base64 blur URL for an image
export default async function getBase64ImageUrl(
  image: ImageProps
): Promise<string> {
  // Try to get the cached version first
  let url = cache.get(image);

  // If found in cache, return it immediately
  if (url) {
    return url;
  }

  // Return a solid #E4E4E7 color data URL
  url =
    "data:image/gif;base64,R0lGODlhAQABAIAAAOTk5wAAACH5BAEAAAEALAAAAAABAAEAAAICRAEAOw==";

  // Store the result in cache for future use
  cache.set(image, url);

  // Return the generated URL
  return url;
}
