import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Editorial from "./pages/editorial";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Editorial />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
