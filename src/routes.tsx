import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CreatePintor from "./pages/CreatePintor";
import Pintor from "./pages/Profile";
import Perfil from "./pages/Profile";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} path="/" />
        <Route path="/create-pintor" element={<CreatePintor />}></Route>
        <Route path="/pintor" element={<Pintor />}></Route>
        <Route path="/perfil/:id" element={<Perfil />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
