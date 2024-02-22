import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import LoadingSpinner from './LoadingSpinner';
import {NavLink} from 'react-router-dom'
import Pagination from './Pagination'
import {Button, Card, Col, Container, Dropdown, ButtonGroup, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
// import { Button } from '@material-ui/core';

export default function Products() {
const[category,setCategory]=useState("");

  const [data,setData]=useState([]);
  const [filter,setFilter]=useState([]);
  const [filteredList,setFilteredList]=useState([]);
  const [loading,setLoading]=useState(false);
  let componentMounted=true;
  const url="http://localhost:4000/products";
  const [items, setItems] = useState(filter);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [pricing,setPricing]=useState("");
  const [active,setActive]=useState("");
  const [activePrice,setActivePrice]=useState("");
  const [current,setCurrent]=useState(0);

  let itemsPerPage = 3;

  

  useEffect(() => {
    const getProductsPage=async()=> {
      setLoading(true);
      // const response=await fetch(`http://localhost:4000/products?_page=1&_limit=${limit}`);
      const res=await fetch(url);
      // setItems(await res);
      console.log(res);
      if(componentMounted){
        setData(await res.clone().json());
        const x=res.json();
        setFilter(await x);
        setItems(await x);
        setLoading(false);
        console.log(filter);
      }
      return () => {

        componentMounted = false;
      }
      
    }    
    getProductsPage();
  },[]);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setItems(filter.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filter.length / itemsPerPage));
    setCurrent(Math.round(endOffset/itemsPerPage)-1);
  }, [itemOffset, itemsPerPage,filter]);


  

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filter.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    console.log(event);
    setItemOffset(newOffset);
  };

  const Loading = ()=> {
    return(
      <>
        <LoadingSpinner/>
      </>
    )
  }


  

  
  const ShowProducts=()=>{
    const filterProduct=(cat)=>{
      const updatedList=data.filter((x)=>x.category===cat);
      setFilter(updatedList);
      setFilteredList(updatedList);
      setActivePrice("");
      setItemOffset(0);
    }
    const handleClick=(value)=>{
      if(value==="all"){
        setItemOffset(0);
        setFilteredList(data);
        setActivePrice("");
        return setFilter(data);
        
      }
      else{
        return(filterProduct(value));
       
      }
      
    }
  
    const filterPrice=(min,max)=>{
      const updatedList=filteredList.filter((y)=>y.price>=min && y.price<=max);
      console.log(updatedList);
      setFilter(updatedList);
      setItemOffset(0);
    }
  
    const checkPrice=(value)=>{
      if(value===1) return filterPrice(1,50);
      else if(value===2) return filterPrice(50,100);
      else if(value===3) return filterPrice(100,150);
      else if(value===4) return filterPrice(150,200);
      else return filterPrice(200,2000);
     
    }
    
    
    // if(filter.length===0) return <div>No items to show</div>

    return(
      <div style={{backgroundColor:"#16181c",border:"2px white"}}>
        <div className="filters" style={{paddingLeft:"10px",padding:"5px",float:"left",display:"flexbox",flex:"flex-wrap",height:"400px"}}>
   
      <h5>Categories </h5>
          
    <Button size="sm" variant="primary" onClick={(e)=>{handleClick("all");setActive(e.target.id);setCategory("Now showing All products")}} id={"1"} className={active === "1" ? "active" : undefined}>All products</Button>{' '}
      <Button size="sm" variant="primary"  onClick={(e)=>{handleClick("men's clothing");setActive(e.target.id);setCategory("Now showing Men's clothing")}} id={"2"} className={active === "2" ? "active" : undefined}>Men's clothing</Button>{' '}
      <Button size="sm" variant="primary"  onClick={(e)=>{handleClick("women's clothing");setActive(e.target.id);setCategory("Now showing Women's clothing")}} id={"3"} className={active === "3" ? "active" : undefined}>Women's clothing</Button>{' '}
      <Button size="sm" variant="primary"  onClick={(e)=>{handleClick("jewelery");setActive(e.target.id);setCategory("Now showing Jewelery")}} id={"4"} className={active === "4" ? "active" : undefined}>Jewelery</Button>{' '}
      <Button size="sm" variant="primary"  onClick={(e)=>{handleClick("electronics");setActive(e.target.id);setCategory("Now showing Electronics")}} id={"5"} className={active === "5" ? "active" : undefined}>Electronics</Button>{' '}
      
      <h5>Price</h5>
      <Button type="checkbox" size="sm" variant="outline-secondary" onClick={(e)=>{checkPrice(1);setActivePrice(e.target.id);setPricing("with the price range of $1-$50")}} id="p1" className={activePrice === "p1" ? "active" : undefined}>$1-$50</Button>
      <Button size="sm" variant="outline-secondary" onClick={(e)=>{checkPrice(2);setActivePrice(e.target.id);setPricing("with the price range of $50-$100")}} id="p2" className={activePrice === "p2" ? "active" : undefined}>$50-$100</Button>
      <Button size="sm" variant="outline-secondary" onClick={(e)=>{checkPrice(3);setActivePrice(e.target.id);setPricing("with the price range of $100-$150")}} id="p3" className={activePrice === "p3" ? "active" : undefined}>$100-$150</Button>
      <Button size="sm" variant="outline-secondary" onClick={(e)=>{checkPrice(4);setActivePrice(e.target.id);setPricing("with the price range of $150-$200")}} id="p4" className={activePrice === "p4" ? "active" : undefined}>$150-$200</Button>
      <Button size="sm" variant="outline-secondary" onClick={(e)=>{checkPrice(5);setActivePrice(e.target.id);setPricing("with the price range of above $200")}} id="p5" className={activePrice === "p5" ? "active" : undefined}>Above $200</Button>
   
      </div>        


        <Container style={{backgroundColor:"#16181c",justifyContent:"space-around",margin:"5%",marginTop:"10px",height:"content-fit",minHeight:"300px",paddingBottom:"20px",width:"100%"}}>
        <Row xs={1} md={2} lg={3}>
        {/* {filter.map((product)=>{ */}
            {items.map((product)=>{
          return (
            <>
              <Col style={{padding:"10px"}}>
              <Card style={{width:"20rem",display:"grid",border:"1px solid black",borderRadius:"0",borderWidth:"2px",height:"28rem"}} className="box">
              <NavLink to={`/products/${product.id}`}className="NavLink">
              <Card.Body>
                <Card.Title id="title">{product.title}</Card.Title>
                <Card.Img variant="top" src={product.image} height="220px" width="200px" alt="" />
                  <Card.Text>Category : {product.category}</Card.Text>
                  <Card.Text>Actual Price : <s>$ {product.price}</s></Card.Text>
                  <Card.Text>Dicount Price :<strong> ${(product.price-(product.price*product.discount/100)).toFixed(2)}</strong>({product.discount}% off)</Card.Text>
                  <Card.Text>Rating : {product.rating.rate}⭐ </Card.Text>
                </Card.Body>
                </NavLink>
              </Card>
              </Col>
            </>
          );
        })}
          </Row>
          </Container>

       
      </div>
      
    )
    
  }
  return (
    <div style={{backgroundColor:"#16181c"}}>
     
     
        <div  >
        <Banner
          Image= "Internet.jpg"
          Heading = "INTERNET"
          SubHeading = "Strong and reliable - just like Dad"
          Description = "Whether he is across town, or across the country, stay conneccted to Dad with superfast internet."
          Button= "Click here"  
          Color="orange"/>
        </div>
        <div style={{backgroundColor:"#16181c",paddingBottom:"10px",textAlign:"center"}}><h2>Welcome to shopping</h2>
        <h6>{category+" "+pricing}</h6>
        </div>
        <div className="row-justify-content-center">
          {loading?<Loading/>:<ShowProducts/>}

          
        </div>Page : {current+1} of  {pageCount}<div>
        <ReactPaginate
        initialSelected={1}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        disableInitialCallback={false}
        forcePage={current}/>
        </div>
        <div className='Footercss'>
      <h5> Thank you!</h5>
          <p>
             Thanks for visiting our website. We give our best to provide good content for visitors.
             Please provide your feedback in the above form. Have a nice day.          </p>
             <div className="text-center p-3">
      © 2020 Copyright: 
      <a href="https://infosys.com/"> Infosys.com</a>
        </div>    
      </div>
    
 
    </div>
  )
}
