import getBase64ImageUrl from "./utils/generateBlurPlaceholder";
import ImageProps from "./utils/types";
import getResults from "./utils/cachedResults";
import ImageGallery from "./components/ImageGallery";
import Header from "./components/Header";
const Home = async () => {
  const images = await getImagesFromCloudinary();
  console.log(images);
  return (
    <main className="px-4 container mx-auto max-w-7xl">
      <Header />
      <div>
        <ImageGallery images={images} />
      </div>
    </main>
  );
};

const getImagesFromCloudinary = async () => {
  const results = await getResults();

  const reducedResults = await transformImageData(results.resources);
  return reducedResults;
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
