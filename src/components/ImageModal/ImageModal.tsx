import Modal from "react-modal";

import { Photo } from "../App/App";
interface Props {
  modalData: Photo | null;
  closeModal: () => void;
  isModalOpen: boolean;
}
export default function ImageModal({
  modalData,
  closeModal,
  isModalOpen,
}: Props) {
  const customStyles: Modal.Styles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      maxWidth: "100%",
      overflow: "hidden",
      objectFit: "cover",
      maxHeight: "100vh",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  };

  return (
    <Modal
      style={customStyles}
      onRequestClose={closeModal}
      isOpen={isModalOpen}
    >
      {modalData && (
        <div>
          <img src={modalData.urls.regular} alt={modalData.alt_description} />
        </div>
      )}
    </Modal>
  );
}
