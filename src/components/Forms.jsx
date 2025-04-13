import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Grid, Paper, Alert, Snackbar } from "@mui/material";
import styled from "styled-components";
import isEqual from "lodash/isEqual";
import { consultarCNPJ, consultarCEP } from "../services/clienteService";


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
  
  const [cnpjError, setCnpjError] = useState(false);
  const [cepError, setCepError] = useState(false);

  useEffect(() => {
    // Só atualiza se initialData for realmente diferente do estado atual
    if (!isEqual(initialData, {})) {
      setCliente(prev => (isEqual(prev, initialData) ? prev : { ...prev, ...initialData }));
    }
  }, [initialData]);

  useEffect(() => {
    const cleaned = cliente.cnpj.replace(/\D/g, "");
    if (cleaned.length === 14 && validarCNPJ(cleaned)) {
      const fetchCnpjData = async () => {
        try {
          const data = await consultarCNPJ(cleaned);

          setCliente((prev) => ({
            ...prev,
            nome: data.razao_social || prev.nome,
            nome_fantasia: data.estabelecimento?.nome_fantasia || prev.nome_fantasia,
            cep: data.estabelecimento?.cep || prev.cep,
            logradouro: data.estabelecimento?.logradouro || prev.logradouro,
            bairro: data.estabelecimento?.bairro || prev.bairro,
            cidade: data.estabelecimento?.cidade?.nome || prev.cidade,
            uf: data.estabelecimento?.estado?.sigla || prev.uf,
            complemento: data.estabelecimento?.complemento || prev.complemento,
            email: data.estabelecimento?.email || prev.email,
            telefone: data.estabelecimento?.telefone1 || prev.telefone,
          }));
        } catch (err) {
          console.error("Erro ao buscar dados do CNPJ:", err);
        }
      };
      fetchCnpjData();
    }
  }, [cliente.cnpj]);

  useEffect(() => {
    const cleanedCep = cliente.cep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
      const fetchCepData = async () => {
        try {
          const data = await consultarCEP(cleanedCep);
          if (data.erro) {
            setCepError(true);
            return;
          }

          setCliente((prev) => ({
            ...prev,
            logradouro: data.logradouro || prev.logradouro,
            bairro: data.bairro || prev.bairro,
            cidade: data.localidade || prev.cidade,
            uf: data.uf || prev.uf,
            complemento: data.complemento || prev.complemento,
          }));

          setCepError(false);
        } catch (err) {
          console.error("Erro ao buscar dados do CEP:", err);
          setCepError(true);
        }
      };
      fetchCepData();
    }
  }, [cliente.cep]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cnpj") {
      const cleaned = value.replace(/\D/g, "");
      setCliente({ ...cliente, [name]: cleaned });
      setCnpjError(cleaned.length === 14 ? !validarCNPJ(cleaned) : true);
    } else {
      setCliente({ ...cliente, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedCNPJ = cliente.cnpj.replace(/\D/g, "");

    if (!validarCNPJ(cleanedCNPJ)) {
      alert("Corrija o CNPJ antes de enviar.");
      return;
    }

    onSubmit({ ...cliente, cnpj: cleanedCNPJ });
  };

  //funcao validar cpnj 
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
  
    if (cnpj.length !== 14) return false;
  
    const numeros = cnpj.split('').map(Number);
  
    // Peso para o primeiro dígito
    const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const soma1 = peso1.reduce((acc, peso, i) => acc + numeros[i] * peso, 0);
    const resto1 = soma1 % 11;
    const digito1 = resto1 < 2 ? 0 : 11 - resto1;
  
    // Peso para o segundo dígito
    const peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const soma2 = peso2.reduce((acc, peso, i) => acc + numeros[i] * peso, 0);
    const resto2 = soma2 % 11;
    const digito2 = resto2 < 2 ? 0 : 11 - resto2;
  
    return numeros[12] === digito1 && numeros[13] === digito2;
  }

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
                error={cnpjError}
                helperText={cnpjError ? "CNPJ inválido" : ""}
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
                error={cepError}
                helperText={cepError ? "CEP inválido ou não encontrado" : ""}
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
      {(cnpjError || cepError) && (
        <Snackbar open autoHideDuration={3000}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {cnpjError ? 'CNPJ inválido!' : 'CEP inválido ou não encontrado!'}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
}