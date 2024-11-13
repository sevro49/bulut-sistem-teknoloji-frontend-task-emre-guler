import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '@/types/types.ts';

// API URL
const PRODUCTS_URL = "https://dummyjson.com/products?limit=200";

// Request to fetch all products
export const fetchProducts = createAsyncThunk(
  'requests/fetchProducts',
  async () => {
    const response = await axios.get(PRODUCTS_URL);
    console.log(response?.data?.products)
    return response.data.products;
  }
)

const requestSlice = createSlice({
  name: 'requests',
  initialState: {
    products: [] as Product[],
    filteredProducts: [] as Product[],
    status: 'idle',
    error: null as string | null, // error type is string or null
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

    // fetchProducts
    .addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.products = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || null;
    })
  }
});

// export const {} = requestSlice.actions;
export default requestSlice.reducer;
