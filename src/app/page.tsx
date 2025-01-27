import getBase64ImageUrl from "./utils/generateBlurPlaceholder";
import ImageProps from "./utils/types";
import getResults from "./utils/cachedResults";
import ImageGallery from "./components/ImageGallery";

const Home = async () => {
  const images = await getImagesFromCloudinary();
  console.log(images);
  return (
    <main className="py-4">
      <div className="container mx-auto max-w-7xl">
        <ImageGallery images={images} />
      </div>
    </main>
  );
};

const getImagesFromCloudinary = async () => {
  const results = await getResults();

  const reduecedResults = await transformImageData(results.resources);

  return reduecedResults;
};

const transformImageData = async (results: Array<ImageProps>) => {
  const transformedData = await Promise.all(
    results.map(async (resource: ImageProps, index: number) => {
      const imageData: ImageProps = {
        id: index,
        height: resource.height,
        width: resource.width,
        format: resource.format,
        public_id: resource.public_id,
      };

      // Generate blur placeholder
      const blurDataUrl = await getBase64ImageUrl(imageData);

      return {
        ...imageData,
        blurDataUrl,
      };
    })
  );

  return transformedData;
};

export default Home;
