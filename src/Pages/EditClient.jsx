import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Forms from "../components/Forms";


export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});
  

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/clientes/${id}`);
        setInitialData(response.data);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    };
    fetchCliente();
  }, [id]);

  const handleUpdate = async (clienteAtualizado) => {
    try {
      await axios.put(`http://localhost:3000/clientes/${id}`, clienteAtualizado);
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };


  return (
    <Forms
      initialData={initialData}
      onSubmit={handleUpdate}
      title="Editar Cliente"
      buttonText="Atualizar"
    />
  );
}