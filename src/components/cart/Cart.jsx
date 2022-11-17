import React, { useEffect, useState } from 'react'
import { removeProductFromCart , addProductToCart, orderPlaced, deleteProduct } from '../../redux/features/cartSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link} from 'react-router-dom'

import { Table,  TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'

const Cart = () => {
  
  useEffect(()=>{
    if(totalAmount > 0){
      setPlaceOrderProducts(true)
     }else{
      setPlaceOrderProducts(false)
     }

  })
 
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart)




  const [placeOrderProducts, setPlaceOrderProducts] = useState(false)

    const checkStock = (product) =>{
      // console.log(product)
      if(product.qty < product.stock){
        dispatch(addProductToCart(product))
      }else{
        alert('Out of Stock')
      }
    }

  let totalAmount = 0
   
   const itemTotal = (p,q) => {
    let rp = p
    
    let iT = rp*q
     totalAmount +=iT
    return iT
   }
    
   const proceedToCheckOut =() =>{
     if(totalAmount > 0){
      dispatch(orderPlaced())
     }else{
      alert('Add Products to place order')
     }
   } 

    if(!products) return 'loading'
   
  return (
    <div className='flex-xs-column flex-sm-column flex-md-row mt-5' style={{width:'100%', height:'100%', display:'flex', flexDirection:'column',  justifyContent:'center', gap:'20px'}} >
    
    <div className='' style={{display:'flex', flexWrap:'wrap', gap:'0px', width:'60%',  }}>
{products.length === 0 ? <div className='d-flex justify-content-center align-items-center flex-column  ' style={{width:'100%', height:'auto', }}> <h1> Your cart is empty</h1> <br/> <Link to='/' className='text-decoration-none'> Click here to Shop </Link> </div> : null } 


<TableContainer>
<Table aria-label='products table'>
     <TableHead>
         <TableRow>
              <TableCell></TableCell>
              <TableCell >Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell> Subtotal</TableCell>

             
         </TableRow>
     </TableHead>


     
     <TableBody>
          {products.length > 0 ? products.map(product => (
            <TableRow key={product.id} hover>
               <TableCell>
                <button className='bg-white btn btn-close border-0 text-muted fw-bolder' onClick={()=> dispatch(deleteProduct(product)) }>  </button>
               </TableCell>
                 <TableCell>
                  <img src={product.productImage} alt={product.productName} width={'100px'} height={'100px'}/> <span>{product.productName} </span>
                 </TableCell>
                 <TableCell>
                 {`$ ${product.productPrice}`}
                 </TableCell>
                 <TableCell>
                  <div  className='p-2 px-3  shadow-lg' style={{border:'1px solid #b0b0b0', borderRadius:'20px', height:'auto', width:'auto'}}> 
                  <button className='border-0 bg-light fw-bold ' onClick={() => dispatch(removeProductFromCart(product))}>-</button>
                 <span className='px-2' >{product.qty}</span> 
                 <button className='border-0 bg-light fw-bold'onClick={() => checkStock(product)}>+</button>

                     </div>
                 </TableCell>
                 <TableCell>
                 <p className='text-primary fw-bold'>{itemTotal(product.productPrice, product.qty)} $</p> 
                 </TableCell>
                 
            </TableRow>
          )) : null}
     </TableBody>
</Table>
</TableContainer>


  

</div>


      <div style={{display:'flex', flexDirection:'column', flexWrap:'NoWrap', width:'300px'}} className=' px-3 shadow-lg text-center  rounded-5 '>
       <h5 className='text-start mt-5 text-muted '  style={{}}>Check totals</h5>
         {products.map((product) => (
         <div className='mt-3 p-2 px-5 rounded-5' style={{background:'#F3F3F3'}}>
           <h6 className='text-start'>{product.productName}</h6>
           <div className='d-flex flex-nowrap   '>
           <p className='me-2 d-inline'>{`${product.productPrice} X ${product.qty}  =`}</p>
           <p className='fw-bolder text-primary d-inline' style={{textColor:'#1246AF'}}>{itemTotal(product.productPrice, product.qty)} $</p>
           </div>
           
         </div>
         ))}
         <hr/>
          <div className='mt-1 h5 d-flex justify-content-between'> <p>Total :</p>  <p className='text-primary' style={{fontWeight:'bold'}}> {totalAmount} $</p> </div> 
        
         
          <div style={{borderRadius:'20px', fontSize:'12px', background:'#1246AF'}}  onClick={() => proceedToCheckOut() } className='btn   fw-bold text-white rounded-5 mb-3' data-bs-toggle="modal" data-bs-target="#exampleModal">PROCEED TO CHECKOUT</div> 

          
{/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Launch demo modal
</button> */}


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
 <div className="modal-content">
   <div className="modal-header">
     <h1 className="modal-title fs-5" id="exampleModalLabel">Order Placed</h1>
     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div className="modal-body ">
     <p>Thank you for order placing</p>
   </div>
   <div className="modal-footer">
     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    
   </div>
 </div>
</div>
</div>
      </div>
        
</div>
  )
}




export default Cart