import { createSlice } from '@reduxjs/toolkit'

export const mainSlicer = createSlice({
    name: 'main',
    initialState: {
        authed: false,
        admin: true,
    },
    reducers: {
        toAuth: (state) => {
            state.authed = !state.authed
        },
        toAdmin: (state) => {
            state.admin = !state.admin
        },
    },
})

// Action creators are generated for each case reducer function
export const { toAuth,toAdmin } = mainSlicer.actions

export default mainSlicer.reducer