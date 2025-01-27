import ImageProps from "../utils/types";
import ImageContainer from "./ImageContainer";

interface ImageGalleryProps {
  images: ImageProps[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {images.map((image) => (
        <ImageContainer key={image.id} image={image} />
      ))}
    </div>
  );
}
