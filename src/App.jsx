import React from 'react';
import { BrowserRouter ,Routes , Route } from 'react-router-dom';
import ProductComponent from './components/ProductComponent';
import CartComponents from './components/CartComponents';
import Invoice from './components/Invoice';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductComponent />} />
        <Route path="/cart" element={<CartComponents />} />
        <Route path='/invoice' element={<Invoice/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
