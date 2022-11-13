import {createSlice} from '@reduxjs/toolkit'

interface AuthState {
    isLogged: boolean;
}

const initialState: AuthState = {
    isLogged: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isLogged = true;
        },
        logout(state) {
            state.isLogged = false;
        }
    }
})

export const authActions = authSlice.actions;