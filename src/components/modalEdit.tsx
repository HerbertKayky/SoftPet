'use client'

import { FC, useState } from "react";
import styles from "../app/page.module.css";
import { IoArrowBackCircleOutline, IoClose } from "react-icons/io5";

interface ModalEditProps {
  petData: Pet;
  onClose: () => void;
  onEditItem: (editedPet: Pet) => void;
}

export interface Pet {
  nome: string;
  dono: string;
  raca: string;
  telefone: string;
  dataNascimento: string;
  animal: "Cachorro" | "Gato";
}

const ModalEdit: FC<ModalEditProps> = ({ onClose, onEditItem, petData }) => {
  const [formData, setFormData] = useState<Pet>(petData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      animal: value as "Cachorro" | "Gato",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEditItem(formData);
    onClose();
  };

  return (
    <div className={styles.register_animal_container}>
      <div className={styles.register_animal}>
        <div className={styles.header_animal}>
          <h1>Editar</h1>
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
                  checked={formData.animal === "Cachorro"} 
                  onChange={handleRadioChange}
                />
                <label htmlFor="cachorro">Cachorro</label>
                <input
                  type="radio"
                  id="gato"
                  name="animal"
                  value="Gato"
                  checked={formData.animal === "Gato"} 
                  onChange={handleRadioChange}
                />
                <label htmlFor="gato">Gato</label>
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
              />
            </div>
          </div>
          <div className={styles.register_buttons}>
            <button onClick={onClose} className={styles.back_button}>
              <IoArrowBackCircleOutline size={25} />
              Voltar
            </button>
            <button type="submit" className={styles.button_register_modal}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;