import React, { useState } from "react";
import Forms from "../components/Forms"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewUser() {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});

  const handleSubmit = async (usuario) => {
    try {
      await axios.post("http://localhost:3000/clientes", usuario);
      navigate("/"); 
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <Forms
      onSubmit={handleSubmit}
      initialData={initialData}
      setInitialData={setInitialData}
      title="Cadastrar Novo Usuário"
      buttonText="Cadastrar"
    />
  );
}