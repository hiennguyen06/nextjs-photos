export default interface ImageProps {
  id: number;
  height: number;
  width: number;
  public_id: string;
  format: string;
  blurDataUrl?: string;
  title?: string;
  alt?: string;
  tags?: string[];
}
