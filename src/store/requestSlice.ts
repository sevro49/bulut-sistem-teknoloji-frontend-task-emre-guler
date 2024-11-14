import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '@/types/types.ts';

// API URL
const PRODUCTS_URL = "https://dummyjson.com/products?limit=200";

// Request to fetch all products
export const fetchProducts = createAsyncThunk(
  'requests/fetchProducts',
  async () => {
    const response = await axios.get(PRODUCTS_URL);
    console.log(response.data.products)
    return response.data.products;
  }
);

// Sort products based on price (ascending or descending)
const sortProducts = (products: Product[], order: 'ascending' | 'descending' | 'default'): Product[] => {
  if (order === 'default') {
    return products; // If no sorting, return products as they are
  }
  
  return [...products].sort((a, b) => {
    if (order === 'ascending') {
      return a.price - b.price;
    } else if (order === 'descending') {
      return b.price - a.price;
    }
    return 0;
  });
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sortOrder: 'ascending' | 'descending' | 'default';
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  status: 'idle',
  error: null,
  sortOrder: 'default', // default sort order, which is no sorting
}

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';  // reset status to 'idle'
    },
    setSortOrder: (state, action: PayloadAction<'ascending' | 'descending' | 'default'>) => {
      state.sortOrder = action.payload;
      // Apply the sort after setting the sort order
      state.filteredProducts = sortProducts(state.products, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder

    // fetchProducts
    .addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state) => {
      // Set status to 'succeeded' when fetching is successful
      state.status = 'succeeded';
      // Set sorted products
      state.filteredProducts = sortProducts(state.products, state.sortOrder);
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || null;
    })
  }
});

export const { resetStatus, setSortOrder } = requestSlice.actions;
export default requestSlice.reducer;
