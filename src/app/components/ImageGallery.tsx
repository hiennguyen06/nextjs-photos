import ImageProps from "../utils/types";
import ImageContainer from "./ImageContainer";
import TagFilters from "./TagFilters";

interface ImageGalleryProps {
  images: ImageProps[];
  selectedTag?: string | undefined;
}

export default function ImageGallery({
  images,
  selectedTag,
}: ImageGalleryProps) {
  // This code extracts all unique tags from the images array:
  // 1. images.flatMap() flattens nested arrays and maps over each image
  // 2. For each image, get its tags array or empty array if undefined
  // 3. new Set() removes any duplicate tags
  // 4. Array.from() converts the Set back to an array
  const allTags = Array.from(
    new Set(images.flatMap((image) => image.tags || []))
  );

  const filteredImages = selectedTag
    ? images.filter((image) => image.tags?.includes(selectedTag))
    : images;

  return (
    <>
      <TagFilters allTags={allTags} selectedTag={selectedTag} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filteredImages.map((image) => (
          <figure
            key={image.id}
            className="transform transition-all duration-300 ease-out"
          >
            <ImageContainer image={image} />
          </figure>
        ))}
      </div>
    </>
  );
}
