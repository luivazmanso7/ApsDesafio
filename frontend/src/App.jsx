
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UsuariosPage from "./Pages/UsuariosPage";
import EditClient from "./Pages/EditClient";
import NewUser from "./Pages/NewUser";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UsuariosPage />} />
        <Route path="/editar/:id" element={<EditClient />} />
        <Route path="/novo-usuario" element={<NewUser />} />
      </Routes>
    </>
  );
}

export default App;