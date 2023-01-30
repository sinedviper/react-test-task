import { createSlice } from '@reduxjs/toolkit'

import { getItemsThunk, getItemThunk } from '../thunk'

const initialState = {
  status: 'idle',
  items: undefined,
  item: undefined,
  load: false,
}

export const itemSlice = createSlice({
  name: '@@items',
  initialState,
  reducers: {
    actionClearItem: (state) => {
      state.item = {}
      return state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemsThunk.pending, (state) => {
        state.load = true
        state.status = 'pending'
      })
      .addCase(getItemsThunk.rejected, (state) => {
        state.load = false
        state.status = 'reject'
      })
      .addCase(getItemsThunk.fulfilled, (state, action) => {
        state.load = false
        state.status = 'fulfilled'
        state.items = action.payload
      })
      .addCase(getItemThunk.pending, (state) => {
        state.load = true
        state.status = 'pending'
      })
      .addCase(getItemThunk.rejected, (state) => {
        state.load = false
        state.status = 'reject'
      })
      .addCase(getItemThunk.fulfilled, (state, action) => {
        state.load = false
        state.status = 'fulfilled'
        state.item = action.payload
      })
  },
})

export const { actionClearItem } = itemSlice.actions

export const itemReducer = itemSlice.reducer
