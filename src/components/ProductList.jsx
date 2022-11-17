import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';



import LoadingSpinner from '../components/loading/LoadingSpinner'


import { Table,  TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'

import { addTempProduct, deleteTempProduct } from '../redux/features/tempCart';



const ProductList = () => {
 

  const filteredProducts =  useSelector((state)=> state.sort)


  const dispatch = useDispatch()



  const [sort, setSort] = useState({currentSort:'defaul'})

  const loading = useSelector((state)=> state.products.loading)
   


const [sortTypes, setSortTypes] = useState({
  up: {
    class :'sort-up',
    fn: (a,b) => a.productPrice - b.productPrice
  },
  down:{
    class:'sort-down',
    fn: (a,b) => b.productPrice - a.productPrice
  },
  defaul:{
    class:'sort',
    fn: (a,b) => a
  }
})

 
const onSortChange = (filterItem) =>{

  if(filterItem === 'productPrice'){
   setSortTypes({
    up: {
      class :'sort-up',
      fn: (a,b) => a.productPrice - b.productPrice
    },
    down:{
      class:'sort-down',
      fn: (a,b) => b.productPrice - a.productPrice
    },
    defaul:{
      class:'sort',
      fn: (a,b) => a
    }
  })
    
  } 

  if(filterItem === 'stock'){
    setSortTypes({
      up: {
        class :'sort-up',
        fn: (a,b) => a.stock - b.stock
      },
      down:{
        class:'sort-down',
        fn: (a,b) => b.stock - a.stock
      },
      defaul:{
        class:'sort',
        fn: (a,b) => a
      }
    })
 }

  const {currentSort} = sort
  let nextSort
  
  if(currentSort === 'down') nextSort = 'up'
  else if(currentSort === 'up') nextSort = 'defaul'
  else if (currentSort === 'defaul') nextSort ='down'

  setSort({
    currentSort: nextSort
  })
}


const {currentSort} = sort

const [checked, setChecked] = useState([])
const [qty, setQty] = useState({})

// console.log(qty)


const onCheckBoxChange = (product) =>{
  let {size, id} = product
  let key = size+id
  let index= product.id
  if(checked){
  
    dispatch(deleteTempProduct(product))
    setChecked((prevchecked)=>{
      let copy = prevchecked
      copy[index] = false
      return copy
    })
  }
  if(checked[index] !== true){
     if(qty[key] > 0) {
        if(Number(qty[key]) <= product.stock){
   let combinedProduct = {...product, qty:qty[key]}
   dispatch(addTempProduct(combinedProduct))
   setChecked((prevchecked)=>{
    let copy = prevchecked
    copy[index] = true
    return copy
  })
  }else{
    alert(`out of stock. Stock is limited to ${product.stock} only`)
    setChecked((prevchecked)=>{
      let copy = prevchecked
      copy[index] = false
      return copy
    })
  }
}else{
  alert('Enter Quantity')
  setChecked((prevchecked)=>{
    let copy = prevchecked
    copy[index] = false
    return copy
  })
}

  }



  }



 if(!filteredProducts) return <LoadingSpinner/>
if(loading) return <LoadingSpinner/>
 


  return (
    <div>
        
        <div>
      
        
           <TableContainer>
              <Table aria-label='simple table'>
                   <TableHead>
                       <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>
                            <button className='border-0 bg-light' onClick={()=> onSortChange('stock')}>
                              <i className={`fa fa-${sortTypes[currentSort].class}`} />
                              </button>
                              Stock</TableCell>
                            <TableCell> 
                              <button className='border-0 bg-light' onClick={()=> onSortChange('productPrice')}>
                              <i className={`fa fa-${sortTypes[currentSort].class}`} />
                              </button>
                               Price</TableCell>

                            <TableCell align='right'>Buy</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                        {filteredProducts.length > 0 ? [...filteredProducts].sort(sortTypes[currentSort].fn).map((product, index) => (
                          
                          <TableRow key={product.id} hover>
                               <TableCell>
                          <img src={product.productImage} alt={product.productName} width={'50px'} height={'60px'}/> {}
                               </TableCell>
                               <TableCell>
                               <span className='fw-bold' style={{color:'#11a0c4'}}> {product.productName} </span> 
                               </TableCell>
                               <TableCell>
                               <span className='fw-bold' style={{color:'#11a0c4'}}>{product.productColor} </span>
                               </TableCell>
                               <TableCell>
                                {product.stock > 0 ?<>  <span className='text-success fw-bold '> <SentimentSatisfiedAltIcon/> In stock </span> </>: <span className='text-danger fw-bold'> <SentimentVeryDissatisfiedIcon/> Out of stok</span>  }
                               </TableCell>
                               <TableCell>
                                {`$ ${product.productPrice}`}
                               </TableCell>
                               <TableCell align='right'>
                            <div className=' d-flex justify-content-end align-items-center gap-2  me-2'>
                                <div className='d-flex gap-1'>
                                  
                            { product.stock > 0 ?
                            <>
                            <label> Qty</label>
                                <input value={qty[product.size+product.id] } type='text' className='shadow' style={{width:'50px', background:'#ebebeb', border:'1px solid #8e8e8e'}}  onChange={(e)=>{
                                     let {size, id} = product
                                     let key = size+id
                                      setQty((prevqty)=>{
                                        let copy = prevqty
                                        if(e.target.value)
                                        copy[key] = e.target.value
                                        return copy
                                      })
                                   
                                }} />
                                </>
                              :  <input  disabled className='shadow' style={{width:'50px', background:'#ebebeb', border:'none'}}  />
                              }
                                <div  className='bg-dark text-light text-center' style={{width:'50px'}}> <i className='fa fa-cart-plus'/> </div>
                                </div>
                                <div>
                                { product.stock > 0 ? <input checked={checked[product.id]}  className='shadow' type={'checkbox'} onChange={()=> onCheckBoxChange(product)}/> : <input disabled className='shadow' type={'checkbox'} ></input> }
                                
                                
                                </div>
                            </div>
                                
                               </TableCell>
                          </TableRow>
                        )) : null}
                   </TableBody>
              </Table>
              </TableContainer>
        </div>
    </div>
  )
}

export default ProductList