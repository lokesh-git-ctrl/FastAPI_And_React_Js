import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ProductProvider } from './ProductContext';
import ProductsTable from './components/ProductsTable';
import AddProducts from './components/AddProducts'; 

function App() {
  return (
    <Router>
  <ProductProvider>
    <NavBar />
    <Routes>
      <Route path="/" element={<ProductsTable />} />
      <Route path="/addproduct" element={<AddProducts />} />
    </Routes>
  </ProductProvider>
</Router>

  );
}

export default App;
