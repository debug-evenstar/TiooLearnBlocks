import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Editorial from "./pages/editorial";
import RenderComponent from "./pages/renderComp";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Editorial />}
        />
        <Route
          path="/comp"
          element={
            <RenderComponent/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
