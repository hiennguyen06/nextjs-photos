import cloudinary from "./cloudinary";

// Create an in-memory cache using Map to store results
const cache = new Map();

export default async function getResults() {
  // Check if results exist in cache
  let cachedResults = cache.get("results");

  if (!cachedResults) {
    // If not in cache, fetch from Cloudinary
    const results = await cloudinary.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}`)
      .sort_by("public_id", "desc")
      .max_results(100)
      .with_field("tags")
      .execute();

    // Store in cache for future use
    cache.set("results", results);
    cachedResults = results;
  }

  return cachedResults;
}
