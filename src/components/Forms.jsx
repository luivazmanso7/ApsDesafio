// src/components/Forms.jsx
import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import styled from "styled-components";

const FormPaper = styled(Paper)`
  padding: 16px;
  margin-top: 70px;
`;


const FullWidthContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 16px;
`;

export default function Forms({
  initialData = {},
  onSubmit,
  title = "Cadastrar Cliente",
  buttonText = "Salvar",
}) {
  const [cliente, setCliente] = useState({
    nome: "",
    cnpj: "",
    nome_fantasia: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    complemento: "",
    email: "",
    telefone: "",
    ...initialData,
  });

  // Se initialData mudar (por exemplo, no caso de edição), atualiza os dados do formulário
  useEffect(() => {
    setCliente(prev => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cliente);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <FormPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="nome"
                label="Nome"
                value={cliente.nome}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="cnpj"
                label="CNPJ"
                value={cliente.cnpj}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="nome_fantasia"
                label="Nome Fantasia"
                value={cliente.nome_fantasia}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="cep"
                label="CEP"
                value={cliente.cep}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="logradouro"
                label="Logradouro"
                value={cliente.logradouro}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="bairro"
                label="Bairro"
                value={cliente.bairro}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="cidade"
                label="Cidade"
                value={cliente.cidade}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="uf"
                label="UF"
                value={cliente.uf}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="complemento"
                label="Complemento"
                value={cliente.complemento}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={cliente.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="telefone"
                label="Telefone"
                value={cliente.telefone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit">
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormPaper>
    </Container>
  );
}