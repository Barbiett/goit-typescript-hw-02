import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchGallery from "../Api";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import Modal from "react-modal";
import { object } from "yup";

type Photo = {
  urls: string;
  alt_description: string;
};

type ModalData = Photo | null;
export default function App() {
  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [showReset, setShowReset] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>(null);

  Modal.setAppElement("#root");
  function openModal(photo: Photo) {
    setModalData(photo);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleReset() {
    setShowReset(false);
    setPhotos([]);
  }
  function handleSearch(newQuery: string) {
    setShowReset(true);
    setQuery(newQuery);
    setPage(1);
    setPhotos([]);
  }

  function handleLoadMore() {
    setPage(page + 1);
  }

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getGallery() {
      try {
        setError(false);
        setIsLoading(true);

        const data = await fetchGallery<Photo[]>(query, page);
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data];
        });
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getGallery();
  }, [page, query]);

  return (
    <div>
      {modalIsOpen && (
        <ImageModal
          isModalOpen={modalIsOpen}
          modalData={modalData}
          closeModal={closeModal}
        />
      )}

      <SearchBar
        onSearch={handleSearch}
        onClickReset={handleReset}
        showReset={showReset}
      />

      <ImageGallery photos={photos} openModal={openModal} />
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      )}
      {error && <ErrorMessage />}

      {photos.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
