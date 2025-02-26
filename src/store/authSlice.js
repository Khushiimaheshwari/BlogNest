import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userdata: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action 1
        login: (state, action) => {
            state.status = true,
            state.userdata = action.payload
        },

        // Action 2        
        logout: (state, action) => {
            state.status = false,
            state.userdata = null
        }

    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;