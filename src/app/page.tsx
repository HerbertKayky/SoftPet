"use client";

import { useState } from "react";
// Components
import Header from "@/components/header";
import SearchForm from "@/components/searchForm";
import Modal, { Pet } from "@/components/modal";
import PetList from "@/components/petList";

const page: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddPet = (newPet: Pet) => {
    setPets((prevPets) => [...prevPets, newPet]);
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <link
       href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" 
       rel="stylesheet"/>
      <Header />
      <main>
        <SearchForm handleOpenModal={handleOpenModal} onAddPet={handleAddPet} pets={pets} />
        {modalOpen && (
          <Modal onAddPet={handleAddPet} onClose={handleCloseModal} />
        )}

        <PetList pets={pets} setPets={setPets} />
      </main>
    </div>
  );
};

export default page;
