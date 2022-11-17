
import {React, useState, useEffect}  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBulkProductsTCart } from '../../redux/features/cartSlice'
import { fetchProducts } from '../../redux/features/productsSlice'

import { addProducts } from '../../redux/features/sortProducts'
import { productsOutToCart } from '../../redux/features/tempCart'
import LoadingSpinner from '../loading/LoadingSpinner'

import './header.css'

const Header = () => {
 
  useEffect(() => {
    dispatch(fetchProducts())
    
  }, [])

 const products = useSelector((state)=> state.products.products)
 const loading = useSelector((state)=> state.products.loading)

 const dispatch = useDispatch()

 const [category, setCategory] = useState('')
 const [size, setSize] = useState('')
 const [search, setSearch] = useState('')

 

 const tempProducts = useSelector((state)=> state.temp)
//  console.log(tempProducts)
  
 useEffect(() => {

  const categoryfilterProducts = category !== '' && products.length > 0 ? products.filter((product) => product.category === category) : products
  if(categoryfilterProducts.length > 0 ){
    dispatch(addProducts(categoryfilterProducts))
  }

 }, [category]) 

 useEffect(() => {
  const sizefilterProducts = size !== '' && products.length > 0 ? products.filter((product) => {
    return  product.category === category && product.size === size }) : products
  if(sizefilterProducts.length > 0){
    dispatch(addProducts(sizefilterProducts))
  }
   
 }, [size])
 
 useEffect(() => {
  const searchfilterProducts = search !== '' && products.length > 0 ? products.filter((product) => product.productName.toLowerCase().includes(search)) : products
  if(searchfilterProducts.length > 0){
    dispatch(addProducts(searchfilterProducts))
  }
   
 }, [search])

useEffect(()=>{
  setTimeout(()=>{
    setCategory('Hoodies')
   },2000)
},[])


const navigate = useNavigate()
//  console.log(products)

  const reset = () => {
   setCategory('')
   setSize('')
  }
  const onClickAddToCart = () => { 
    if(tempProducts.length > 0){
      dispatch(addBulkProductsTCart(tempProducts))
    dispatch(productsOutToCart())
    navigate('cart/checkout')
    }else{
      alert('select the products')
    }
    
  
  }
  
  if(!products) return <LoadingSpinner/>


  return (
<div className='header mb-2 d-flex justify-content-between  align-items-center'>
   <div className='d-flex gap-2 ms-3'>
      <div >
       <select id = 'select' style={{width:'100px' , borderRadius:'5px'}} value={category} onChange={(e)=> setCategory(e.target.value)} >
        <option  value='' >Select</option>
        <option  value='Hoodies'>Hoodies</option>
        <option  value='Shirts' >Shirts</option>
       </select>
     </div>
     <div >
       <select id = 'size' className='d-flex text-center border-1 px-1' style={{width:'auto', borderRadius:'5px'}} value={size} onChange={(e)=> setSize(e.target.value)} >
        <option value='' >Size</option>
        <option value='S' >S</option>
        <option value='M' >M</option>
        <option value='L' >L</option>
        <option value='XL' >XL</option>
       </select>
     </div>
     <div className=''  style={{color:'#5EC2DC'}} onClick={()=> reset()}>
      <i className='fa fa-rotate-left  me-1'/>
     <span className='fw-bold' style={{color:'#5EC2DC'}} type='button'  >Reset</span>
      
     </div>
  </div>
       <div className='d-flex gap-3 me-3'>
             <div>
               <label htmlFor='search'>Search:</label>
               <input id='search' className='border-1 ms-2 ' style={{background:'#ededed', borderColor:'#bfbfbf'}} value={search} onChange={(e)=> setSearch(e.target.value)} />
            </div>
             <div>
              {/* <Link to={'/cart/checkout'}> */}
               <button onClick={()=> onClickAddToCart() } className='fw-bold border-0 p-1 px-3' style={{background:'#5EC2DC', color:'whitesmoke',  fontSize:'15px'}}> Add To Cart</button>
               {/* </Link> */}
             </div>
       </div>

       
</div>
  )
}



export default Header

