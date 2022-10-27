import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface MemoState {
  value: Partial<MemoInfo>[]
}

type MemoInfo = {
  _id: string
  user: string
  icon: string
  title: string
  description: string
  position: number
  favorite: boolean
  favoritePosition: number
}

const initialState: MemoState = {
  value: [],
}

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    setMemo: (state, action) => {
      state.value = action.payload;
    }
  },
})

export const { setMemo } = memoSlice.actions

export const selectCount = (state: RootState) => state.memo.value

export default memoSlice.reducer