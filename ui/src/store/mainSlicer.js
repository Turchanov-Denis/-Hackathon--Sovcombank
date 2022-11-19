import { createSlice } from '@reduxjs/toolkit'

export const mainSlicer = createSlice({
    name: 'main',
    initialState: {
        authed: false,
    },
    reducers: {
        toAuth: (state) => {
            state.authed = !state.authed
            console.log(state)
        },
    },
})

// Action creators are generated for each case reducer function
export const { toAuth } = mainSlicer.actions

export default mainSlicer.reducer