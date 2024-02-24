import { FC, useState } from "react";
import styles from "../app/page.module.css";
import { IoClose } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";

interface ModalRemoveProps {
  onClose: () => void;
  onRemoveItem: () => void;
  petData: Pet;
}

export interface Pet {
  nome: string;
  dono: string;
  raca: string;
  telefone: string;
  dataNascimento: string;
}

const ModalRemove: FC<ModalRemoveProps> = ({
  onClose,
  onRemoveItem,
  petData,
}) => {
  const [formData, setFormData] = useState<Pet>(petData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRemoveItem();
    onClose();
  };

  return (
    <div className={styles.register_animal_container}>
      <div className={styles.register_animal}>
        <div className={styles.header_animal}>
          <div className={styles.div_circle}>
            <FiTrash />
          </div>
          <h1>Remover</h1>
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
                readOnly 
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
                readOnly 
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
                onChange={handleChange}
                placeholder="(00) 0 0000-0000"
                readOnly 
              />
            </div>
          </div>

          <div className={styles.form_section}>
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
                readOnly 
              />
            </div>
            <div>
              <label>
                <img className={styles.calendar} src="/calendar.svg" alt="" />
                Nascimento <span>(Aproximado)</span>
              </label>
              <input
                type="text" 
                placeholder="22/08/2020"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                readOnly 
              />
            </div>
          </div>
          <div className={styles.register_buttons}>
            <button onClick={onClose} className={styles.back_button}>
              Voltar
            </button>
            <button type="submit" className={styles.button_register_modal}>
              Remover
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRemove;
