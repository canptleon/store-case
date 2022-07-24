import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"
import Homepage from './pages/Homepage/homepage';
import ProductDetail from './pages/ProductDetail/productDetail';
import AddProduct from './pages/AddProduct/addProduct';

function App() {
  return (
    <Routes>
      <Route path="/homepage" element={<Homepage />}/>
      <Route path="/add-product" element={<AddProduct />}/>
      <Route path="/product-detail" element={<ProductDetail />}/>
      <Route path="*" element={<Navigate to="/homepage" />}/>
		</Routes>
  );
}

export default App;
