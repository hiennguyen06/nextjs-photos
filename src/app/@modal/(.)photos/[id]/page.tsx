import Modal from "@/app/components/Modal";
import getResults from "@/app/utils/cachedResults";
import getBase64ImageUrl from "@/app/utils/generateBlurPlaceholder";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const results = await getResults();
  const photoId = (await params).id;
  const image = results.resources[photoId];

  const blurDataUrl = await getBase64ImageUrl(image);
  const enhancedImage = {
    ...image,
    id: parseInt(photoId),
    blurDataUrl,
  };

  return <Modal image={enhancedImage} />;
}
