import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,Box,IconButton,Tooltip, } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom"; 

export default function UserTable() {
  
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/clientes");
        setUsuarios(res.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchData();
  }, []);

  const headers = [
    "CNPJ",
    "Nome",
    "Nome Fantasia",
    "CEP",
    "Logradouro",
    "Bairro",
    "Cidade",
    "UF",
    "Complemento",
    "Email",
    "Telefone",
    "Ações", 
  ];

  const handleEdit = (usuario) => {
    console.log("Editar:", usuario);
    navigate(`/editar/${usuario.id}`);
    
    
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await axios.delete(`http://localhost:3000/clientes/${id}`);
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
      }
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table
          sx={{
            tableLayout: 'auto',
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 'bold',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f5f5f5',
                    padding: '8px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario, index) => (
              <TableRow
                key={usuario.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa',
                }}
              >
                <TableCell sx={nowrapCenter}>{usuario.cnpj}</TableCell>
                <TableCell sx={wrapLeft}>{usuario.nome}</TableCell>
                <TableCell sx={wrapLeft}>{usuario.nome_fantasia}</TableCell>
                <TableCell sx={nowrapCenter}>{usuario.cep}</TableCell>
                <TableCell sx={wrapLeft}>{usuario.logradouro}</TableCell>
                <TableCell sx={wrapLeft}>{usuario.bairro}</TableCell>
                <TableCell sx={nowrapCenter}>{usuario.cidade}</TableCell>
                <TableCell sx={nowrapCenter}>{usuario.uf}</TableCell>
                <TableCell sx={wrapLeft}>{usuario.complemento}</TableCell>
                <TableCell sx={wrapLeft}>{usuario.email}</TableCell>
                <TableCell sx={nowrapCenter}>{usuario.telefone}</TableCell>
                <TableCell sx={centeredActions}>
                  <Tooltip title="Editar">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(usuario)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

//  Estilos

const nowrapCenter = {
  padding: '8px',
  border: '1px solid #e0e0e0',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const wrapLeft = {
  padding: '8px',
  border: '1px solid #e0e0e0',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  textAlign: 'left',
  verticalAlign: 'middle',
};

const centeredActions = {
  padding: '8px',
  border: '1px solid #e0e0e0',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};