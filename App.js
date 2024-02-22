
import './App.css';
//import BootstrapCarousel from './components/BootstrapCarousel';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Contact from './components/Contact';
import Countries from './components/Countries';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
import MyLearnings from './components/MyLearnings';
import CartItem from './pages/Cart';
// import Hero from '../Hero.jpg';



function App() {
  return (
         
  <div className="App">
    <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
>
    
    <Router>
     <Header/>
     
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/countries" element={<Countries/>} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/contact" element={<Contact/>} />
        <Route path="/cart" element={<CartItem/>}/>
        <Route path="/mylearnings" element={<MyLearnings/>}/>
        <Route path="/products/:id" element={<Product/>}/>
      </Routes>
    </Router>
    </ThemeProvider>
  </div>
  );
}

export default App;
