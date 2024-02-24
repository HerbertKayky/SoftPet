import styles from "../app/page.module.css";
import { useState } from "react";
import ModalRemove from "./modalRemove";
import ModalEdit from "./modalEdit";

interface Pet {
  nome: string;
  dono: string;
  raca: string;
  telefone: string;
  dataNascimento: string;
  animal: "Cachorro" | "Gato";
}

interface PetListProps {
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}

const PetList: React.FC<PetListProps> = ({ pets, setPets }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPetIndex, setSelectedPetIndex] = useState<number>(-1);
  const [modalType, setModalType] = useState<"edit" | "remove">("edit");

  const toggleActive = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const openModal = (index: number, type: "edit" | "remove") => {
    setModalOpen(true);
    setSelectedPetIndex(index);
    setModalType(type);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPetIndex(-1);
  };

  const handleRemoveItem = () => {
    if (selectedPetIndex !== -1) {
      const updatedPets = pets.filter((_, index) => index !== selectedPetIndex);
      setPets(updatedPets);
      console.log("Pet removido:", pets[selectedPetIndex]);
    }
    closeModal();
  };

  const handleEditItem = (editedPet: Pet) => {
    if (selectedPetIndex !== -1) {
      const updatedPets = [...pets];
      updatedPets[selectedPetIndex] = editedPet;
      setPets(updatedPets);
      console.log("Pet editado:", editedPet);
    }
    closeModal();
  };

  return (
    <section className={styles.container}>
      {pets.map((pet, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.circle}>
            <img src={`/${pet.animal.toLowerCase()}.svg`} alt="" />
          </div>
          <div className={styles.info}>
            <span>
              <img src="/bone.svg" alt="" />
              <p>{pet.nome}</p>
            </span>
            <span>
              <img src="/userLogo.svg" alt="" />
              <p>{pet.dono}</p>
            </span>
          </div>
          <img
            className={styles.arrow_icon}
            src="/arrow.svg"
            alt=""
            onClick={() => toggleActive(index)}
          />

          {activeIndex === index && (
            <div className={styles.active}>
              <span>
                <img src="/dna.svg" alt="" />
                Raça: {pet.raca}
              </span>
              <span>
                <img src="/telephone.svg" alt="" />
                Telefone: {pet.telefone}
              </span>
              <span>
                <img src="/calendar.svg" alt="" />
                Idade: {pet.dataNascimento}
              </span>

              <button
                className={styles.button_change}
                onClick={() => openModal(index, "edit")}
              >
                <img src="/change.svg" alt="" />
                Editar
              </button>
              <button
                className={styles.button_remove}
                onClick={() => openModal(index, "remove")}
              >
                <img src="/trash.svg" alt="" />
                Remover
              </button>
            </div>
          )}
        </div>
      ))}
      {modalOpen && modalType === "remove" && (
        <ModalRemove
          petData={pets[selectedPetIndex]}
          onClose={closeModal}
          onRemoveItem={handleRemoveItem}
        />
      )}
      {modalOpen && modalType === "edit" && (
        <ModalEdit
          petData={pets[selectedPetIndex]}
          onClose={closeModal}
          onEditItem={handleEditItem}
        />
      )}
    </section>
  );
};

export default PetList;
