import { configureStore } from '@reduxjs/toolkit'

import { itemReducer, sizesReducer } from './slice'

export const store = configureStore({
  reducer: {
    items: itemReducer,
    sizes: sizesReducer,
  },
})
