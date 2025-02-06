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

  console.log(allTags);
  return (
    <>
      <TagFilters allTags={allTags} selectedTag={selectedTag} />
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {filteredImages.map((image) => (
          <ImageContainer key={image.id} image={image} />
        ))}
      </div>
    </>
  );
}
