'use client'


import { FC, useState } from "react";
import styles from "./modal.module.css";
import { IoClose } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Pet } from "@/types";

interface ModalProps {
  onClose: () => void;
  onAddPet: (newPet: Pet) => void;
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}



const Modal: FC<ModalProps> = ({ onClose, onAddPet, setPets }) => {
  const [formData, setFormData] = useState<Pet>({
    nome: "",
    dono: "",
    raca: "",
    telefone: "",
    dataNascimento: "",
    animal: "Gato"
  });

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "");
    const match = phoneNumber.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }

    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatPhoneNumber(value);
    setFormData((prevState) => ({
      ...prevState,
      telefone: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
  
    try {
      const response = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao cadastrar pet");
      }
  
      
      console.log("Pet cadastrado com sucesso!");
      
      
      onClose();



      const updatedPetsResponse = await fetch("http://localhost:3000/pets");
      if (!updatedPetsResponse.ok) {
        throw new Error("Erro ao obter a lista atualizada de pets");
      }
      const updatedPetsData = await updatedPetsResponse.json();
      setPets(updatedPetsData);
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error.message);
    }
  };

  return (
    <div className={styles.register_animal_container}>
      <div className={styles.register_animal}>
        <div className={styles.header_animal}>
          <div className={styles.div_circle}>
            <FiPlusCircle />
          </div>
          <h1>Cadastrar</h1>
          <button className={styles.button_icon} onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <form className={styles.form_modal} onSubmit={handleSubmit}>
          <div className={styles.form_section}>
            <div>
              <label>
                <img className={styles.bone} src="/bone.svg" alt="" /> Nome
              </label>
              <input
                type="text"
                placeholder="Nome Sobrenome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>
                <img src="/userLogo.svg" alt="" /> Dono
              </label>
              <input
                type="text"
                placeholder="Nome Sobrenome"
                name="dono"
                value={formData.dono}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>
                <img className={styles.phone} src="/telephone.svg" alt="" />
                Telefone
              </label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handlePhoneChange}
                placeholder="(00) 0 0000-0000"
                required
              />
            </div>
          </div>

          <div className={styles.form_section}>
            <div>
              <label>
                <img className={styles.dna} src="/dna.svg" alt="" />
                Animal
              </label>
              <div className={styles.radio}>
                <input
                  type="radio"
                  id="cachorro"
                  name="animal"
                  value="Cachorro"
                  onChange={handleRadioChange}
                  required
                />
                <p>Cachorro</p>
                <input
                  type="radio"
                  id="gato"
                  name="animal"
                  value="Gato"
                  onChange={handleRadioChange}
                  required
                />
                <p>Gato</p>
              </div>
            </div>
            <div>
              <label>
                <img className={styles.dna} src="/dna.svg" alt="" />
                Raça
              </label>
              <input
                type="text"
                placeholder="Raça"
                name="raca"
                value={formData.raca}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>
                <img className={styles.calendar} src="/calendar.svg" alt="" />
                Nascimento <span>(Aproximado)</span>
              </label>
              <input
                type="date"
                placeholder="22/08/2020"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.register_buttons}>
            <button onClick={onClose} className={styles.back_button}>
              <IoArrowBackCircleOutline size={25} />
              Voltar
            </button>
            <button type="submit" className={styles.button_register_modal}>
              <FiPlusCircle size={25} />
              Cadastrar
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
};

export default Modal;
