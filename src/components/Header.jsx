import React from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import styled from 'styled-components';
import logoAsc from '../assets/Logo.png'; // 👈 com letra maiúscula se o arquivo tiver 'Logo.png'

// 🧩 Styled Components
const StyledAppBar = styled(AppBar)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
`;

const Logo = styled(Avatar)`
  width: 48px;
  height: 48px;
  margin-right: 16px;
`;



export default function Header() {
  return (
    <StyledAppBar position="static" color="primary">
      <StyledToolbar>
        <Logo alt="Logo ASC" src={logoAsc} />
      </StyledToolbar>
    </StyledAppBar>
  );
}