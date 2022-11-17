
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/cart/Cart';
import Footer from './components/Footer';

import Home from './pages/Home';


function App() {
  return (
    <div >
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cart/checkout' element={<Cart/>} />
      <Route path='*' element={<Home/>} />
     </Routes>
     <Footer/>
      
    </div>
  );
}

export default App;
