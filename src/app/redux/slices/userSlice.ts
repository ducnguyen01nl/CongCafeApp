import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userApi } from '../../../api/userApi'

export interface CounterState {
  user: any,
  userLoading:boolean,
  userRepurchase:any

}

const initialState: CounterState = {
  user: null,
  userLoading: false,
  userRepurchase:null
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
    },
    setUserRepurchase:(state, action) =>{
      state.userRepurchase = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setUserLoading, setUserRepurchase } = userSlice.actions

export default userSlice.reducer