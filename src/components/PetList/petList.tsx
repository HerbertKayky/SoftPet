import styles from "./petList.module.css";
import { useState, useEffect } from "react";
import ModalRemove from "../ModalRemove/modalRemove";
import ModalEdit from "../ModalEdit/modalEdit";
import { Pet } from "@/types";




interface PetListProps {
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;

  searchTerm: string;
}

const PetList: React.FC<PetListProps> = ({ searchTerm }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPetIndex, setSelectedPetIndex] = useState<number>(-1);
  const [modalType, setModalType] = useState<"edit" | "remove">("edit");

  useEffect(() => {
    fetch("http://localhost:3000/pets")
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

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
      updatedPets[selectedPetIndex] = {
        ...editedPet,
        id: pets[selectedPetIndex].id,
      };
      setPets(updatedPets);
      console.log("Pet editado:", editedPet);
    }
    closeModal();
  };

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatBirthdate = (birthdate: string) => {
    const birthDate = new Date(birthdate);
    birthDate.setDate(birthDate.getDate() + 1);
    return birthDate.toLocaleDateString("pt-BR");
  };

  const filteredPets = pets.filter((pet) =>
    pet.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className={styles.container}>
      {filteredPets.map((pet, index) => (
        <div
          key={pet.id}
          className={`${styles.item} ${
            activeIndex === index ? styles.activeItem : ""
          }`}
        >
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
                Idade: {calculateAge(pet.dataNascimento)} Anos (
                {formatBirthdate(pet.dataNascimento)})
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
