import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './configureStore'

const initialState = {
  search: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchToken: (state, action) => ({
      ...state,
      search: action.payload,
    }),
  },
})

export const { addSearchToken } = searchSlice.actions
export default searchSlice.reducer

export const getSearch = (state: RootState) => state.search
