import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import styled from "styled-components";
import logoAsc from "../assets/Logo.png";

const TopBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #1976d2; /* Azul padrão do Material UI */
`;

const FullWidthAppBar = styled(AppBar)`
  width: 100%;
  background-color: white !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FullWidthToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const LogoImage = styled.img`
  height: 48px;
  margin-right: 16px;
`;

export default function Header() {
  return (
    <>
      <TopBar />
      <FullWidthAppBar position="static">
        <FullWidthToolbar>
          <LogoImage alt="Logo ASC" src={logoAsc} />
        </FullWidthToolbar>
      </FullWidthAppBar>
    </>
  );
}