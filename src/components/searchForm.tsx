import { useState } from "react";
import styles from "../app/page.module.css";
import { FiSearch, FiPlusCircle } from "react-icons/fi";
import Modal, { Pet } from "./modal";

interface SearchFormProps {
  handleOpenModal: () => void;
  onAddPet: (newPet: Pet) => void;
  onSearch: (searchTerm: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  handleOpenModal,
  onAddPet,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.form}>
      <FiSearch className={styles.icon} />

      <div className={styles.input_container}>
        <input type="text" value={searchTerm} onChange={handleChange} />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      <button onClick={handleOpenModal} className={styles.button_register}>
        <FiPlusCircle className={styles.icon_plus} size={23} />
        Cadastrar
      </button>
    </div>
  );
};

export default SearchForm;
