import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userApi } from '../../../api/userApi'

export interface CounterState {
  token: string | null,

}

const initialState: CounterState = {
    token: null,
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
        state.token = action.payload;
        console.log('token',state.token);
        
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions

export default tokenSlice.reducer