import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../store'

export interface UserState {
  value: Partial<UserInfo>
}

interface UserInfo {
  _id: string
  username: string
}

const initialState: Partial<UserState> = {
  value: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.value = action.payload;
    }
  },
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;