import { Badge, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useUserContext } from './Cart';




function Header() {
  const {cartItems}=useUserContext();
  return (
    <>
    <Row xs={1} lg={1} md={1} sm={1}>
      <Navbar bg="dark" variant="dark" style={{backgroundColor:"dark",width:"99%"}}>
    <Container style={{backgroundColor:"black"}}>

    <div className="left"><img className='Brand' src='Infosys_logo.svg' alt='' style={{ height: 25, width: 50}}/></div>
      <Nav className="me-auto">
        <div className="headerLeft"><Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/countries">Countries</Nav.Link>
        <Nav.Link as={Link} to="/products">Products</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
        <Nav.Link as={Link} to="/mylearnings">My Learnings</Nav.Link>
        </div>
        
      </Nav>
      <Nav>

        <div className="cartIcon"> <Nav.Link as={Link} to="/cart">
          <Badge color="primary" >
            <ShoppingCartIcon/>({cartItems.length})</Badge></Nav.Link>
        </div>
      </Nav>
    
  </Container>
</Navbar>
</Row>

    </>
  );
}

export default Header;
