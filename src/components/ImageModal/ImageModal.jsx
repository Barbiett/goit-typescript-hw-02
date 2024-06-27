import Modal from "react-modal";

export default function ImageModal({
  modalData: { urls, alt_description },
  closeModal,
  isModalOpen,
}) {
  const customStyles = {
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
      <div>
        <img src={urls.regular} alt={alt_description} />
      </div>
    </Modal>
  );
}
