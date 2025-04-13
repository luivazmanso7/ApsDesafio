import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCliente, atualizarCliente } from "../services/clienteService";
import Forms from "../components/Forms";
import { Snackbar, Alert, Box } from "@mui/material";


export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
      setAlertMessage("Erro ao atualizar cliente.");
      setAlertOpen(true);
      console.error("Erro ao atualizar cliente:", error);
    }
  };


  return (
    <>
      <Box sx={{ mt: 8 }}>
        <Forms
          initialData={initialData}
          onSubmit={handleUpdate}
          title="Editar Cliente"
          buttonText="Atualizar"
        />
      </Box>
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}