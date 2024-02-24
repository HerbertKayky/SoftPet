'use client'

import { useState } from "react";
import styles from "../app/page.module.css";
import { FiSearch, FiPlusCircle } from "react-icons/fi";
import Modal, { Pet } from "./modal";

interface SearchFormProps {
  handleOpenModal: () => void;
  onAddPet: (newPet: Pet) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  handleOpenModal,
  onAddPet,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.form}>
      <FiSearch className={styles.icon} />

      <div className={styles.input_container}>
        <input type="text" />
        <button>Pesquisar</button>
      </div>

      <button onClick={handleOpenModal} className={styles.button_register}>
        <FiPlusCircle className={styles.icon_plus} size={23} />
        Cadastrar
      </button>
      {modalOpen && <Modal onClose={handleCloseModal} onAddPet={onAddPet} />}
    </div>
  );
};

export default SearchForm;
