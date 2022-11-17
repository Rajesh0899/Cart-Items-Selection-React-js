import { createSlice } from "@reduxjs/toolkit";

const sortProducts = createSlice({
    name:'sort',
    initialState:[],
    reducers:{
        addProducts:(state, action)=>{
         return [...action.payload]
        },
        
    }
})

export default sortProducts.reducer
export const {addProducts}  = sortProducts.actions
export const {sortProductPrice}  = sortProducts.actions