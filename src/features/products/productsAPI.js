
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.com'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // Action type prefix
  async (_, { rejectWithValue }) => {
    try {
      // Make GET request to fetch products
      const response = await axios.get(`${API_BASE_URL}/products`)
      
      // Return the data which will be available in action.payload
      return response.data
    } catch (error) {
      // Handle errors and pass them to the rejected action
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      )
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || `Failed to fetch product ${productId}`
      )
    }
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create product'
      )
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, data)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update product'
      )
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${productId}`)
      // Return the ID so we can remove it from state
      return productId
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete product'
      )
    }
  }
)
