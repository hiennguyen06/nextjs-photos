import getResults from "@/app/utils/cachedResults";
import getBase64ImageUrl from "@/app/utils/generateBlurPlaceholder";
import Image from "next/image";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const results = await getResults();
  const photoId = (await params).id;
  const image = results.resources[photoId];
  const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto:best,f_auto,c_limit,w_1280,dpr_auto/${image.public_id}.${image.format}`;
  const blurDataUrl = await getBase64ImageUrl(image);

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="max-h-[90vh] w-auto relative">
        <Image
          src={imageUrl}
          alt={image.public_id}
          width={image.width}
          height={image.height}
          className="max-h-[90vh] w-auto object-contain"
          blurDataURL={blurDataUrl}
          placeholder="blur"
          priority
        />
      </div>
    </div>
  );
}
