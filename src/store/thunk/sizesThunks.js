import { createAsyncThunk } from '@reduxjs/toolkit'

import { getSizes } from '../../services/api'

export const getSizesThunk = createAsyncThunk('@@sizes/getSizes', async () => {
  return await getSizes()
})
