import { createSlice } from '@reduxjs/toolkit'

export const mainSlicer = createSlice({
    name: 'main',
    initialState: {
        authed: false,
        admin: false,
        token: "",
    },
    reducers: {
        toAuth: (state) => {
            state.authed = !state.authed
        },
        toAdmin: (state) => {
            state.admin = !state.admin
        },
        setToken: (state, actions) => {
            state.token = actions.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { toAuth, toAdmin, setToken } = mainSlicer.actions

export default mainSlicer.reducer