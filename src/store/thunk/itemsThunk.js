import { createAsyncThunk } from '@reduxjs/toolkit'

import { getProduct, getProducts } from '../../services/api'

export const getItemsThunk = createAsyncThunk('@@items/getItems', async () => {
  return await getProducts()
})
export const getItemThunk = createAsyncThunk('@@items/getItem', async (id) => {
  return await getProduct(id)
})
