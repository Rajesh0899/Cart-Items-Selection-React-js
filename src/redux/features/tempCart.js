import { createSlice} from "@reduxjs/toolkit";




const cartTemp = createSlice({
    name: 'temp',
    initialState:[],
    reducers: {
        addTempProduct: (state,action)=>{
                const product = action.payload
                return [
                    ...state,
                    {
                        
                        ...product
                    }
                ]
            
            
        },
        productsOutToCart:(state) => {
            return []
        },
        deleteTempProduct:(state,action)=>{
            const product = action.payload
            
                     return state.filter((eachProduct) => eachProduct.id !== product.id)
              
           
        }
    }
})


export default cartTemp.reducer
export const {addTempProduct} = cartTemp.actions
export const {deleteTempProduct} = cartTemp.actions
export const {productsOutToCart} = cartTemp.actions
