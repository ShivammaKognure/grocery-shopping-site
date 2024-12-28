import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./ProductService";
import { thunk } from "redux-thunk";

//1.Create store
const productsSlice = createSlice({
  name:'products',
  initialState:{
    veg:[],
    nonVeg:[],
    status: '',
  },
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(fetchProducts.pending,(state)=>{
              state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled,(state,action)=>{
              state.status='succeeded';
              state.veg = action.payload.veg || [];
              state.nonVeg = action.payload.nonVeg || [];
            })
            .addCase(fetchProducts.rejected,(state,action)=>{
              state.status = 'failed';
              state.error = action.error.message;
            });
  },
})

const cartSlice=createSlice({
  name:'cart',
  initialState:[],
  reducers:{
    addToCart:(state,action) =>{
      const item = state.find(item => item.name === action.payload.name)
      
      if(item){ 
        item.quantity += 1;
        
      }else{
        state.push({...action.payload,quantity:1});
      }
    }
    ,
    increment:(state,action)=>{
      const item = state.find(item => item.name === action.payload.name)
      if(item){
        item.quantity += 1;
      }
    }
    ,

    decrement:(state,action) =>{
      const item= state.find(item => item.name === action.payload.name)

      if(item && item.quantity >1){
        item.quantity -= 1
      }else{
        return state.filter(item => item.name !== action.payload.name)
      }

    }
    ,
    removeItem:(state,action) =>{
      const item = state.find(item => item.name === action.payload.name)

      if(item){
        return state.filter(item => item.name !== action.payload.name)
      }
    }
    ,
    clearCart: () =>[]

  }
});
export const {addToCart,increment,decrement,removeItem,clearCart} =cartSlice.actions;

const purchaseHistorySlice = createSlice({
  name:'purchaseHistory',
  initialState:[],
  reducers:{
    addPurchase:(state,action) => {
      state.push(action.payload);
    }
  }
}); 
export const {addPurchase} = purchaseHistorySlice.actions;

export const fetchProducts = createAsyncThunk('products/fetchProducts',
  async ()=>{
    const response = await getProducts();//fetch products from api

    //filter item based on category
    const veg = response.filter(item => item.category === 'veg');
    const nonVeg = response.filter(item => item.category === 'nonveg');
    
    return{veg,nonVeg};
  }
);





//2.Configure store
const store=configureStore({
  reducer:{
    products:productsSlice.reducer,
    cart:cartSlice.reducer,
    purchaseHistory:purchaseHistorySlice.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)

});

//3.export store 
export default store;