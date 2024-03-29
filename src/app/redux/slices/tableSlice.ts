import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userApi } from '../../../api/userApi'

export interface CounterState {
  table: any,

}

const initialState: CounterState = {
    table: null,
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTable: (state, action) => {
        state.table = action.payload;
        console.log('table',state.table);
        
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTable } = tableSlice.actions

export default tableSlice.reducer