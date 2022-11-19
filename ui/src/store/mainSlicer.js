import { createSlice } from '@reduxjs/toolkit'

export const mainSlicer = createSlice({
    name: 'main',
    initialState: {
        authed: true,
        admin: false,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQG1haWwucnUiLCJleHAiOjE2Njg4ODUwNjF9.Xc9X3n-UwmWCXZ3CZHHjvq17ted1ol9_zX532cJjRqg",
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