import { createSlice } from '@reduxjs/toolkit'

interface initialThemeStateType {
  isDarkTheme: boolean
}

const initialState: initialThemeStateType = {
  isDarkTheme: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    doTheme(state: initialThemeStateType) {
      state.isDarkTheme = !state.isDarkTheme
    },
  },
})

export const themeActions = themeSlice.actions
export default themeSlice.reducer
