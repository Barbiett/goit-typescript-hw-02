import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchGallery from "../Api";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import * as Yup from "yup";
import ImageModal from "../ImageModal/ImageModal";
import Modal from "react-modal";

export default function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showReset, setShowReset] = useState(false);
  // ============= Modal Window.

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  Modal.setAppElement("#root");
  function openModal(photo) {
    setModalData(photo);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  // ====================
  // const UserSchema = Yup.object().shape({
  //   query: Yup.string()
  //     .trim()
  //     .min(3, "Too Short")
  //     .max(50, "Max 50 letters!")
  //     .required("Is required"),
  // });
  function handleReset() {
    setShowReset(false);
    setPhotos([]);
  }
  function handleSearch(newQuery) {
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

        const data = await fetchGallery(query, page);
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
        // UserSchema={UserSchema}
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
// Функція setPhotos використовується в умовному операторі рендеру,
//  що не є призначенням цієї функції.
// Функція setPhotos має оновлювати стан, а не використовуватися як умова для рендеру.
