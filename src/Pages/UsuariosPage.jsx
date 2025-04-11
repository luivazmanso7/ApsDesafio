import React from "react";
import styled from "styled-components";
import { Container, Box } from "@mui/material";
import UserTable from "../components/UseTable";

const PageWrapper = styled(Container)`
  margin-top: 48px;
  padding-bottom: 32px;
`;

export default function UsuariosPage() {
  return (
    <PageWrapper maxWidth="lg">
      <Box display="flex" justifyContent="center" mb={4}>
        
      </Box>
      <UserTable />
    </PageWrapper>
  );
}