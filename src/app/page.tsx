import cloudinary from "./utils/cloudinary";
import Image from "next/image";

interface ImageProps {
  id: number;
  height: number;
  width: number;
  format: string;
  public_id: string;
}

const Home = async () => {
  const images = await getImagesFromCloudinary();
  console.log(images);
  return (
    <main className="py-4">
      <div className="container mx-auto max-w-7xl">
        <div className="columns-1 md:columns-3 lg:columns-4 gap-4">
          {images.map((image: ImageProps) => (
            <div key={image.id} className="break-inside-avoid mb-4">
              <Image
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto,c_scale,w_720/${image.public_id}.${image.format}`}
                alt={image.public_id}
                width={image.width}
                height={image.height}
                className="w-full"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

const getImagesFromCloudinary = async () => {
  const results = await cloudinary.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}`)
    .sort_by("public_id", "desc")
    .max_results(100)
    .with_field("tags")
    .execute();

  const transformedData = transformImageData(results);

  return transformedData;
};

interface CloudinaryResource {
  height: number;
  width: number;
  format: string;
  public_id: string;
}

interface CloudinaryResults {
  resources: CloudinaryResource[];
}

const transformImageData = (results: CloudinaryResults) => {
  return results.resources.map(
    (resource: CloudinaryResource, index: number) => {
      return {
        id: index,
        height: resource.height,
        width: resource.width,
        format: resource.format,
        public_id: resource.public_id,
      };
    }
  );
};

export default Home;
