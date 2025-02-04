import Modal from "@/app/components/Modal";
import getResults from "@/app/utils/cachedResults";
import getBase64ImageUrl from "@/app/utils/generateBlurPlaceholder";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const results = await getResults();
  const currentPhotoId = (await params).id;
  const image = results.resources[currentPhotoId];
  const totalImages = results.resources.length;

  const blurDataUrl = await getBase64ImageUrl(image);
  const enhancedImage = {
    width: image.width,
    height: image.height,
    format: image.format,
    id: parseInt(currentPhotoId),
    public_id: image.public_id,
    blurDataUrl,
  };

  return <Modal image={enhancedImage} totalImages={totalImages} />;
}
