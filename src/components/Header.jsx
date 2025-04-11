import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import styled from "styled-components";
import logoAsc from "../assets/Logo.png";

const FullWidthAppBar = styled(AppBar)`
  width: 100%; /* Ocupa 100% da largura */
  background-color: white !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FullWidthToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  padding: 0 16px;  /* Espaçamento interno, se desejar */
`;

const LogoImage = styled.img`
  height: 48px;
  margin-right: 16px;
`;

export default function Header() {
  return (
    <FullWidthAppBar position="static">
      <FullWidthToolbar>
        <LogoImage alt="Logo ASC" src={logoAsc} />
        {/* Você pode adicionar outros elementos, como o título, aqui */}
      </FullWidthToolbar>
    </FullWidthAppBar>
  );
}