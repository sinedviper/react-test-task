import { createSlice } from '@reduxjs/toolkit'

import { getSizesThunk } from '../thunk'

const initialState = {
  status: 'idle',
  sizes: undefined,
  load: false,
}

export const sizesSlice = createSlice({
  name: '@@sizes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSizesThunk.pending, (state) => {
        state.load = true
        state.status = 'pending'
      })
      .addCase(getSizesThunk.rejected, (state) => {
        state.load = false
        state.status = 'reject'
      })
      .addCase(getSizesThunk.fulfilled, (state, action) => {
        state.load = false
        state.status = 'fulfilled'
        state.sizes = action.payload
      })
  },
})

export const sizesReducer = sizesSlice.reducer
