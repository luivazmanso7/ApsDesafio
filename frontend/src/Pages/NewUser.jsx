import React, { useState } from "react";
import Forms from "../components/Forms"; 
import { useNavigate } from "react-router-dom";
import { criarCliente } from "../services/clienteService";
import { Snackbar, Alert, Box } from "@mui/material";


export default function NewUser() {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (usuario) => {
    try {
      await criarCliente(usuario);
      navigate("/"); 
    } catch (error) {
      setAlertMessage("Erro ao cadastrar usuário.");
      setAlertOpen(true);
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <>
      <Box sx={{ mt: 6 }}>
        <Forms
          onSubmit={handleSubmit}
          initialData={initialData}
          setInitialData={setInitialData}
          title="Cadastrar Novo Usuário"
          buttonText="Cadastrar"
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