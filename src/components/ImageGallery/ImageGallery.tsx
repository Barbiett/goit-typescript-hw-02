import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Photo } from "../App/App";

interface ImageGalleryProp {
  photos: Photo[];
  openModal: (photo: Photo) => void;
}

export default function ImageGallery({ photos, openModal }: ImageGalleryProp) {
  return (
    <ul className={css.list}>
      {photos.map((photo) => (
        <li key={photo.id} onClick={() => openModal(photo)}>
          <ImageCard photo={photo} />
        </li>
      ))}
    </ul>
  );
}
