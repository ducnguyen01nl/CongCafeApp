import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userApi } from '../../../api/userApi'

export interface CounterState {
  user: any,
  userLoading:boolean,

}

const initialState: CounterState = {
  user: null,
  userLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
        console.log('user',state.user);
        
    },
    setUserLoading: (state, action) => {
        state.userLoading = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setUserLoading } = userSlice.actions

export default userSlice.reducer