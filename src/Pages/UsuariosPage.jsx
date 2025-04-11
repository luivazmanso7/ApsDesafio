import React from "react";
import styled from "styled-components";
import { Container, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserTable from "../components/UseTable";

const PageWrapper = styled(Container)`
  margin-top: 90px;
  padding-bottom: 32px;
`;

export default function UsuariosPage() {
  return (
    <PageWrapper maxWidth="lg">
      {/* Caixa flex que coloca o título à esquerda e o botão à direita */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">Lista de Usuários</Typography>
        <Button variant="contained" component={Link} to="/novo-usuario">
          Cadastrar Novo Cliente
        </Button>
      </Box>
      <UserTable />
    </PageWrapper>
  );
}