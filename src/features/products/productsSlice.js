
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from './productsAPI'

const initialState = {
  items: [],              // Array to store all products
  selectedProduct: null,  // Currently selected/viewed product
  loading: false,         // Loading state for async operations
  error: null,           // Error message if operation fails
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  
    reducers: {
        clearProducts: (state) => {
      state.items = []
    },
    
        clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
    
        clearError: (state) => {
      state.error = null
    },
  },
  
    extraReducers: (builder) => {
    builder
      // ============================================
      // FETCH ALL PRODUCTS
      // ============================================
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch products'
      })
      
      // ============================================
      // FETCH PRODUCT BY ID
      // ============================================
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
        state.error = null
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch product'
      })
      
      // ============================================
      // CREATE PRODUCT
      // ============================================
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        // Add the new product to the items array
        state.items.push(action.payload)
        state.error = null
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create product'
      })
      
      // ============================================
      // UPDATE PRODUCT
      // ============================================
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        // Find and update the product in items array
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.error = null
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to update product'
      })
      
      // ============================================
      // DELETE PRODUCT
      // ============================================
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        // Remove the deleted product from items array
        state.items = state.items.filter(item => item.id !== action.payload)
        state.error = null
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to delete product'
      })
  },
})

export const { clearProducts, clearSelectedProduct, clearError } = productsSlice.actions

export const selectAllProducts = (state) => state.products.items
export const selectSelectedProduct = (state) => state.products.selectedProduct
export const selectProductsLoading = (state) => state.products.loading
export const selectProductsError = (state) => state.products.error

export default productsSlice.reducer
