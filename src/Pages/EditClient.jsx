import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCliente, atualizarCliente } from "../services/clienteService";
import Forms from "../components/Forms";


export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});
  

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const data = await getCliente(id);
        setInitialData(data);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    };
    fetchCliente();
  }, [id]);

  const handleUpdate = async (clienteAtualizado) => {
    try {
      await atualizarCliente(id, clienteAtualizado);
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