
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UsuariosPage from "./Pages/UsuariosPage";
import EditClient from "./Pages/EditClient";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UsuariosPage />} />
        <Route path="/editar/:id" element={<EditClient />} />
      </Routes>
    </>
  );
}

export default App;